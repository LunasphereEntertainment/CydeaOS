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
import { MediaEventType, MusicPlaybackMode } from './media-event/media-event';
import { GameObject } from '../game-models/game-object/game-object';
import { JwtAuthGuard } from "../shared/jwt/guard/jwt-auth.guard";
import { MediaMood } from "../game-models/media/media-mood/media-mood";
import { MediaError } from "./media-library";

@Controller('media')
@WebSocketGateway()
@UseInterceptors(JwtAuthGuard)
export class MediaController {

    constructor(private mediaService: MediaService) {}

    @Get('/:uuid')
    streamTrack(@Res() res, @Param('uuid', new ParseUUIDPipe({version: "4"})) uuid: string) {
        try {
            const trackInfo = this.mediaService.getFromGlobalMediaLibrary(uuid);

            createReadStream(trackInfo.path)
                .pipe(res);
        } catch (e) {
            if (e instanceof MediaError) {
                res.status(404).send(e.message);
                return;
            }
        }

    }


    @SubscribeMessage(MediaEventType.GET_TRACK)
    @UseInterceptors(GameResolverInterceptor)
    getTrack(
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
    }
}
