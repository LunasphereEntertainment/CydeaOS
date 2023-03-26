import { Component, OnInit } from '@angular/core';
import { ClientSettingsService } from '../../client-settings.service';
import { HttpClient } from '@angular/common/http';
import { IMediaEntry } from '../i-media-entry';
import { SocketService } from '../../shared/socket.service';
import { MediaEventType } from '@cydeaos/libs/events/media-event/media-event';
import { MediaMood } from '@cydeaos/libs/media/media-mood/media-mood';

const FadeTime = 5;

class CrossFadeAudioSource {
  busy: boolean = false;
  readonly gainNode: GainNode;

  private bufferSourceNode?: AudioBufferSourceNode;
  private readonly context: AudioContext;

  constructor(context: AudioContext, dest?: AudioNode) {
    this.context = context;
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
export class AudioMixerComponent implements OnInit {
  // @ViewChild('#mixerOut') audioMixer!: HTMLAudioElement;
  // readonly audioMixer = AudioContext.
  // private readonly audioOut: MediaStreamAudioDestinationNode;

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
  ) {
    // this.socketService.reconnectWithCode();

    // try {
    //   this.configureAudio();
    // } catch (e) {
    //   this.requiresInteraction = true;
    // }
  }

  configureAudio() {
    this.requiresInteraction = false;
    this.context = new AudioContext();
    this.musicVolumeControl = this.context.createGain();
    this.sfxVolume = this.context.createGain();

    this.musicMixers.push(
      new CrossFadeAudioSource(this.context, this.musicVolumeControl),
      new CrossFadeAudioSource(this.context, this.musicVolumeControl),
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

    // setTimeout(() => {
    // }, 2000);
  }

  requestNewTrack(mood: MediaMood) {
    this.socketService.blindSend(MediaEventType.SwitchMood, { mood });
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
