import { IPType } from '../../game/ip-generator/ip-generator';
import { MusicPlaybackMode } from '../../media/media-event/media-event';

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
