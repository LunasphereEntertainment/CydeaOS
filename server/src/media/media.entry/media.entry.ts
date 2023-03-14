import { v4 as UUID } from 'uuid';
import { sep } from 'path';
export class MediaEntry {
    uuid: string;
    path: string;
    name: string;
    genre: MediaGenre;

    constructor(filePath: string, genre: MediaGenre = MediaGenre.Chill, uuid?: string) {
        this.uuid = uuid || UUID().toString();
        this.path = filePath;
        this.name = filePath.substring(filePath.lastIndexOf(sep), filePath.lastIndexOf('.'))
        this.genre = genre;
    }

    static copy(mediaEntry: MediaEntry): MediaEntry {
        return new MediaEntry(mediaEntry.path, mediaEntry.genre, mediaEntry.uuid);
    }
}

export enum MediaGenre {
    Chill = "Chill",
    Dramatic = "Dramatic",
    Upbeat = "Upbeat",
    Sad = "Sad",
}
