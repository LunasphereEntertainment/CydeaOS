import { MediaMood } from '../../media/media-mood/media-mood';
import { InGameEvent } from '../game-event-payload';

export class MediaEvent implements InGameEvent {
    constructor(
        public readonly type: MediaEventType,
        public readonly gameCode: string,
        public readonly data: { genre: MediaMood }
    ) {}
}

export enum MediaEventType {
    GetCurrentTrack = "getCurrentTrack",
    GetCurrentMood = "getCurrentMood",
    SwitchMood = "switchMood",
    NextTrack = "nextTrack",
    PlayTrack = "playTrack"
}


