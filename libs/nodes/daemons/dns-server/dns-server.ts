import { ComputerDaemon } from "../ComputerDaemon";
import { NetworkPort } from "../../../network-port/network.port";
import { Computer } from "../../computer/computer";

type HostIPMap = Map<string, string>;

export class DnsServer implements ComputerDaemon {
    name: string = "DNS";

    ports: NetworkPort[] = [
    ];

    dns: HostIPMap;

    online: boolean = true;

    constructor(overridePort: number = 53, dns?: HostIPMap) {
        this.ports.push(new NetworkPort(overridePort, false));
        this.dns = dns || new Map();
    }

    registerNode(node: Computer) {
        if (this.dns.has(node.hostname)) {
            throw new Error(`Node with hostname ${node.hostname} already registered`);
        }

        this.dns.set(node.hostname, node.ip);
    }

    lookupIP(hostname: string): string {
        const ip = this.dns.get(hostname);
        if (!ip) {
            throw new DnsNotFoundError(hostname);
        }
        return ip;
    }

    handleRequest(data: any): any {
        return this.lookupIP(data);
    }

}

export class DnsNotFoundError extends Error {
    constructor(hostname: string) {
        super(`DNS lookup failed for hostname ${hostname}`);
    }
}
