import { MediaUuid } from "../media.types";
import { MediaMood } from "../media-mood/media-mood";
import { MediaError } from "../../../server/src/errors/media-error/media.error";
import { MediaQueue } from "../media-queue/media.queue";
import { MediaEntry } from "../media-entry/media-entry";

export class MediaLibrary {
    private mediaById: Map<MediaUuid, MediaEntry> = new Map();
    private mediaByGenre: Map<MediaMood, Array<MediaEntry>> = new Map();

    constructor() {}
    addMediaEntry(mediaEntry: MediaEntry) {
        if (this.mediaById.has(mediaEntry.uuid)) {
            throw MediaError.duplicateEntry(mediaEntry.uuid);
        }
        this.mediaById.set(mediaEntry.uuid, mediaEntry);

        if (this.mediaByGenre.has(mediaEntry.mood))
            this.mediaByGenre.get(mediaEntry.mood)!.push(mediaEntry);
        else
            this.mediaByGenre.set(mediaEntry.mood, new Array(mediaEntry));

        console.log(`Added ${ mediaEntry.uuid } to ${ mediaEntry.mood }`)
    }

    getMenuTrack(): MediaUuid {
        const trackList = this.mediaByGenre.get(MediaMood.MainMenu),
            randomIdx = Math.floor(Math.random() * trackList!.length);
        return trackList![randomIdx].uuid;
    }

    getGenres(): Array<MediaMood> {
        return Array.from(this.mediaByGenre.keys());
    }
    getTrack(uuid: MediaUuid): MediaEntry {
        if (!this.mediaById.has(uuid)) {
            throw MediaError.entryNotFound(uuid);
        }
        return this.mediaById.get(uuid)!;
    }
    newMediaQueue(genre: MediaMood): MediaQueue {
        if (!this.mediaByGenre.has(genre)) {
            throw MediaError.moodNotFound(genre);
        }

        const mediaQueue = new MediaQueue(genre);
        this.mediaByGenre.get(genre)!.forEach((mediaEntry) => mediaQueue.enqueue(mediaEntry.uuid));
        return mediaQueue;
    }
}
