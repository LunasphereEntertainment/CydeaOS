import { MediaMood } from '../../media/media-mood/media-mood';

export class MediaEvent {
    constructor(
        public readonly type: MediaEventType,
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


