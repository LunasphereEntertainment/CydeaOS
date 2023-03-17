import { v4 as UUID } from 'uuid';
import { sep } from 'path';
import { MediaMood } from "../../game-models/media/media-mood/media-mood";

export class MediaEntry {
    uuid: string;
    path: string;
    name: string;
    genre: MediaMood;

    constructor(filePath: string, genre: MediaMood = MediaMood.Chill, uuid?: string) {
        this.uuid = uuid || UUID().toString();
        this.path = filePath;
        this.name = filePath.substring(filePath.lastIndexOf(sep), filePath.lastIndexOf('.'))
        this.genre = genre;
    }

    static copy(mediaEntry: MediaEntry): MediaEntry {
        return new MediaEntry(mediaEntry.path, mediaEntry.genre, mediaEntry.uuid);
    }
}

