import { Player } from './player';
import { Computer } from "../computer/computer";

describe('Player', () => {
    it('should be defined', () => {
        let testComputer = new Computer('test1', '1.1.1.1');
        let testPlayer = new Player(1, 'test1', testComputer);
        expect(testPlayer).toBeDefined();
        expect(testPlayer.id).toBe(1);
        expect(testPlayer.name).toBe('test1');
        expect(testPlayer.computer).toBe(testComputer);
    });

    it('should have functional computer', () => {
        let testComputer = new Computer('test1', '1.1.1.1');
        let testPlayer = new Player(1, 'test1', testComputer);
        expect(testPlayer.computer).toBeDefined();
        expect(testPlayer.computer.hostname).toBe('test1');
        expect(testPlayer.computer.ip).toBe('1.1.1.1');
        expect(testPlayer.computer.isOnline()).toBe(true);
    });

    it('should know when it is online', () => {
        let testComputer = new Computer('test1', '1.1.1.1');
        let testPlayer = new Player(1, 'test1', testComputer);
        expect(testPlayer.isOnline()).toBe(true);
    });

    it('should get and set socket', () => {
        let testComputer = new Computer('test1', '1.1.1.1');
        let testPlayer = new Player(1, 'test1', testComputer);
        expect(testPlayer.getSocket()).toBeUndefined();
        testPlayer.setSocket('testSocket');
        expect(testPlayer.getSocket()).toBe('testSocket');
    });

});
