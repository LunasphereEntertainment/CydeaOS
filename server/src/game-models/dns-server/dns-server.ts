import { Computer } from "../computer/computer";
import { DnsServiceImpl } from "./dns-service-impl";

export class DnsServer extends Computer {
    dns: DnsServiceImpl;

    constructor(hostname: string, ip: string, dns?: DnsServiceImpl) {
        super(hostname, ip);
        this.dns = dns || new DnsServiceImpl();
    }

    registerNode(node: Computer) {
        this.checkStatus();

        this.dns.registerNode(node);
    }

    lookup(hostname: string): string {
        this.checkStatus();

        return this.dns.lookup(hostname);
    }
}


