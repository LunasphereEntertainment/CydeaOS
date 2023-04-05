import { Injectable } from '@angular/core';
import { SocketService } from './shared/socket.service';
import { ClientSettings } from '@cydeaos/libs/client-settings/client-settings';
import { GameSettingsEventType } from '@cydeaos/libs/events/game-settings-event/game-settings-event';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientSettingsService {
  // TODO: Listen for auth changes and update the client settings

  currentSettings: BehaviorSubject<ClientSettings> = new BehaviorSubject(ClientSettings.defaults());

  constructor(private socketService: SocketService) {
    this.fetchClientSettings();
  }

  fetchClientSettings() {
    this.socketService.sendAndReceive<ClientSettings>(GameSettingsEventType.GetSettings, {test: 'test'})
      .subscribe((settings) => {
        this.currentSettings.next(settings);
      });
  }

  // getClientSettings() {
  // return this.currentSettings.getValue();
  // }

  saveClientSettings(settings: ClientSettings) {
    this.socketService.sendAndReceive<{ success: boolean }>(GameSettingsEventType.SetSettings, settings)
      .subscribe((response) => {
        if (response.success) {
          this.currentSettings.next(settings);
        }
      });
  }
}
