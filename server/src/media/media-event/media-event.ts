import { MediaMood } from '../media.entry/media.entry';

export class MediaEvent {
    constructor(
        public readonly type: MediaEventType,
        public readonly data: { genre: MediaMood }
    ) {}
}

export enum MediaEventType {
    GET_TRACK = "getTrack",
    CHANGE_TRACK = "changeTrack",
}

export enum MusicPlaybackMode {
    Server = "server",
    Client = "client",
}