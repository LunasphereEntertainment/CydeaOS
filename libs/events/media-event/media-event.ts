import { MediaMood } from '../../media/media-mood/media-mood';
import { GameEvent, GameEventCategory } from '../game-event';

export class MediaEvent extends GameEvent {
    type: MediaEventType;
    genre?: MediaMood;

    constructor(type: MediaEventType, genre?: MediaMood) {
        super(GameEventCategory.Music);
        this.type = type;
        this.genre = genre;
    }
}

// export class MediaEvent implements InGameEvent {
//     constructor(
//         public readonly type: MediaEventType,
//         public readonly gameCode: string,
//         public readonly data: { genre: MediaMood }
//     ) {}
// }

export enum MediaEventType {
    GetCurrentTrack = "getCurrentTrack",
    GetCurrentMood = "getCurrentMood",
    SwitchMood = "switchMood",
    NextTrack = "nextTrack",
    PlayTrack = "playTrack"
}


