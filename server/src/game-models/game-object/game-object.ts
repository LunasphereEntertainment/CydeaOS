import { Computer } from "../computer/computer";
import { v4 as uuidv4 } from 'uuid'
import { DnsService, DnsServiceImpl } from "../dns-server/dns-service-impl";
import { DnsServer } from "../dns-server/dns-server";
export class GameObject implements DnsService {
    id: string;

    type: GameType = GameType.Elimination;

    dns: DnsServiceImpl

    nodesByIP: Map<string, Computer>

    constructor(dns?: DnsServiceImpl, nodesByIP?: Map<string, Computer>) {
        this.id = uuidv4();
        this.dns = dns || new DnsServiceImpl();
        this.nodesByIP = nodesByIP || new Map();
    }

    registerNode(node: Computer) {
        this.nodesByIP.set(node.ip, node);
        this.dns.set(node.hostname, node.ip);
    }

    getNodeByIP(ip: string): Computer {
        return this.nodesByIP.get(ip);
    }

    lookup(hostname: string): string {
        let ip = this.dns.get(hostname);

        return this.dns.lookup(hostname);
    }

    findNodeByHostname(hostname: string): Computer {
        return this.getNodeByIP(this.dns.lookup(hostname));
    }
}

export enum GameType {
    Elimination = "Elimination",
    TeamDeathMatch = "TeamDeathMatch",
    FreePlay = "FreePlay"
}