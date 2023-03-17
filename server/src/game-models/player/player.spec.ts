import { Player, PlayerState } from './player';
import { Account } from "../../luna-models/account";

describe('Player', () => {
    it('should be defined', () => {
        let testPlayer = new Player(1, 'test1');
        expect(testPlayer).toBeDefined();
        expect(testPlayer.id).toBe(1);
        expect(testPlayer.username).toBe('test1');
        expect(testPlayer.state).toBe(PlayerState.Online);
    });

    it('can be created from account', () => {
        let testAccount = <Account>{id: 1, username: 'test1'};
        let testPlayer = Player.fromAccount(testAccount);
        expect(testPlayer).toBeDefined();
        expect(testPlayer.id).toBe(1);
        expect(testPlayer.username).toBe('test1');
        expect(testPlayer.state).toBe(PlayerState.Online);
    });

    it('should know when it is online', () => {
        let testPlayer = new Player(1, 'test1');
        expect(testPlayer.isOnline()).toBe(true);
    });

    it('should get and set socket', () => {
        let testPlayer = new Player(1, 'test1');
        expect(testPlayer.getSocketId()).toBeUndefined();
        testPlayer.setSocketId('testSocket');
        expect(testPlayer.getSocketId()).toBe('testSocket');
    });

    it('should not allow setting socket twice', () => {
        let testPlayer = new Player(1, 'test1');
        expect(() => testPlayer.setSocketId('testSocket')).not.toThrowError();
        expect(() => testPlayer.setSocketId('testSocket')).toThrowError();
    });

});
