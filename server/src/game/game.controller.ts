import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { EventMessagePayload, GameChannels, GameEvents } from '../game-events';
import { GameService } from './game.service';
import { GameObject } from '../game-models/game-object/game-object';
import { JwtAuthGuard } from '../jwt/guard/jwt-auth.guard';

@WebSocketGateway()
@UseGuards(JwtAuthGuard)
export class GameController {

    constructor(private gameService: GameService) {
    }

    @SubscribeMessage(GameChannels.GAME)
    handleGameEvent(client, msg: EventMessagePayload): GameObject | void {
        switch (msg.type) {
            case GameEvents.GAME_CREATED:
                return this.gameService.createGame();
                break;
            case GameEvents.GAME_JOINED:
                // const game = this.gameService.getGame(msg.data.gameId);
                throw new Error('Not implemented');
                break;
            case GameEvents.GAME_STARTED:
                throw new Error('Not implemented');
                break;
            case GameEvents.GAME_FINISHED:
                throw new Error('Not implemented');
                break;
            default:
                throw new Error(`Unknown game event type ${msg.type}`);
        }
    }
}