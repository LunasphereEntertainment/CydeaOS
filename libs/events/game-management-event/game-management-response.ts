import { GameEventType } from "./game-event-type";
import { GameObject } from "../../game-object/game-object";

export interface GameManagementResponse {
    type: GameEventType;
    success: boolean;
    data?: GameObject;
    error?: string;
}

export function gameGetSuccess(game: GameObject): GameManagementResponse {
    return <GameManagementResponse>{ type: GameEventType.GameGet, data: game };
}

export function gameCreationSuccess(game: GameObject): GameManagementResponse {
    return <GameManagementResponse>{ type: GameEventType.GameCreation, data: game };
}

export function gameDeletionSuccess(game: GameObject): GameManagementResponse {
    return <GameManagementResponse>{ type: GameEventType.GameDeletion, data: game };
}
