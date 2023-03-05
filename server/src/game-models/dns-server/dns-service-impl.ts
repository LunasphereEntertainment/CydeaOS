import { Computer } from "../computer/computer";

export interface DnsService {
    registerNode(node: Computer): void;

    lookup(hostname: string): string;
}

export class DnsServiceImpl extends Map<string, string> {
    registerNode(node: Computer) {
        this.set(node.hostname, node.ip);
    }

    lookup(hostname: string): string {
        const ip = this.get(hostname);
        if (!ip) {
            throw new DnsNotFoundError(hostname);
        }
        return ip;
    }
}

export class DnsNotFoundError extends Error {
    constructor(hostname: string) {
        super(`DNS lookup failed for hostname ${hostname}`);
    }
}
