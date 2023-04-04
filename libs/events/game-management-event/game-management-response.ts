import { GameEventType } from "./game-event-type";
import { GameObject } from "../../game-object/game-object";

export interface GameManagementResponse {
    success: boolean;
    gameCode: string;
    data?: GameObject;
    error?: string;
}

export function gameGetSuccess(game: GameObject): GameManagementResponse {
    return <GameManagementResponse>{ data: game, gameCode: game.gameCode, success: true };
}

export function gameCreationSuccess(game: GameObject): GameManagementResponse {
    return <GameManagementResponse>{ success: true, data: game, gameCode: game.gameCode };
}

export function gameDeletionSuccess(game: GameObject): GameManagementResponse {
    return <GameManagementResponse>{ success: true, data: game, gameCode: game.gameCode };
}
