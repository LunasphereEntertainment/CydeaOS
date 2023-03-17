import { MediaMood } from '../media-mood/media-mood';
import { MediaLibrary, MediaQueue, MediaUuid } from '../../../media/media-library';
import { MusicPlaybackMode } from '../../../media/media-event/media-event';

export class MediaManager {
    mediaPlaybackMode: MusicPlaybackMode = MusicPlaybackMode.Client;
    private readonly library: MediaLibrary = new MediaLibrary();

    private moodQueues: Map<MediaMood, MediaQueue> = new Map();
    private currentMode: MediaMood;
    private currentTrack?: MediaUuid;

    constructor(library: MediaLibrary, mode?: MusicPlaybackMode) {
        this.library = library;

        if (mode)
            this.mediaPlaybackMode = mode;
    }

    getCurrentTrack(): MediaUuid {
        return this.currentTrack;
    }

    nextTrack(newMood?: MediaMood): MediaUuid {
        if (newMood) {
            this.currentMode = newMood;
        }
        try {
            this.currentTrack = this.moodQueues.get(this.currentMode).dequeue();
        } catch (e) {
            // handle queue empty
            if (e instanceof MediaError) {
                if (e.message.includes('empty')) {
                    // reset the queue
                    this.moodQueues.set(this.currentMode, this.library.newMediaQueue(this.currentMode));
                    this.currentTrack = this.moodQueues.get(this.currentMode).dequeue();
                }
            }
        }
        return this.currentTrack;
    }
}
