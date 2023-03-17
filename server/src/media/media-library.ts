import { MediaEntry } from './media.entry/media.entry';
import { MediaMood } from '../game-models/media/media-mood/media-mood';

export type MediaUuid = string;
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

export class MediaLibrary {
    private mediaById: Map<MediaUuid, MediaEntry> = new Map();
    private mediaByGenre: Map<MediaMood, Array<MediaEntry>> = new Map();

    constructor() {}
    addMediaEntry(mediaEntry: MediaEntry) {
        if (this.mediaById.has(mediaEntry.uuid)) {
            throw MediaError.duplicateEntry(mediaEntry.uuid);
        }
        this.mediaById.set(mediaEntry.uuid, mediaEntry);

        if (this.mediaByGenre.has(mediaEntry.genre))
            this.mediaByGenre.get(mediaEntry.genre).push(mediaEntry);
        else
            this.mediaByGenre.set(mediaEntry.genre, new Array(mediaEntry));

        console.log(`Added ${ mediaEntry.uuid } to ${ mediaEntry.genre }`)
    }

    getGenres(): Array<MediaMood> {
        return Array.from(this.mediaByGenre.keys());
    }
    getTrack(uuid: MediaUuid): MediaEntry {
        if (!this.mediaById.has(uuid)) {
            throw MediaError.entryNotFound(uuid);
        }
        return this.mediaById.get(uuid);
    }
    newMediaQueue(genre: MediaMood): MediaQueue {
        if (!this.mediaByGenre.has(genre)) {
            throw MediaError.genreNotFound(genre);
        }

        const mediaQueue = new MediaQueue(genre);
        this.mediaByGenre.get(genre).forEach((mediaEntry) => mediaQueue.enqueue(mediaEntry.uuid));
        return mediaQueue;
    }
}

export class MediaError extends Error {
    constructor(message: string) {
        super(message);
    }

    static entryNotFound(uuid: string): MediaError {
        return new MediaError(`MediaEntry with ${uuid} not found`);
    }

    static genreNotFound(genre: MediaMood): MediaError {
        return new MediaError(`MediaMood ${genre} not found`);
    }

    static queueEmpty(genre: MediaMood): MediaError {
        return new MediaError(`MediaQueue for genre ${genre} is empty`);
    }

    static duplicateEntry(uuid: string): MediaError {
        return new MediaError(`MediaEntry with uuid ${uuid} already exists`);
    }
}
