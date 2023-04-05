import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { NodeManagementService } from '../node-management/node-management.service';
import { NetworkingEvent, NetworkingEventType } from './networking-event';
import { GameSocket } from '../game-socket.interface';
import { BadRequestException } from '@nestjs/common';

@WebSocketGateway({ cors: process.env.CORS === 'true' })
export class NetworkingGateway {

  constructor(private nodeManagementService: NodeManagementService) {
  }

  @SubscribeMessage(NetworkingEventType.Request)
  handleRequest(client: GameSocket, payload: NetworkingEvent): any {
    const { target: targetIp, serviceName, data } = payload.data;

    if (!serviceName) {
      throw new BadRequestException('Service name is required.');
    }

    const node = this.nodeManagementService.findNode(client.game.gameCode, targetIp);
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

    const node = this.nodeManagementService.findNode(client.game.gameCode, targetIp);
    if (node) {
      const daemon = node.daemons.find(daemon => daemon.name === serviceName);
      if (!daemon) {
        throw new BadRequestException(`Service ${serviceName} not available.`);
      }

      const port = daemon.ports.find(port => port.port === data.port);
      if (port)
        port.openPort();
      else
        throw new BadRequestException(`Port ${data.port} not found.`);
    }
  }
}
