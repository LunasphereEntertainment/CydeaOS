import { ClientSettings } from "../../../libs/client-settings/client-settings";

export enum GameSettingsEventType {
    Save = 'save',
    Load = 'load'
}

export class GameSettingsEvent {
    type: GameSettingsEventType;
    data: ClientSettings;

    constructor(type: GameSettingsEventType, data?: any) {
        this.type = type;
        this.data = data;
    }
}
