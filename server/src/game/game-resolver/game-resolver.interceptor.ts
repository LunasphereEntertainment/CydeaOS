import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameNotFoundError, GameService } from '../game.service';

@Injectable()
export class GameResolverInterceptor implements NestInterceptor {

    constructor(private gameService: GameService) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const client = context.switchToWs().getClient(),
            code = client.handshake.query.code;

        if (code) {
            try {
                client.game = this.gameService.getGame(code);

                return next.handle();
            } catch (e) {
                if (e instanceof GameNotFoundError) {
                    console.warn(GameResolverInterceptor.name, 'Game not found', code);
                } else {
                    console.error(GameResolverInterceptor.name, e);
                    throw e;
                }
            }
        }

        throw new BadRequestException('Game code not provided');
    }
}
