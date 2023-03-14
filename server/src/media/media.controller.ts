import {
    Controller,
    Get,
    NotImplementedException,
    Param,
    ParseEnumPipe,
    ParseUUIDPipe,
    Res,
    UseInterceptors
} from '@nestjs/common';
import { MediaService } from './media.service';
import { createReadStream } from 'fs';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GameResolverInterceptor } from '../game/game-resolver/game-resolver.interceptor';
import { JwtAuthGuard } from '../jwt/guard/jwt-auth.guard';
import { MediaEventType, MusicPlaybackMode } from './media-event/media-event';
import { GameObject } from '../game-models/game-object/game-object';
import { MediaGenre } from './media.entry/media.entry';

@Controller('media')
@WebSocketGateway()
@UseInterceptors(JwtAuthGuard)
export class MediaController {

    constructor(private mediaService: MediaService) {}

    @Get('/:uuid')
    streamTrack(@Res() res, @Param('uuid', new ParseUUIDPipe({version: "4"})) uuid: string) {
        const trackInfo = this.mediaService.getTrack(uuid);
        createReadStream(trackInfo.path)
            .pipe(res);
    }


    @SubscribeMessage(MediaEventType.GET_TRACK)
    @UseInterceptors(GameResolverInterceptor)
    getTrack(
        @ConnectedSocket() client,
        // @MessageBody('type', new ParseEnumPipe(MediaEventType)) eventType: MediaEventType
        @MessageBody('genre', new ParseEnumPipe(MediaGenre)) requestedGenre: MediaGenre
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
    }
}
