import { Player } from './player';
import { Computer } from "../computer/computer";

describe('Player', () => {
    it('should be defined', () => {
        let testPlayer = new Player(1, 'test1');
        expect(testPlayer).toBeDefined();
        expect(testPlayer.id).toBe(1);
        expect(testPlayer.displayName).toBe('test1');
        expect(testPlayer.getComputer()).toBeUndefined();
    });

    it('should get and set computer', () => {
        let testPlayer = new Player(1, 'test1');
        expect(testPlayer.getComputer()).toBeUndefined();
        let testComputer = new Computer('test1', '1.1.1.1');
        testPlayer.setComputer(testComputer);
        expect(testPlayer.getComputer()).toBe(testComputer);
    });

    it('should have functional computer', () => {
        let testComputer = new Computer('test1', '1.1.1.1');
        let testPlayer = new Player(1, 'test1');
        testPlayer.setComputer(testComputer);
        expect(testPlayer.getComputer()).toBeDefined();
        expect(testPlayer.getComputer().hostname).toBe('test1');
        expect(testPlayer.getComputer().ip).toBe('1.1.1.1');
        expect(testPlayer.getComputer().isOnline()).toBe(true);
    });

    it('should know when it is online', () => {
        let testPlayer = new Player(1, 'test1');
        expect(testPlayer.isOnline()).toBe(true);
    });

    it('should get and set socket', () => {
        let testPlayer = new Player(1, 'test1');
        expect(testPlayer.getSocket()).toBeUndefined();
        testPlayer.setSocket('testSocket');
        expect(testPlayer.getSocket()).toBe('testSocket');
    });

});
