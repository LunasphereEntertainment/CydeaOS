import { MediaMood } from "../../game-models/media/media-mood/media-mood";

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
