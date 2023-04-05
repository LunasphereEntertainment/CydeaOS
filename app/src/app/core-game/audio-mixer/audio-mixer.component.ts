import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ClientSettingsService } from '../../client-settings.service';
import { HttpClient } from '@angular/common/http';
import { IMediaEntry } from '../i-media-entry';
import { SocketService } from '../../shared/socket.service';
import { MediaEventType } from '@cydeaos/libs/events/media-event/media-event';
import { MediaMood } from '@cydeaos/libs/media/media-mood/media-mood';
import { AutoplayService, AutoplayState } from "../../game-launcher/permissions-prompt/autoplay.service";
import { filter } from "rxjs";

const FadeTime = 5;

class CrossFadeAudioSource {
  busy: boolean = false;
  readonly gainNode: GainNode;

  private bufferSourceNode?: AudioBufferSourceNode;
  private readonly context: AudioContext;
  private readonly onEnd?: CallableFunction;

  constructor(context: AudioContext, onEnd?: CallableFunction, dest?: AudioNode) {
    this.context = context;
    this.onEnd = onEnd;
    // this.bufferSourceNode = context.createBufferSource();
    this.gainNode = context.createGain();
    this.gainNode.gain.value = 0;

    // this.bufferSourceNode.connect(this.gainNode);
    this.gainNode.connect(dest || context.destination);
  }

  fadeOut() {
    this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + FadeTime);

    setTimeout(() => {
      this.busy = false;
      this.stop();
    }, FadeTime * 1000);
  }

  fadeIn(source?: ArrayBuffer) {
    if (!this.bufferSourceNode) {
      this.bufferSourceNode = this.context.createBufferSource();
      this.bufferSourceNode.connect(this.gainNode);

      this.bufferSourceNode.addEventListener('ended', () => {
        this.busy = false;
        this.onEnd?.();
      });
    }

    if (source) {
      this.context.decodeAudioData(source).then((buffer) => {
        this.bufferSourceNode!.buffer = buffer;
        this.bufferSourceNode!.start();
        this.fadeInImpl();
      });
    } else if (this.bufferSourceNode.buffer !== null && this.bufferSourceNode.buffer!.length > 0) {
      this.fadeInImpl();
    } else {
      console.error('No source to fadeIn()');
    }
  }

  stop() {
    this.bufferSourceNode!.stop();
    delete this.bufferSourceNode;
  }

  private fadeInImpl() {
    this.busy = true;
    this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + FadeTime);
  }
}

@Component({
  selector: 'app-audio-mixer',
  templateUrl: './audio-mixer.component.html',
  styleUrls: [ './audio-mixer.component.scss' ]
})
export class AudioMixerComponent implements OnInit, OnDestroy {
  @Input() currentMood: MediaMood = MediaMood.Chill;
  @Input() showControls: boolean = true;

  requiresInteraction: boolean = true;
  nowPlaying?: IMediaEntry;

  mediaMood = MediaMood;

  private musicVolumeControl!: GainNode;
  private sfxVolume!: GainNode;
  private context!: AudioContext;
  private musicMixers: CrossFadeAudioSource[] = [];

  constructor(
    private clientSettingsService: ClientSettingsService,
    private http: HttpClient,
    private socketService: SocketService,
    private autoplayService: AutoplayService,
  ) {
    // this.socketService.reconnectWithCode();

    // try {
    //   this.configureAudio();
    // } catch (e) {
    //   this.requiresInteraction = true;
    // }
  }

  private detectAutoplay() {
    this.context !== undefined && this.context.state === 'running' ? this.requiresInteraction = false : this.requiresInteraction = true;
    if (this.requiresInteraction) {
      this.autoplayService.promptUser();
    }
  }

  configureAudio() {
    setTimeout(this.detectAutoplay.bind(this), 2000);

    this.context = new AudioContext();
    this.musicVolumeControl = this.context.createGain();
    this.sfxVolume = this.context.createGain();

    this.musicMixers.push(
      new CrossFadeAudioSource(this.context, this.requestNewTrack, this.musicVolumeControl),
      new CrossFadeAudioSource(this.context, this.requestNewTrack, this.musicVolumeControl),
    );

    this.musicVolumeControl.connect(this.context.destination);
    this.sfxVolume.connect(this.context.destination);


  }

  ngOnInit(): void {
    // this.clientSettingsService.currentSettings.subscribe(settings => {
    //   this.musicVolumeControl.gain.value = settings.musicVolume;
    //   this.sfxVolume.gain.value = settings.soundVolume;
    // })

    this.socketService.listen<IMediaEntry>(MediaEventType.PlayTrack)
      .subscribe((mediaEntry: IMediaEntry) => {
        this.playTrack(mediaEntry);
      });

    this.configureAudio();
    this.requestNewTrack(this.currentMood);


    this.autoplayService.ee.pipe(
      filter(e => e === AutoplayState.Approved)
    ).subscribe(() => {
      this.context.resume();
    })
    // setTimeout(() => {
    // }, 2000);
  }

  requestNewTrack(mood?: MediaMood) {
    if (mood)
      this.socketService.blindSend(MediaEventType.SwitchMood, { mood });
    else
      this.socketService.blindSend(MediaEventType.NextTrack, { 'please': 'thank you' });
  }

  ngOnDestroy(): void {
    this.context.suspend();
  }

  playSfx(url: string): void {
    this.http.get(url, { responseType: 'arraybuffer' })
      .subscribe((data: ArrayBuffer) => {
        this.context.decodeAudioData(data).then((buffer: AudioBuffer) => {
          const source = this.context.createBufferSource();
          source.buffer = buffer;
          source.connect(this.sfxVolume);
          source.start();
        });
      });
  }

  playTrack(mediaEntry: IMediaEntry): void {
    this.nowPlaying = mediaEntry;
    this.http.get(mediaEntry.url, { responseType: 'arraybuffer' })
      .subscribe((data: ArrayBuffer) => {
        // find first non-busy mixer
        let mixer = this.musicMixers.find(m => !m.busy);

        // if none are available, use the first one
        if (!mixer) {
          mixer = this.musicMixers[0];
        }

        // set the second mixer for cross-fade
        let otherMixer = this.musicMixers[(this.musicMixers.indexOf(mixer) + 1) % this.musicMixers.length];

        if (mixer.busy) {
          mixer.fadeOut();
          let checker = setInterval(() => {
            if (!mixer!.busy) {
              clearInterval(checker);
              mixer!.stop();

              mixer!.fadeIn(data);

              if (otherMixer.busy) {
                otherMixer.fadeOut();
              }
            }
          }, 100)
        } else {
          mixer.fadeIn(data);
          if (otherMixer.busy) {
            otherMixer.fadeOut();
          }
        }
      });
  }
}
