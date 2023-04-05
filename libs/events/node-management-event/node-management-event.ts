import { GameEvent, GameEventCategory } from '../game-event';
import { Computer } from '../../nodes/computer/computer';
import { NodeEventType } from './node-event-type';

export class NodeManagementEvent extends GameEvent {
    type: NodeEventType;
    ip?: string;
    hostname?: string;
    nodeInfo?: Computer;
    message?: string;

    constructor(gameCode: string, type: NodeEventType, nodeInfo?: Computer) {
        super(GameEventCategory.Network);
        this.gameCode = gameCode;
        this.type = type;
        this.nodeInfo = nodeInfo;
    }

    static nodeRequest(gameCode: string, type: NodeEventType, ip?: string, hostname?: string) {
        const ev = new NodeManagementEvent(gameCode, type);
        ev.ip = ip;
        ev.hostname = hostname;
        return ev;
    }

    static nodeResponse(gameCode: string, type: NodeEventType, nodeInfo: Computer) {
        return new NodeManagementEvent(gameCode, type, nodeInfo);
    }

    static error(gameCode: string, message: string) {
        const ev = new NodeManagementEvent(gameCode, NodeEventType.Error);
        ev.message = message;
        return ev;
    }
}