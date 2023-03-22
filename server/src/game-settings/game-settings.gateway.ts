import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { GameSettingsEvent, GameSettingsEventType } from '@cydeaos/libs/events/game-settings-event/game-settings-event';
import { UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/jwt/guard/jwt-auth.guard';
import { GameSettingsService } from './game-settings.service';
import { ClientSettings } from '@cydeaos/libs/client-settings/client-settings';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: process.env.CORS === 'true' })
@UseInterceptors(JwtAuthGuard)
export class GameSettingsGateway {

  constructor(private settingsService: GameSettingsService) {
  }

  @SubscribeMessage(GameSettingsEventType.Save)
  handleSave(client: Socket, payload: GameSettingsEvent): WsResponse<{ success: boolean }> {
    const { id : clientId } = client;

    this.settingsService.saveClientSettings(clientId, payload.data);

    return {
        event: GameSettingsEventType.Save,
        data: { success: true }
    }
  }

  @SubscribeMessage(GameSettingsEventType.Load)
  handleLoad(client: any): WsResponse<ClientSettings> {
    const { id: clientId } = client;

    return {
        event: GameSettingsEventType.Load,
        data: this.settingsService.loadClientSettings(clientId)
            || this.settingsService.getAndSaveDefaults(clientId)
    }
  }
}
