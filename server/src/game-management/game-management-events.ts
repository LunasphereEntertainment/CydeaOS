import { GameConfiguration } from "../../../libs/game-configuration/game-configuration";
import { GameObject } from "../../../libs/game-object/game-object";

export enum GameManagementEventType {
    GameCreated = 'game-created',
    GameJoined = 'game-joined',
    GameStarted = 'game-started',
    GameFinished = 'game-finished',
    // GameDeleted = 'game-deleted',
}

export class GameManagementEvent {
    type: GameManagementEventType;
    data: { code: string } | GameConfiguration;
}

export class GameManagementResponseEvent {
    type: GameManagementEventType;
    data: GameObject;
}
