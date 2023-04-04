import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { MediaEventType } from '../../../libs/events/media-event/media-event';
import { ParseEnumPipe, UseInterceptors } from '@nestjs/common';
import { GameResolverInterceptor } from '../game/game-resolver/game-resolver.interceptor';
import { MediaService } from './media.service';
import { MediaUuid } from '@cydeaos/libs/media/media.types';
import { MediaMood } from '@cydeaos/libs/media/media-mood/media-mood';
import { MediaEntry } from '@cydeaos/libs/media/media-entry/media-entry';
import { GameSocket } from '../game-socket.interface';

@WebSocketGateway({ cors: process.env.CORS === 'true' })
@UseInterceptors(GameResolverInterceptor)
export class MediaGateway {

    constructor(private mediaService: MediaService) {
    }

    @SubscribeMessage(MediaEventType.GetCurrentTrack)
    handleGetCurrentTrack(client: any): WsResponse<MediaEntry> {
        const currentSong = this.mediaService.getCurrentSong(client.game.id),
            songInfo = this.mediaService.getFromGlobalMediaLibrary(currentSong);
        return {
            event: MediaEventType.PlayTrack,
            data: songInfo
        }
    }

    @SubscribeMessage(MediaEventType.NextTrack)
    handleGetNextTrack(@ConnectedSocket() client: GameSocket): WsResponse<MediaEntry> {
        const uuid = this.mediaService.nextSong(client.game.gameCode),
            songInfo = this.mediaService.getFromGlobalMediaLibrary(uuid);

        return {
            event: MediaEventType.PlayTrack,
            data: songInfo
        }
    }

    @SubscribeMessage(MediaEventType.SwitchMood)
    handleSwitchMood(@ConnectedSocket() client: GameSocket, @MessageBody('mood', new ParseEnumPipe(MediaMood)) mood: MediaMood): WsResponse<MediaEntry> {
        const uuid = this.mediaService.changeMood(client.game.gameCode, mood),
            songInfo = this.mediaService.getFromGlobalMediaLibrary(uuid);

        return {
            event: MediaEventType.PlayTrack,
            data: songInfo
        }
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
