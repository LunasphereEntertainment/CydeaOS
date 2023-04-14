import { NetworkPacket } from '@cydeaos/libs/nodes/networking/packet';
import { InGameEvent } from '@cydeaos/libs/events/game-event-payload';

export interface NetworkingEvent extends InGameEvent {
    type: NetworkingEventType;
    data: NetworkPacket;
}

export enum NetworkingEventType {
    Request = 'request',
    Response = 'response',
    Hack = 'hack'
}
