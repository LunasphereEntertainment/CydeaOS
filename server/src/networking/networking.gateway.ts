import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { NodeManagementService } from '../node-management/node-management.service';
import { NetworkingEvent, NetworkingEventType } from './networking-event';
import { BadRequestException } from '@nestjs/common';
import { AuthSocket } from '../auth-socket.interface';
import { NetworkHackPacketData } from '@cydeaos/libs/nodes/networking/packet';
import { GameResolverPipe } from '../resolvers/game-resolver/game-resolver.pipe';
import { GameObject } from '@cydeaos/libs/game-object/game-object';

@WebSocketGateway({ cors: process.env.CORS === 'true' })
export class NetworkingGateway {

    constructor(private nodeManagementService: NodeManagementService) {
    }

    @SubscribeMessage(NetworkingEventType.Request)
    handleRequest(
        @MessageBody('gameId', GameResolverPipe) game: GameObject,
        @MessageBody() payload: NetworkingEvent,
        @ConnectedSocket() client: AuthSocket
    ): WsResponse<unknown> {
        const { destination } = payload.data;

        const node = this.nodeManagementService.findNode(game.gameCode, destination);

        if (!node)
            throw new BadRequestException(`No route to host ${ destination } found.`);

        return {
            event: NetworkingEventType.Response,
            data: node.handlePacket(payload.data)
        }
    }

    @SubscribeMessage(NetworkingEventType.Hack)
    handleHack(
        @MessageBody('gameId', GameResolverPipe) game: GameObject,
        @MessageBody() payload: NetworkingEvent,
        @ConnectedSocket() client: AuthSocket
    ): void {
        const { destination: targetIp } = payload.data,
            data = <NetworkHackPacketData>payload.data.data;

        const node = this.nodeManagementService.findNode(game.gameCode, targetIp);
        if (node) {
            const daemon = node.daemons.find(daemon => daemon.ports.findIndex(p => p.port === data.port) > -1);
            if (!daemon) {
                throw new BadRequestException(`No active port ${ data.port } on ${ targetIp } not available.`);
            }

            const port = daemon.ports.find(port => port.port === data.port);
            if (port)
                port.openPort();
            else
                throw new BadRequestException(`Port ${ data.port } not found.`);
        }
    }
}
