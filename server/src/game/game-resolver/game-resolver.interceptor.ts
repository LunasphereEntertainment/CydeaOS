import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameService } from '../game.service';
import { GameNotFoundError } from "../game.errors";

@Injectable()
export class GameResolverInterceptor implements NestInterceptor {

    constructor(private gameService: GameService) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let code: string,
            client: any;

        if (context.getType() === 'http') {
            client = context.switchToHttp().getRequest();
            code = client.query.code;
        } else if (context.getType() === 'ws') {
            client = context.switchToWs().getClient();
            code = client.handshake.query.code;
        }

        if (code) {
            try {
                client.game = this.gameService.getGame(code);

                return next.handle();
            } catch (e) {
                if (e instanceof GameNotFoundError) {
                    console.warn(GameResolverInterceptor.name, 'Game not found', code);
                } else {
                    console.error(GameResolverInterceptor.name, e);
                }
                throw e;
            }
        }

        throw new BadRequestException('Game code not provided');
    }
}
