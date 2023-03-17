import { Controller, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GameEventPayload, GameChannels, GameEventType } from '../game-event-type';
import { GameService } from './game.service';
import { GameObject } from '../game-models/game-object/game-object';
import { Player } from '../game-models/player/player';
import { NodeGeneratorService } from './node-generator/node-generator.service';
import { Socket } from 'socket.io'
import { JwtAuthGuard } from "../shared/jwt/guard/jwt-auth.guard";
import { GameConfiguration } from "../game-models/game-configuration/game-configuration";

@WebSocketGateway()
@UseGuards(JwtAuthGuard)
@Controller()
export class GameController {

    constructor(private gameService: GameService, private nodeGenerator: NodeGeneratorService) {
    }

    @SubscribeMessage(GameEventType.GAME_CREATED)
    handleGameCreated(client, msg: GameEventPayload): GameObject | void {
        // TODO: Validate game configuration value(s)
        return this.gameService.newGame(<GameConfiguration>msg.data);
    }

    @SubscribeMessage(GameEventType.GAME_JOINED)
    handleGameJoined(client, msg: GameEventPayload): GameObject | void {
        const targetGame = this.gameService.getGame(msg.data.gameId),
            player = Player.fromAccount(client.user);

        targetGame.join(client.user);

        const playerComputer = this.nodeGenerator.generatePlayerNode(player);
        playerComputer.ip = targetGame.ipGenerator.generate();

        // targetGame.registerNode(playerComputer);
        // player.setIP(playerComputer.ip);
    }

    @SubscribeMessage(GameEventType.GAME_STARTED)
    handleGameStarted(client: Socket): void {
        client.broadcast.emit(GameChannels.GAME, {
            type: GameEventType.GAME_STARTED,
        });
    }

    @SubscribeMessage(GameEventType.GAME_FINISHED)
    handleGameFinished(client: Socket): void {
        client.broadcast.emit(GameChannels.GAME, {
            type: GameEventType.GAME_FINISHED,
        });
    }

    @SubscribeMessage(GameChannels.GAME)
    handleGameEvent(client, msg: GameEventPayload): GameObject | void {
        switch (msg.type) {
            case GameEventType.GAME_CREATED:
                break;
            case GameEventType.GAME_JOINED:
                // const game = this.gameService.getGame(msg.data.gameId);
                throw new Error('Not implemented');
                break;
            case GameEventType.GAME_STARTED:
                throw new Error('Not implemented');
                break;
            case GameEventType.GAME_FINISHED:
                throw new Error('Not implemented');
                break;
            default:
                throw new Error(`Unknown game event type ${msg.type}`);
        }
    }
}
