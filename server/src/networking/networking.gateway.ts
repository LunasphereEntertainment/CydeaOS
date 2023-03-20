import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { NodeManagementService } from '../node-management/node-management.service';
import { NetworkingEvent, NetworkingEventType } from './networking-event';
import { GameSocket } from '../game-socket.interface';
import { BadRequestException, UseInterceptors } from '@nestjs/common';
import { GameResolverInterceptor } from '../game/game-resolver/game-resolver.interceptor';

@WebSocketGateway({ cors: process.env.CORS === 'true' })
@UseInterceptors(GameResolverInterceptor)
export class NetworkingGateway {

  constructor(private nodeManagementService: NodeManagementService) {
  }

  @SubscribeMessage(NetworkingEventType.Request)
  handleRequest(client: GameSocket, payload: NetworkingEvent): string {
    const { target: targetIp, serviceName, data } = payload.data;

    if (!serviceName) {
      throw new BadRequestException('Service name is required.');
    }

    const node = this.nodeManagementService.findNode(client.game.id, targetIp);
    if (node) {
      const daemon = node.daemons.find(daemon => daemon.name === serviceName);
      if (!daemon) {
        throw new BadRequestException(`Service ${serviceName} not available.`);
      }

      return daemon.handleRequest(data);
    }
  }

  @SubscribeMessage(NetworkingEventType.Hack)
  handleHack(client: GameSocket, payload: NetworkingEvent): void {
    const { target: targetIp, serviceName, data } = payload.data;

    if (!serviceName) {
      throw new BadRequestException('Service name is required.');
    }

    const node = this.nodeManagementService.findNode(client.game.id, targetIp);
    if (node) {
      const daemon = node.daemons.find(daemon => daemon.name === serviceName);
      if (!daemon) {
        throw new BadRequestException(`Service ${serviceName} not available.`);
      }

      daemon.ports.find(port => port.port === data.port).openPort();
    }
  }
}