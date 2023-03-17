import { Injectable } from '@nestjs/common';
import { MediaEntry } from './media.entry/media.entry';
import { readdirSync } from 'fs'
import { join } from 'path';
import { MediaLibrary, MediaQueue, MediaUuid } from './media-library';
import { MediaMood } from "../game-models/media/media-mood/media-mood";
import { MediaManager } from "../game-models/media/media-manager/media-manager";
import { GameNotFoundError } from "../game/game.errors";


/*
class GameMediaInstance {
    currentTrack: MediaUuid;
    queues: Map<MediaMood, MediaQueue>;

    constructor(queues: [MediaMood, MediaQueue][]) {
        this.queues = new Map(queues);
    }

    nextTrack(genre: MediaMood): MediaUuid {
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
*/

@Injectable()
export class MediaService {
    private globalMediaLibrary = new MediaLibrary();

    private mediaServicesByGame: Map<string, MediaManager> = new Map();

    constructor() {
        this.initGlobalMediaLibrary()
    }

    private initGlobalMediaLibrary() {
        const
            mediaDir = process.env.MEDIA_DIR || join(__dirname, 'media'),
            chillDir = join(mediaDir, 'chill'),
            dramaticDir = join(mediaDir, 'dramatic'),
            upbeatDir = join(mediaDir, 'upbeat');

        let importCount = 0;
        importCount += this.importDirectory(chillDir, MediaMood.Chill);
        importCount += this.importDirectory(dramaticDir, MediaMood.Dramatic);
        importCount += this.importDirectory(upbeatDir, MediaMood.Upbeat);
        // this.importDirectory(sadDir, MediaMood.Sad);

        console.log(`Imported ${ importCount } tracks from ${ mediaDir }`);
    }

    private importDirectory(dir: string, mood: MediaMood): number {
        let importCount = 0;

        readdirSync(dir)
            .filter((file) => isSupportedAudioFile(file))
            .map((file) => new MediaEntry(join(dir, file), mood))
            .forEach((mediaEntry) => {
                importCount++;
                this.globalMediaLibrary.addMediaEntry(mediaEntry)
            });

        return importCount;
    }

    getFromGlobalMediaLibrary(uuid: MediaUuid): MediaEntry {
        return this.globalMediaLibrary.getTrack(uuid);
    }

    changeMood(gameId: string, newMood: MediaMood): MediaUuid {
        if (!this.mediaServicesByGame.has(gameId)) {
            throw new GameNotFoundError(gameId);
        }

        return this.mediaServicesByGame.get(gameId).nextTrack(newMood);
    }

    getCurrentSong(gameId: string): MediaUuid {
        if (!this.mediaServicesByGame.has(gameId)) {
            throw new GameNotFoundError(gameId);
        }

        return this.mediaServicesByGame.get(gameId).getCurrentTrack();
    }

    createMediaServiceForGame(gameId: string): MediaManager {
        if (this.mediaServicesByGame.has(gameId)) {
            throw new Error(`Media service for game ${ gameId } already exists`);
        }

        const mediaService = new MediaManager(this.globalMediaLibrary);
        this.mediaServicesByGame.set(gameId, mediaService);
        return mediaService;
    }

    deleteMediaServiceForGame(gameId: string): void {
        if (!this.mediaServicesByGame.has(gameId)) {
            throw new GameNotFoundError(gameId);
        }

        this.mediaServicesByGame.delete(gameId);
    }
}

function isSupportedAudioFile(file: string): boolean {
    return file.endsWith('.mp3') || file.endsWith('.ogg');
}
