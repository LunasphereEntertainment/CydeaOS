import { Controller, Get, Param, ParseUUIDPipe, Res, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from "../shared/jwt/guard/jwt-auth.guard";
import { MediaError } from "../../../libs/errors/media-error/media.error"
import { MediaUuid } from "../../dist/media/media-library";

@Controller('media')
@UseInterceptors(JwtAuthGuard)
export class MediaController {

    constructor(private mediaService: MediaService) {}

    @Get('/:uuid')
    streamTrack(@Res() res, @Param('uuid', new ParseUUIDPipe({version: "4"})) uuid: MediaUuid) {
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



}
