import { Injectable } from '@nestjs/common';
import { ClientSettings } from '@cydeaos/libs/client-settings/client-settings';

@Injectable()
export class GameSettingsService {
    private savedClientSettings: Map<string, ClientSettings> = new Map();

    saveClientSettings(clientId: string, clientSettings: ClientSettings) {
        this.savedClientSettings.set(clientId, clientSettings);
    }

    loadClientSettings(clientId: string): ClientSettings | undefined {
        return this.savedClientSettings.get(clientId);
    }

    getAndSaveDefaults(clientId: string): ClientSettings {
        const defaults = new ClientSettings();
        this.saveClientSettings(clientId, defaults);
        return defaults;
    }
}
