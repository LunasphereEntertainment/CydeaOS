import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { GameManagementService } from './game.management.service';
import { GameConfiguration } from '@cydeaos/libs/game-configuration/game-configuration';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/jwt/guard/jwt-auth.guard';
import { AuthSocket } from '../auth-socket.interface';
import { Player } from '@cydeaos/libs/player/player';
import { GameObject } from '@cydeaos/libs/game-object/game-object'
import { Server } from 'socket.io';
import { GameEventType } from '@cydeaos/libs/events/game-management-event/game-event-type';
import { GameManagementResponse } from '@cydeaos/libs/events/game-management-event/game-management-response';
import { GameJoinClientResponse, GameJoinServerNotification } from '@cydeaos/libs/events/game-management-event/game-join-responses';

@WebSocketGateway({ cors: true })
@UseGuards(JwtAuthGuard)
export class GameManagementGateway {

    @WebSocketServer()
    server!: Server;

    constructor(private gameManagementService: GameManagementService) {
    }

    @SubscribeMessage(GameEventType.GameGet)
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
            event: GameEventType.GameGet,
            data: game
        }
    }

    @SubscribeMessage(GameEventType.GameCreation)
    handleCreationMessage(
        @MessageBody('config') config: GameConfiguration,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameManagementResponse> {
        // const {id: clientId} = client;

        // Validate game settings
        if (!config || !config.ipType || !config.musicMode) {
            return {
                event: GameEventType.GameCreation,
                data: {
                    type: GameEventType.GameCreation,
                    success: false,
                    error: 'Invalid or missing game configuration'
                }
            }
        }

        const game = this.gameManagementService.newGame(config, client.user);
        game.setHostSocketId(client.id);

        client.join(game.id);

        return {
            event: GameEventType.GameCreation,
            data: {
                type: GameEventType.GameCreation,
                success: true,
                data: game
            }
        }
    }

    @SubscribeMessage(GameEventType.GameJoined)
    handleJoinMessage(
        @MessageBody('gameId') gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameJoinClientResponse> {
        const game = this.gameManagementService.getGame(gameId);

        const player = Player.fromAccount(client.user);
        player.setSocketId(client.id);
        game.join(player);

        // inform the host.
        this.server.to(game.getHostSocketId())
            .emit(GameEventType.GameJoined, new GameJoinServerNotification(gameId, player));

        client.join(gameId);

        return {
            event: GameEventType.GameJoined,
            data: new GameJoinClientResponse(game)
        }
    }

    @SubscribeMessage(GameEventType.GameLeft)
    handleLeaveMessage(
        @MessageBody('gameId') gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameJoinClientResponse> {
        const game = this.gameManagementService.getGame(gameId);

        const player = Player.fromAccount(client.user);
        player.setSocketId(client.id);
        game.leave(player);

        // inform the host.
        this.server.to(game.getHostSocketId())
            .emit(GameEventType.GameLeft, GameJoinServerNotification.gameLeftNotification(gameId, player));

        return {
            event: GameEventType.GameLeft,
            data: new GameJoinClientResponse(game)
        }
    }

    @SubscribeMessage(GameEventType.GameStarted)
    handleStartMessage(
        @MessageBody('gameId') gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameManagementResponse> {
        const game = this.gameManagementService.getGame(gameId);
        game.start();

        client.to(gameId).emit(GameEventType.GameStarted, game);

        return {
            event: GameEventType.GameStarted,
            data: <GameManagementResponse>{
                type: GameEventType.GameStarted,
                data: game
            }
        }
    }

    @SubscribeMessage(GameEventType.GameFinished)
    handleStopMessage(
        @MessageBody('gameId') gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameManagementResponse> {
        const game = this.gameManagementService.getGame(gameId);
        game.stop();

        client.to(gameId).emit(GameEventType.GameFinished, game);

        return {
            event: GameEventType.GameFinished,
            data: <GameManagementResponse>{
                type: GameEventType.GameFinished,
                data: game,
                success: true,
            }
        }
    }

    @SubscribeMessage(GameEventType.GameDeletion)
    handleDeletionMessage(
        @MessageBody('gameId') gameId: string,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<GameManagementResponse> {
        const game = this.gameManagementService.getGame(gameId);
        this.gameManagementService.deleteGame(gameId);

        client.to(gameId).emit(GameEventType.GameDeletion, gameId);

        return {
            event: GameEventType.GameDeletion,
            data: <GameManagementResponse>{
                type: GameEventType.GameDeletion,
                data: game,
                success: true,
            }
        }
    }
}
