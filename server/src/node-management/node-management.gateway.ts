import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { AuthSocket } from '../auth-socket.interface';
import { NodeManagementEvent } from '@cydeaos/libs/events/node-management-event/node-management-event';
import { GameResolverPipe } from '../resolvers/game-resolver/game-resolver.pipe';
import { GameObject } from '@cydeaos/libs/game-object/game-object';
import { NodeEventType } from '@cydeaos/libs/events/node-management-event/node-event-type';
import { NodeResolverPipe } from '../resolvers/node-resolver/node-resolver.pipe';
import { Computer } from '@cydeaos/libs/nodes/computer/computer';

@WebSocketGateway({ cors: process.env.CORS === 'true' })
export class NodeManagementGateway {
    @SubscribeMessage(NodeEventType.NodeGet)
    handleNodeGet(
        @MessageBody('gameCode', GameResolverPipe) game: GameObject,
        @MessageBody() payload: NodeManagementEvent,
        @MessageBody(NodeResolverPipe) node: Computer,
        @ConnectedSocket() client: AuthSocket
    ) {
        return {
            event: NodeEventType.NodeGet,
            data: NodeManagementEvent.nodeResponse(game.gameCode, NodeEventType.NodeGet, node)
        }
    }

    @SubscribeMessage(NodeEventType.NodeOffline)
    handleNodeOffline(
        @MessageBody('gameCode', GameResolverPipe) game: GameObject,
        @MessageBody(NodeResolverPipe) node: Computer,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<NodeManagementEvent> {
        node.online = false;

        client.to(game.gameCode)
            .emit(
                NodeEventType.NodeOffline,
                NodeManagementEvent.nodeResponse(game.gameCode, NodeEventType.NodeOffline, node)
            );

        return {
            event: NodeEventType.NodeOffline,
            data: NodeManagementEvent.nodeResponse(game.gameCode, NodeEventType.NodeOffline, node)
        }
    }

    @SubscribeMessage(NodeEventType.NodeOnline)
    handleNodeOnline(
        @MessageBody('gameCode', GameResolverPipe) game: GameObject,
        @MessageBody(NodeResolverPipe) node: Computer,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<NodeManagementEvent> {
        node.online = true;

        client.to(game.gameCode)
            .emit(
                NodeEventType.NodeOnline,
                NodeManagementEvent.nodeResponse(game.gameCode, NodeEventType.NodeOnline, node)
            );

        return {
            event: NodeEventType.NodeOnline,
            data: NodeManagementEvent.nodeResponse(game.gameCode, NodeEventType.NodeOnline, node)
        }
    }
}
