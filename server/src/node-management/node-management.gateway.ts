import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from '@nestjs/websockets';
import { NodeManagementService } from './node-management.service';
import { Server } from 'socket.io';
import { GameEventCategory } from '@cydeaos/libs/events/game-event';
import { AuthSocket } from '../auth-socket.interface';
import { NodeManagementEvent } from '@cydeaos/libs/events/node-management-event/node-management-event';
import { GameResolverPipe } from '../game-resolver/game-resolver.pipe';
import { GameObject } from '@cydeaos/libs/game-object/game-object';
import { NodeEventType } from '@cydeaos/libs/events/node-management-event/node-event-type';

@WebSocketGateway({ cors: process.env.CORS === 'true' })
export class NodeManagementGateway {
    @WebSocketServer()
    server!: Server;

    constructor(private nodeManagementService: NodeManagementService) {
    }

    private handeNodeGet(gameCode: string, payload: NodeManagementEvent): WsResponse<NodeManagementEvent> {
        if (!payload.ip)
            return {
                event: GameEventCategory.Network,
                data: NodeManagementEvent.error(gameCode, 'No IP provided')
            };
        const node = this.nodeManagementService.findNode(gameCode, payload.ip);
        // TODO: verify I am one of:
        //  1. The owner of the node
        //  2. Otherwise authorized to access the node (authenticating with the node)
        if (!node)
            return {
                event: GameEventCategory.Network,
                data: NodeManagementEvent.error(gameCode, 'Node not found')
            }

        return {
            event: GameEventCategory.Network,
            data: NodeManagementEvent.nodeResponse(gameCode, NodeEventType.NodeGet, node)
        }
    }


    @SubscribeMessage(GameEventCategory.Network)
    handleNodeEvent(
        @ConnectedSocket() client: AuthSocket,
        @MessageBody('gameCode', GameResolverPipe) game: GameObject,
        @MessageBody() payload: NodeManagementEvent,
    ): WsResponse<NodeManagementEvent> {
        switch (payload.type) {
            case NodeEventType.NodeGet:
                return this.handeNodeGet(game.gameCode, payload);

            // case NodeEventType.:

            default:
                return {
                    event: GameEventCategory.Network,
                    data: NodeManagementEvent.error(game.gameCode, `Event type ${ payload.type } is unsupported or not implemented`)
                }
        }
    }

}
