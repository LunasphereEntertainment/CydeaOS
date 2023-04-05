import { GameEvent, GameEventCategory } from '../game-event';
import { GameObject } from '../../game-object/game-object';
import { GameConfiguration } from '../../game-configuration/game-configuration';
import { GameManagementEventType } from './game-management-event-type';

export class GameManagementEvent extends GameEvent {
    type: GameManagementEventType;
    gameInfo?: GameObject;
    gameConfig?: GameConfiguration;

    constructor(type: GameManagementEventType) {
        super(GameEventCategory.GameManagement);
        this.type = type;
    }

    static gameRequest(type: GameManagementEventType, config?: GameConfiguration, gameCode?: string): GameManagementEvent {
        const event = new GameManagementEvent(type);
        event.gameConfig = config;
        event.gameCode = gameCode;
        return event;
    }

    static gameResponse(gameCode: string, type: GameManagementEventType, gameInfo: GameObject): GameManagementEvent {
        const event = new GameManagementEvent(type);
        event.gameCode = gameCode;
        event.gameInfo = gameInfo;
        return event;
    }
}