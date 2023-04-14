import { ComputerDaemon } from '../ComputerDaemon';
import { Computer } from '../../computer/computer';
import { DNSPacketData, NetworkPacketType } from '../../networking/packet';

type HostIPMap = Map<string, string>;

export class DnsServer extends ComputerDaemon {
    dns: HostIPMap;

    constructor(computer: Computer, overridePort: number = 53, dns?: HostIPMap) {
        super(computer, NetworkPacketType.DNS, overridePort);
        this.dns = dns || new Map();
    }

    registerNode(node: Computer) {
        if (this.dns.has(node.hostname)) {
            throw new Error(`Node with hostname ${ node.hostname } already registered`);
        }

        this.dns.set(node.hostname, node.ip!);
    }

    lookupIP(hostname: string): string {
        const ip = this.dns.get(hostname);
        if (!ip) {
            throw new DnsNotFoundError(hostname);
        }
        return ip;
    }

    handleRequest(data: DNSPacketData): any {
        const { host } = data;
        return this.lookupIP(host);
    }
}

export class DnsNotFoundError extends Error {
    constructor(hostname: string) {
        super(`DNS lookup failed for hostname ${ hostname }`);
    }
}
