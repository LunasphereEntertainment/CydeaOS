import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { UseInterceptors } from '@nestjs/common';
import { GameResolverInterceptor } from '../game/game-resolver/game-resolver.interceptor';
import { NodeManagementService } from '../node-management/node-management.service';
import { GameSocket } from '../game-socket.interface';
import { Server } from 'socket.io';

@WebSocketGateway()
@UseInterceptors(GameResolverInterceptor)
export class ConnectHandlerGateway {

    constructor(private nodeManagementService: NodeManagementService) {
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('connect')
    handleConnection(client: GameSocket, payload: { target: string }) {
        const { target: targetIp } = payload;
        const node = this.nodeManagementService.findNode(client.game.id, targetIp);
        if (node) {
            const player = client.player;

            if (node.isOnline()) {
                player.setCurrentTarget(targetIp);

                // if the node is owned by someone else, alert the owner
                if (node.owner !== 'System') {
                    // find the player who owns the node
                    const opponent = client.game.players.find(p => p.username === node.owner);

                    if (opponent) {
                        // get their socket id
                        const ownerSocket = opponent.getSocketId();
                        if (ownerSocket) {
                            // send them an alert
                            this.server.to(ownerSocket).emit('alert', { message: `${ player.username } is trying to connect to your node ${ node.ip }` });
                        }
                    }
                }

                client.emit('connect', { success: true, target: node });
            } else {
                client.emit('connect', { success: false, message: 'Node is offline' });
            }
        }
    }
}
