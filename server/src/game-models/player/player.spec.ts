import { Player } from './player';

describe('Player', () => {
    it('should be defined', () => {
        let testPlayer = new Player(1, 'test1', 'test1');
        expect(testPlayer).toBeDefined();
        expect(testPlayer.id).toBe(1);
        expect(testPlayer.displayName).toBe('test1');
        expect(testPlayer.getIP()).toBeUndefined();
    });

    it('should get and set ip address', () => {
        let testPlayer = new Player(1, 'test1', 'test1');
        expect(testPlayer.getIP()).toBeUndefined();
        let testIp = '1.1.1.1'
        testPlayer.setIP(testIp);
        expect(testPlayer.getIP()).toBe(testIp);
    });

    it('should know when it is online', () => {
        let testPlayer = new Player(1, 'test1', 'test1');
        expect(testPlayer.isOnline()).toBe(true);
    });

    it('should get and set socket', () => {
        let testPlayer = new Player(1, 'test1', 'test1');
        expect(testPlayer.getSocket()).toBeUndefined();
        testPlayer.setSocket('testSocket');
        expect(testPlayer.getSocket()).toBe('testSocket');
    });

});
