import { NetworkPort } from './network.port';

describe('Port', () => {
    it('should be defined', () => {
        let testPort = new NetworkPort(8080);
        expect(testPort).toBeDefined();
        expect(testPort.port).toBe(8080);
        expect(testPort.isOpen()).toBe(false);
    });

    it('should open', () => {
        let testPort = new NetworkPort(8080);
        expect(testPort.isOpen()).toBe(false);
        testPort.openPort();
        expect(testPort.isOpen()).toBe(true);
    })

    it('should close', () => {
        let testPort = new NetworkPort(8080);
        expect(testPort.isOpen()).toBe(false);
        testPort.openPort();
        expect(testPort.isOpen()).toBe(true);
        testPort.closePort();
        expect(testPort.isOpen()).toBe(false);
    });
});
