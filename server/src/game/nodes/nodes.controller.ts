import { Controller, UseInterceptors } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GameChannels } from '../../game-event-type';
import { GameResolverInterceptor } from '../game-resolver/game-resolver.interceptor';
import { NodeEventPayload, NodeEventType } from './nodes-events';
import { GameObject } from '../../game-models/game-object/game-object';

@WebSocketGateway()
@UseInterceptors(GameResolverInterceptor)
@Controller()
export class NodesController {
    @SubscribeMessage(GameChannels.NODES)
    handleNodeEvent(client, msg: NodeEventPayload): any {
        const game: GameObject = client.game;

        switch (msg.type) {
            case NodeEventType.FindNode:
                if (msg.data['ip']) {
                    return game.getNodeByIP(msg.type['ip']);
                } else if (msg.data['hostname']) {
                    return game.findNodeByHostname(msg.type['hostname']);
                }
                break;
            case NodeEventType.ExecuteCommand:
                throw new Error('Not implemented');
                break;
            default:
                throw new Error(`Unknown node event type ${msg.type}`);
        }
        // console.log('handleNodeEvent', msg);
        // return msg;
    }
}
