import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { GameManagementEvent, GameManagementEventType, GameManagementResponseEvent } from "../../../libs/events/game-management-event/game-management-event";
import { GameManagementService } from "./game.management.service";
import { GameConfiguration } from "../../../libs/game-configuration/game-configuration";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../shared/jwt/guard/jwt-auth.guard";
import { AuthSocket } from "../auth-socket.interface";
import { Player } from "../../../libs/player/player";
import { GameObject } from "../../../libs/game-object/game-object"
import { Server } from "socket.io";

@WebSocketGateway({cors: process.env.CORS === 'true'})
@UseGuards(JwtAuthGuard)
export class GameManagementGateway {

    @WebSocketServer()
    server: Server;

    constructor(private gameManagementService: GameManagementService) {
    }

    @SubscribeMessage(GameManagementEventType.GetGame)
    handleGetGameMessage(@MessageBody() gameId: string, @ConnectedSocket() client: AuthSocket): WsResponse<GameObject> {
        const game = this.gameManagementService.getGame(gameId);
        return {
            event: GameManagementEventType.GetGame,
            data: game
        }
    }

    @SubscribeMessage(GameManagementEventType.GameCreated)
    handleCreationMessage(@MessageBody() payload: GameManagementEvent, @ConnectedSocket() client: AuthSocket): WsResponse<unknown> {
        // const {id: clientId} = client;

        // TODO: Validate game settings

        const game = this.gameManagementService.newGame(<GameConfiguration>payload.data);
        game.setHostSocketId(client.id);

        return {
            event: GameManagementEventType.GameCreated,
            data: { success: true, id: game.id }
        }
    }

    @SubscribeMessage(GameManagementEventType.GameJoined)
    handleJoinMessage(@MessageBody() gameId: string, @ConnectedSocket() client: AuthSocket): WsResponse<unknown> {
        const game = this.gameManagementService.getGame(gameId);

        const player = Player.fromAccount(client.user);
        player.setSocketId(client.id);
        game.join(player);

        // inform the host.
        this.server.to(game.getHostSocketId()).emit(GameManagementEventType.GameJoined, player);

        return {
            event: GameManagementEventType.GameJoined,
            data: game
        }
    }

    // @SubscribeMessage(GameManagementEventType.GameLeft)

    @SubscribeMessage(GameManagementEventType.GameStarted)
    handleStartMessage(client: AuthSocket, payload: GameManagementEvent): GameManagementResponseEvent {
        const game = this.gameManagementService.getGame(payload.data['code']);
        game.start();
        return <GameManagementResponseEvent>{
            type: GameManagementEventType.GameStarted,
            data: game
        }
    }

    @SubscribeMessage(GameManagementEventType.GameFinished)
    handleStopMessage(client: AuthSocket, payload: GameManagementEvent): GameManagementResponseEvent {
        const game = this.gameManagementService.getGame(payload.data['code']);
        game.stop();
        return <GameManagementResponseEvent>{
            type: GameManagementEventType.GameFinished,
            data: game
        }
    }
}
