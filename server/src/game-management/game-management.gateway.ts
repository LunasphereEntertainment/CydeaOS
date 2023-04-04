import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from '@nestjs/websockets';
import { GameManagementService } from './game.management.service';
import { GameConfiguration } from '@cydeaos/libs/game-configuration/game-configuration';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/jwt/guard/jwt-auth.guard';
import { AuthSocket } from '../auth-socket.interface';
import { Player } from '@cydeaos/libs/player/player';
import { GameObject } from '@cydeaos/libs/game-object/game-object'
import { Server } from 'socket.io';
import { GameManagementEventType } from '@cydeaos/libs/events/game-management-event/game-management-event-type';
import { GameManagementResponse } from '@cydeaos/libs/events/game-management-event/game-management-response';
import { GameJoinResponse } from '@cydeaos/libs/events/game-management-event/game-join-responses';

@WebSocketGateway({ cors: true })
@UseGuards(JwtAuthGuard)
export class GameManagementGateway {

    @WebSocketServer()
    server!: Server;

    constructor(private gameManagementService: GameManagementService) {
    }

    @SubscribeMessage(GameManagementEventType.GameGet)
    handleGetGameMessage(
        @MessageBody() gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameObject> {
        const game = this.gameManagementService.getGame(gameId);

        // if this is a reconnect from previous
        if (game.getHostSocketId() !== client.id && game.host.username === client.user.username) {
            game.setHostSocketId(client.id);
        } else {
            const player = Player.fromAccount(client.user);
            game.findPlayerByUsername(player.username)?.setSocketId(client.id);
        }

        return {
            event: GameManagementEventType.GameGet,
            data: game
        }
    }

    @SubscribeMessage(GameManagementEventType.GameCreation)
    handleCreationMessage(
        @MessageBody('config') config: GameConfiguration,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameManagementResponse> {
        // const {id: clientId} = client;

        // Validate game settings
        if (!config || !config.ipType || !config.musicMode) {
            return {
                event: GameManagementEventType.GameCreation,
                data: {
                    success: false,
                    gameCode: '',
                    error: 'Invalid or missing game configuration'
                }
            }
        }

        const game = this.gameManagementService.newGame(config, client.user);
        game.setHostSocketId(client.id);

        client.join(game.gameCode);

        return {
            event: GameManagementEventType.GameCreation,
            data: {
                success: true,
                gameCode: game.gameCode,
                data: game
            }
        }
    }

    @SubscribeMessage(GameManagementEventType.GameJoined)
    handleJoinMessage(
        @MessageBody('gameId') gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameJoinResponse> {
        const game = this.gameManagementService.getGame(gameId);

        const player = Player.fromAccount(client.user);
        player.setSocketId(client.id);
        game.join(player);

        // inform the host.
        this.server.to(game.getHostSocketId())
            .emit(GameManagementEventType.GameJoined, GameJoinResponse.serverPlayerResponse(gameId, player));

        client.join(gameId);

        return {
            event: GameManagementEventType.GameJoined,
            data: GameJoinResponse.clientPlayerResponse(game)
        }
    }

    @SubscribeMessage(GameManagementEventType.GameLeft)
    handleLeaveMessage(
        @MessageBody('gameId') gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameJoinResponse> {
        const game = this.gameManagementService.getGame(gameId);

        const player = Player.fromAccount(client.user);
        player.setSocketId(client.id);
        game.leave(player);

        // inform the host.
        client.to(game.getHostSocketId())
            .emit(GameManagementEventType.GameLeft, GameJoinResponse.serverPlayerResponse(gameId, player));

        return {
            event: GameManagementEventType.GameLeft,
            data: GameJoinResponse.clientPlayerResponse(game)
        }
    }

    @SubscribeMessage(GameManagementEventType.GameStarted)
    handleStartMessage(
        @MessageBody('gameId') gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameManagementResponse> {
        const game = this.gameManagementService.getGame(gameId);
        game.start();

        client.to(gameId).emit(GameManagementEventType.GameStarted, game);

        return {
            event: GameManagementEventType.GameStarted,
            data: <GameManagementResponse>{
                gameCode: gameId,
            }
        }
    }

    @SubscribeMessage(GameManagementEventType.GameFinished)
    handleStopMessage(
        @MessageBody('gameId') gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameManagementResponse> {
        const game = this.gameManagementService.getGame(gameId);
        game.stop();

        client.to(gameId).emit(GameManagementEventType.GameFinished, game);

        return {
            event: GameManagementEventType.GameFinished,
            data: {
                data: game,
                gameCode: gameId,
                success: true,
            }
        }
    }

    @SubscribeMessage(GameManagementEventType.GameDeletion)
    handleDeletionMessage(
        @MessageBody('gameId') gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameManagementResponse> {
        const game = this.gameManagementService.getGame(gameId);
        this.gameManagementService.deleteGame(gameId);

        client.to(gameId).emit(GameManagementEventType.GameDeletion, gameId);

        return {
            event: GameManagementEventType.GameDeletion,
            data: {
                data: game,
                gameCode: gameId,
                success: true,
            }
        }
    }
}
