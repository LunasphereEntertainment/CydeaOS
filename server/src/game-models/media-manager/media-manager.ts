import { MusicPlaybackMode } from '../../media/media-event/media-event';
import { MediaQueue } from '../../media/media-library';
import { MediaGenre } from '../../media/media.entry/media.entry';

export class MediaManager {
    private readonly mode: MusicPlaybackMode;
    private readonly queuesByGenre: Map<MediaGenre, MediaQueue>;

    constructor(mode: MusicPlaybackMode) {
        this.mode = mode;
        this.queuesByGenre = new Map();
    }
}
