import { v4 as UUID } from 'uuid';
import { sep } from 'path';
import { MediaMood } from "../media-mood/media-mood";

export class MediaEntry {
    uuid: string;
    path: string;
    name: string;
    mood: MediaMood;
    url: string;

    constructor(filePath: string, genre: MediaMood = MediaMood.Chill, uuid?: string) {
        this.uuid = uuid || UUID().toString();
        this.path = filePath;
        this.name = filePath.substring(filePath.lastIndexOf(sep) + 1, filePath.lastIndexOf('.'))
        this.mood = genre;
        this.url = `http://localhost:3000/media/${this.uuid}`;
    }

    static copy(mediaEntry: MediaEntry): MediaEntry {
        return new MediaEntry(mediaEntry.path, mediaEntry.mood, mediaEntry.uuid);
    }

    toJSON(): any {
        return {
            name: this.name,
            mood: this.mood,
            url: this.url
        }
    }
}

