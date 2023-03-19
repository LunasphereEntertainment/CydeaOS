import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { MediaEventType } from "./media-event/media-event";
import { ParseEnumPipe, UseInterceptors } from "@nestjs/common";
import { GameResolverInterceptor } from "../game/game-resolver/game-resolver.interceptor";
import { MediaService } from "./media.service";
import { MediaUuid } from '../../../libs/media/media.types';
import { MediaMood } from '../../../libs/media/media-mood/media-mood';

@WebSocketGateway()
@UseInterceptors(GameResolverInterceptor)
export class MediaGateway {

    constructor(private mediaService: MediaService) {
    }

    @SubscribeMessage(MediaEventType.GetCurrentTrack)
    handleGetCurrentTrack(client: any): MediaUuid {
        return this.mediaService.getCurrentSong(client.game.id);
    }

    @SubscribeMessage(MediaEventType.NextTrack)
    handleGetNextTrack(client: any): MediaUuid {
        return this.mediaService.nextSong(client.game.id);
    }

    @SubscribeMessage(MediaEventType.SwitchMood)
    handleSwitchMood(client: any, @MessageBody('mood', new ParseEnumPipe(MediaMood)) mood: MediaMood): MediaUuid {
        return this.mediaService.changeMood(client.game.id, mood);
    }

    @SubscribeMessage(MediaEventType.GetCurrentMood)
    handleGetCurrentMood(client: any): MediaUuid {
        return this.mediaService.getCurrentMood(client.game.id);
    }


    /*  getTrack(
          @ConnectedSocket() client,
          // @MessageBody('type', new ParseEnumPipe(MediaEventType)) eventType: MediaEventType
          @MessageBody('genre', new ParseEnumPipe(MediaMood)) requestedGenre: MediaMood
      ): any {
        const game: GameObject = client.game,
            config = game.config;

        // TODO: Get the next track from the media service

        switch (config.musicMode) {
          case MusicPlaybackMode.Client:
            // TODO: Notify all clients to play a track
            break;
          case MusicPlaybackMode.Server:
            // TODO: Play a track on the server
            break;
          default:
            throw new NotImplementedException(`Music playback mode ${config.musicMode} is not implemented`);
        }
      }*/
}
