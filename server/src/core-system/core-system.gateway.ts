import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { AuthSocket } from '../auth-socket.interface';
import { GameEventCategory } from '@cydeaos/libs/events/game-event';
import { CoreEventType, CoreSystemEvent } from '@cydeaos/libs/events/core-event';
import { GameManagementEvent } from '@cydeaos/libs/events/game-management-event/game-management-event';
import { GameManagementEventType } from '@cydeaos/libs/events/game-management-event/game-management-event-type';
import { GameManagementService } from '../game-management/game.management.service';

@WebSocketGateway({ cors: process.env.CORS === 'true', namespace: '' })
export class CoreSystemGateway {
    constructor(private gameManagementService: GameManagementService) {
    }

    @SubscribeMessage(GameEventCategory.GameManagement)
    public handleGameManagement(
        @ConnectedSocket() client: AuthSocket,
        @MessageBody() payload: GameManagementEvent
    ): WsResponse<GameManagementEvent | CoreSystemEvent> {
        console.log('CoreSystemGateway:handleGameManagement', payload);

        switch (payload.type) {
            case GameManagementEventType.GameGet: {
                if (!payload.gameCode) {
                    return {
                        event: 'core-system',
                        data: new CoreSystemEvent(CoreEventType.Error, `Game code is required.`)
                    };
                }

                const game = this.gameManagementService.getGame(payload.gameCode);
                return {
                    event: GameEventCategory.GameManagement,
                    data: GameManagementEvent.gameResponse(game.gameCode, GameManagementEventType.GameGet, game)
                }
            }
            case GameManagementEventType.GameCreation: {
                if (!payload.gameConfig) {
                    return {
                        event: GameEventCategory.GameManagement,
                        data: new CoreSystemEvent(CoreEventType.Error, `Game configuration is required.`)
                    };
                }

                const game = this.gameManagementService.newGame(payload.gameConfig!, client.user);
                game.setHostSocketId(client.id);
                return {
                    event: GameEventCategory.GameManagement,
                    data: GameManagementEvent.gameResponse(game.gameCode, GameManagementEventType.GameCreation, game)
                }
            }
            default: {
                return {
                    event: 'core-system',
                    data: new CoreSystemEvent(
                        CoreEventType.Error,
                        `Request type "${ payload.type }" is unsupported. This may be an in-game only event.`
                    )
                }
            }
        }
    }

    @SubscribeMessage('core-system')
    public handleCoreSystem(
        @ConnectedSocket() client: AuthSocket,
        @MessageBody() payload: CoreSystemEvent): WsResponse<CoreSystemEvent> {

        console.log('CoreSystemGateway:handleCoreSystem', payload);

        return {
            event: 'core-system',
            data: new CoreSystemEvent(
                CoreEventType.Error,
                'Not yet implemented.'
                // `Operation "${ payload.category }" is unsupported. This may be an in-game only event.`
            )
        };

        // // switch (payload.category) {
        // //     case GameEventCategory.GameManagement:
        // //         const gameManagementEvent = payload as GameManagementEvent;
        // //         return this.handleGameManagementEvent(client, gameManagementEvent.type, gameManagementEvent.gameCode, gameManagementEvent.gameConfig);
        // //
        // //         break;
        // //     default:
        // //
        // }

    }
}