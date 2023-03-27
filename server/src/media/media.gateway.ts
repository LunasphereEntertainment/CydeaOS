import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { MediaEventType } from '../../../libs/events/media-event/media-event';
import { ParseEnumPipe } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaUuid } from '@cydeaos/libs/media/media.types';
import { MediaMood } from '@cydeaos/libs/media/media-mood/media-mood';
import { MediaEntry } from '@cydeaos/libs/media/media-entry/media-entry';
import { GameSocket } from '../game-socket.interface';
import { AuthSocket } from "../auth-socket.interface";
import { GameResolverPipe } from "../game-resolver/game-resolver.pipe";
import { GameManagementService } from "../game-management/game.management.service";
import { GameObject } from "@cydeaos/libs/game-object/game-object";

@WebSocketGateway({ cors: process.env.CORS === 'true' })
export class MediaGateway {

    constructor(private mediaService: MediaService, private gameService: GameManagementService) {
    }

    @SubscribeMessage(MediaEventType.GetCurrentTrack)
    handleGetCurrentTrack(
        @MessageBody('gameCode', GameResolverPipe) game: GameObject,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<MediaEntry> {
        const currentSong = this.mediaService.getCurrentSong(game.id),
            songInfo = this.mediaService.getFromGlobalMediaLibrary(currentSong);
        return {
            event: MediaEventType.PlayTrack,
            data: songInfo
        }
    }

    @SubscribeMessage(MediaEventType.NextTrack)
    handleGetNextTrack(@ConnectedSocket() client: GameSocket): WsResponse<MediaEntry> {
        const uuid = this.mediaService.nextSong(client.game.id),
            songInfo = this.mediaService.getFromGlobalMediaLibrary(uuid);

        return {
            event: MediaEventType.PlayTrack,
            data: songInfo
        }
    }

    @SubscribeMessage(MediaEventType.SwitchMood)
    handleSwitchMood(
        @MessageBody('mood', new ParseEnumPipe(MediaMood)) mood: MediaMood,
        @MessageBody('gameCode', GameResolverPipe) game: GameObject,
        @ConnectedSocket() client: GameSocket): WsResponse<MediaEntry> {

        let uuid, songInfo;

        if (mood === MediaMood.MainMenu) {
            uuid = this.mediaService.getMenuTrackFromGlobalMediaLibrary();
        } else {
            uuid = this.mediaService.changeMood(game.id, mood);
        }

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
