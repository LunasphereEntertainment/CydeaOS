import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GameSettingsEvent, GameSettingsEventType } from "../../../libs/events/game-settings-event/game-settings-event";
import { UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "../shared/jwt/guard/jwt-auth.guard";
import { GameSettingsService } from "./game-settings.service";
import { ClientSettings } from "../../../libs/client-settings/client-settings";
import { Socket } from "socket.io";

@WebSocketGateway({ cors: process.env.CORS === 'true' })
@UseInterceptors(JwtAuthGuard)
export class GameSettingsGateway {

  constructor(private settingsService: GameSettingsService) {
  }

  @SubscribeMessage(GameSettingsEventType.Save)
  handleSave(client: Socket, payload: GameSettingsEvent): void {
    const { id : clientId } = client;

    this.settingsService.saveClientSettings(clientId, payload.data);
  }

  @SubscribeMessage(GameSettingsEventType.Load)
  handleLoad(client: any): ClientSettings {
    const { id: clientId } = client;

    return this.settingsService.loadClientSettings(clientId)
        || this.settingsService.getAndSaveDefaults(clientId);
  }
}
