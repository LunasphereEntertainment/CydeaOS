import { GameConfiguration } from "../../game-configuration/game-configuration";
import { GameObject } from "../../game-object/game-object";

export enum GameManagementEventType {

    GetGame = 'get-game',
    GameCreated = 'game-created',
    GameJoined = 'game-joined',
    GameStarted = 'game-started',
    GameFinished = 'game-finished',
    // GameDeleted = 'game-deleted',
}

export interface GameManagementEvent {
    type: GameManagementEventType;
    data: { code: string } | GameConfiguration;
}

export interface GameManagementResponseEvent {
    type: GameManagementEventType;
    data: GameObject;
}
