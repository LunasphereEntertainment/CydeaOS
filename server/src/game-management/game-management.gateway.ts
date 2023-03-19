import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GameManagementEvent, GameManagementEventType, GameManagementResponseEvent } from "./game-management-events";
import { GameManagementService } from "./game.management.service";
import { GameConfiguration } from "../../../libs/game-configuration/game-configuration";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../shared/jwt/guard/jwt-auth.guard";
import { AuthSocket } from "../auth.socket.interface";
import { Player } from "../../../libs/player/player";

@WebSocketGateway()
@UseGuards(JwtAuthGuard)
export class GameManagementGateway {

    constructor(private gameManagementService: GameManagementService) {
    }

    @SubscribeMessage(GameManagementEventType.GameCreated)
    handleMessage(client: any, payload: GameManagementEvent): GameManagementResponseEvent {
        const {id: clientId} = client;

        // TODO: Validate game settings

        const game = this.gameManagementService.newGame(<GameConfiguration>payload.data);

        return <GameManagementResponseEvent>{
            type: GameManagementEventType.GameCreated,
            data: game
        }
    }

    @SubscribeMessage(GameManagementEventType.GameJoined)
    handleJoinMessage(client: AuthSocket, payload: GameManagementEvent): GameManagementResponseEvent {
        const game = this.gameManagementService.getGame(payload.data['code']);

        const player = Player.fromAccount(client.user);
        player.setSocketId(client.id);
        game.join(player);
        return <GameManagementResponseEvent>{
            type: GameManagementEventType.GameJoined,
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
