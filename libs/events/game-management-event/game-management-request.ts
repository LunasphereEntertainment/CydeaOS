import { GameEventType } from "./game-event-type";
import { GameConfiguration } from "../../game-configuration/game-configuration";

export interface GameManagementRequest {
    type: GameEventType;

    config?: GameConfiguration;

    gameId?: string;
}
