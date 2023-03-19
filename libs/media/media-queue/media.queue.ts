import { MediaUuid } from "../media.types";
import { MediaMood } from "../media-mood/media-mood";
import { MediaError } from "../../errors/media-error/media.error";

export class MediaQueue {
    private readonly genre: MediaMood;
    queue: Array<MediaUuid> = new Array();

    constructor(genre: MediaMood) {
        this.genre = genre;
    }

    enqueue(mediaUuid: MediaUuid) {
        if (this.queue.includes(mediaUuid))
            throw MediaError.duplicateEntry(mediaUuid);

        this.queue.push(mediaUuid);
    }

    dequeue(): MediaUuid {
        if (this.queue.length === 0) {
            throw MediaError.queueEmpty(this.genre);
        }

        // Randomly select a track from the queue
        const idx = Math.floor(Math.random() * this.queue.length);

        // Remove the track from the queue and return it
        return this.queue.splice(idx, 1)[0];
    }

    hasNext(): boolean {
        return this.queue.length > 0;
    }
}
