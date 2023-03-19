import { MediaMood } from '../media-mood/media-mood';
import { MediaLibrary } from '../media-library/media-library';
import { MusicPlaybackMode } from '../media.playback.mode';
import { MediaQueue } from "../media-queue/media.queue";
import { MediaUuid } from "../media.types";
import { MediaError } from "../../errors/media-error/media.error";

export class MediaManager {
    mediaPlaybackMode: MusicPlaybackMode = MusicPlaybackMode.Client;
    private readonly library: MediaLibrary = new MediaLibrary();

    private moodQueues: Map<MediaMood, MediaQueue> = new Map();
    private currentMood: MediaMood;
    private currentTrack?: MediaUuid;

    constructor(library: MediaLibrary, mode?: MusicPlaybackMode) {
        this.library = library;

        if (mode)
            this.mediaPlaybackMode = mode;
    }

    getCurrentTrack(): MediaUuid {
        return this.currentTrack;
    }

    getCurrentMode(): MediaMood {
        return this.currentMood;
    }

    nextTrack(newMood?: MediaMood): MediaUuid {
        if (newMood) {
            this.currentMood = newMood;
        }
        try {
            this.currentTrack = this.moodQueues.get(this.currentMood).dequeue();
        } catch (e) {
            // handle queue empty
            if (e instanceof MediaError) {
                if (e.message.includes('empty')) {
                    // reset the queue
                    this.moodQueues.set(this.currentMood, this.library.newMediaQueue(this.currentMood));
                    this.currentTrack = this.moodQueues.get(this.currentMood).dequeue();
                }
            }
        }
        return this.currentTrack;
    }
}
