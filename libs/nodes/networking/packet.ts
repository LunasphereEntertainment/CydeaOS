export interface NetworkPacket {
    type?: NetworkPacketType;
    source?: string;
    destination: string;
    data: HTTPPacketData | DNSPacketData | SSHPacketData | NetworkHackPacketData;
}

export interface HTTPPacketData {
    path: string;
}

export interface DNSPacketData {
    host: string;
}

export interface SSHPacketData {
    command: string;
}

export interface NetworkHackPacketData {
    port: number;
}

export function NetworkHackRequest(source: string, destination: string, port: number): NetworkPacket {
    return newNetworkRequest(
        source,
        destination,
        <NetworkHackPacketData>{
            port
        }
    );
}

function newNetworkRequest(source: string, destination: string, data: any): NetworkPacket {
    return {
        source,
        destination,
        data
    }
}

export function NewSSHRequest(source: string, destination: string, command: string): NetworkPacket {
    return newNetworkRequest(
        source,
        destination,
        <SSHPacketData>{
            command
        }
    );
}

export function NewHTTPRequeset(source: string, destination: string, path: string): NetworkPacket {
    return newNetworkRequest(
        source,
        destination,
        <HTTPPacketData>{
            path
        }
    );
}

export function NewDNSRequest(source: string, destination: string, host: string): NetworkPacket {
    return newNetworkRequest(
        source,
        destination,
        <DNSPacketData>{
            host
        }
    );
}

export enum NetworkPacketType {
    ICMP = 'ICMP',
    SSH = 'SSH',
    HTTP = 'HTTP',
    DNS = 'DNS'
}