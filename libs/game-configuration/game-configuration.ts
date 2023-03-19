import { IPType } from '../ip-generator/ip-generator';
import { MusicPlaybackMode } from '../media/media.playback.mode';

export class GameConfiguration {
    type: GameType;

    ipType: IPType;

    musicMode: MusicPlaybackMode;

    constructor(
        type: GameType = GameType.Elimination,
        ipType: IPType = IPType.IPv4,
        musicMode: MusicPlaybackMode = MusicPlaybackMode.Client
    ) {
        this.type = type;
        this.ipType = ipType;
        this.musicMode = musicMode;
    }
}

export enum GameType {
    Elimination = "Elimination",
    TeamDeathMatch = "TeamDeathMatch",
    FreePlay = "FreePlay"
}
