import { ClientSettings } from '../../client-settings/client-settings';
import { GameEvent, GameEventCategory } from '../game-event';

export enum GameSettingsEventType {
    GetSettings = "getSettings",
    SetSettings = "setSettings",
}

export class GameSettingsEvent extends GameEvent {
    type: GameSettingsEventType;
    data: ClientSettings;

    constructor(type: GameSettingsEventType, data?: any) {
        super(GameEventCategory.Settings);
        this.type = type;
        this.data = data;
    }
}
