import { Injectable } from '@nestjs/common';
import { MediaEntry, MediaGenre } from './media.entry/media.entry';
import { readdirSync } from 'fs'
import { join } from 'path';
import { MediaLibrary, MediaQueue, MediaUuid } from './media-library';
import { GameNotFoundError } from '../game/game.service';


class GameMediaInstance {
    currentTrack: MediaUuid;
    queues: Map<MediaGenre, MediaQueue>;

    constructor(queues: [MediaGenre, MediaQueue][]) {
        this.queues = new Map(queues);
    }

    nextTrack(genre: MediaGenre): MediaUuid {
        if (!this.queues.has(genre)) {
            throw new Error(`No queue for genre ${ genre }`);
        }
        const queue = this.queues.get(genre);
        if (!queue.hasNext()) {
            throw new Error(`No more tracks in queue for genre ${ genre }`);
        }
        this.currentTrack = queue.dequeue();
        return this.currentTrack;
    }
}

@Injectable()
export class MediaService {
    private globalMediaLibrary = new MediaLibrary();

    private gameMediaLibraries = new Map<string, GameMediaInstance>();

    constructor() {
        this.initGlobalMediaLibrary()
    }

    private initGlobalMediaLibrary() {
        const
            mediaDir = process.env.MEDIA_DIR || join(__dirname, 'media'),
            chillDir = join(mediaDir, 'chill'),
            dramaticDir = join(mediaDir, 'dramatic'),
            upbeatDir = join(mediaDir, 'upbeat');

        readdirSync(chillDir)
            .filter((file) => isSupportedAudioFile(file))
            .map((file) => new MediaEntry(join(chillDir, file), MediaGenre.Chill))
            .forEach((mediaEntry) => this.globalMediaLibrary.addMediaEntry(mediaEntry));

        readdirSync(dramaticDir)
            .filter((file) => isSupportedAudioFile(file))
            .map((file) => new MediaEntry(join(dramaticDir, file), MediaGenre.Dramatic))
            .forEach((mediaEntry) => this.globalMediaLibrary.addMediaEntry(mediaEntry));

        readdirSync(upbeatDir)
            .filter((file) => isSupportedAudioFile(file))
            .map((file) => new MediaEntry(join(upbeatDir, file), MediaGenre.Upbeat))
            .forEach((mediaEntry) => this.globalMediaLibrary.addMediaEntry(mediaEntry));
    }

    generateGameMediaLibrary(gameId: string): GameMediaInstance {
        const gameMediaLibrary = new GameMediaInstance(
            this.globalMediaLibrary.getGenres()
                .map((genre) => [genre, this.globalMediaLibrary.newMediaQueue(genre)])
        );

        this.gameMediaLibraries.set(gameId, gameMediaLibrary);
        return gameMediaLibrary;
    }

    getTrack(uuid: string): MediaEntry {
        return this.globalMediaLibrary.getTrack(uuid);
    }

    currentTrack(gameId: string): MediaUuid {
        if (!this.gameMediaLibraries.has(gameId)) {
            throw new GameNotFoundError(gameId);
        }

        return this.gameMediaLibraries.get(gameId).currentTrack;
    }

    nextTrack(gameId: string, genre: MediaGenre): MediaUuid {
        if (!this.gameMediaLibraries.has(gameId)) {
            throw new GameNotFoundError(gameId);
        }

        return this.gameMediaLibraries.get(gameId).nextTrack(genre);
    }
}

function isSupportedAudioFile(file: string): boolean {
    return file.endsWith('.mp3') || file.endsWith('.ogg');
}