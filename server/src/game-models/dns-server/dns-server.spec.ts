import { DnsServer } from './dns-server';
import { Computer } from "../computer/computer";

describe('DnsServer', () => {
    it('should be defined', () => {
        expect(new DnsServer('test', '1.1.1.1')).toBeDefined();
    });

    it('should register nodes', () => {
        let testSecondNode = new Computer('test2', '1.1.1.2');
        let testDnsServer = new DnsServer('test', '1.1.1.1');

        expect(testDnsServer).toBeDefined()

        testDnsServer.registerNode(testSecondNode);

        expect(testDnsServer.dns.size).toBe(1);
        expect(testDnsServer.dns.get(testSecondNode.hostname)).toBe(testSecondNode.ip);
    });

    it('should lookup nodes', () => {
        let testSecondNode = new Computer('test2', '1.1.1.1');
        let testDnsServer = new DnsServer('test', '1.1.1.2');
        testDnsServer.registerNode(testSecondNode);
        expect(testDnsServer.lookup(testSecondNode.hostname)).toBe(testSecondNode.ip);
    });

    it('should handle node lookup failure', () => {
        let testDnsServer = new DnsServer('test', '1.1.1.1');
        expect(() => testDnsServer.lookup('test2')).toThrowError('DNS lookup failed for hostname test2');
    });

    it('should error on lookup when offline', () => {
        let testSecondNode = new Computer('test2', '1.1.1.2');
        let testDnsServer = new DnsServer('test', '1.1.1.1');
        testDnsServer.registerNode(testSecondNode);
        testDnsServer.online = false;
        expect(() => testDnsServer.lookup(testSecondNode.hostname)).toThrowError('Computer is offline');
    });
});
