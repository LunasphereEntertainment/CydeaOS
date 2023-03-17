import { DnsServer } from './dns-server';
import { Computer } from "../../computer/computer";
import { IPGenerator } from "../../../../game/ip-generator/ip-generator";

describe('DnsServer', () => {
    it('should be defined', () => {
        expect(new DnsServer()).toBeDefined();
    });

    it('should have a port', () => {
        let testDnsServer = new DnsServer();
        expect(testDnsServer.ports.length).toBe(1);
        expect(testDnsServer.ports[0].port).toBe(53);
    });

    describe('basic dns functionality', () => {
        let testDnsServer: DnsServer,
            ipGenerator: IPGenerator;

        beforeEach(() => {
            testDnsServer = new DnsServer();
            ipGenerator = new IPGenerator();
        });

        it('should register new nodes', () => {
            let testNode = new Computer('test');
            testDnsServer.registerNode(testNode);
            expect(testDnsServer.dns.size).toBe(1);
        });

        it('should lookup nodes', () => {
            let testSecondNode = new Computer('test2');
            testSecondNode.ip = ipGenerator.generate();
            testDnsServer.registerNode(testSecondNode);
            expect(testDnsServer.lookupIP(testSecondNode.hostname)).toBe(testSecondNode.ip);
        });

        it('should handle node lookup failure', () => {
            expect(() => testDnsServer.lookupIP('test2')).toThrowError('DNS lookup failed for hostname test2');
        });
    });


});
