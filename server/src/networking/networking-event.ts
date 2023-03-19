export class NetworkingEvent {
    type: NetworkingEventType;
    data: { target: string, serviceName: string, data: { path?: string, port?: number } };
}

export enum NetworkingEventType {
    Request = 'request',
    Response = 'response',
    Hack = 'hack'
}
