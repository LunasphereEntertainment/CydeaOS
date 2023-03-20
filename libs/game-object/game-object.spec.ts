import { GameObject, GameState } from './game-object';
import { GameConfiguration, GameType } from "../game-configuration/game-configuration";
import { Player } from "../player/player";
import { IPType } from "../ip-generator/ip-generator";
import { MusicPlaybackMode } from "../media/media.playback.mode";
import { v4 } from 'uuid';

describe('GameObject', () => {

    let testGameConfig: GameConfiguration;

    beforeEach(() => {
        testGameConfig = new GameConfiguration(
            GameType.Elimination,
            IPType.IPv4,
            MusicPlaybackMode.Client
        );
    });

    it('should be defined', () => {
        let testGameObject = new GameObject(v4(), testGameConfig);
        expect(testGameObject).toBeDefined();
        expect(testGameObject.id).toBeDefined();
        expect(testGameObject.config).toBeDefined();
        expect(testGameObject.players).toBeDefined();
    });

    it('should be joinable', () => {
        let testGameObject = new GameObject(v4(), testGameConfig);
        let testPlayer = new Player(0, 'test');

        expect(testGameObject.players).toHaveLength(0);
        testGameObject.join(testPlayer);
        expect(testGameObject.players).toHaveLength(1);
        expect(testGameObject.players[0]).toBe(testPlayer);
    });

    it('should be startable', () => {
        let testGameObject = new GameObject(v4(), testGameConfig);
        expect(testGameObject.state).toBe(GameState.WaitingForPlayers);
        testGameObject.start();
        expect(testGameObject.state).toBe(GameState.Running);
    });

    it('should be stoppable', () => {
        let testGameObject = new GameObject(v4(), testGameConfig);
        testGameObject.start();
        expect(testGameObject.state).toBe(GameState.Running);
        testGameObject.stop();
        expect(testGameObject.state).toBe(GameState.Stopped);
    });

    it('should not be startable if already running', () => {
        let testGameObject = new GameObject(v4(), testGameConfig);
        testGameObject.start();
        expect(testGameObject.state).toBe(GameState.Running);
        expect(() => testGameObject.start()).toThrowError();
    });

    it('should not be stoppable if already stopped', () => {
        let testGameObject = new GameObject(v4(), testGameConfig);
        testGameObject.start();
        testGameObject.stop();
        expect(testGameObject.state).toBe(GameState.Stopped);
        expect(() => testGameObject.stop()).toThrowError();
    });

    it('should allow finding a player by username', () => {
        let testGameObject = new GameObject(v4(), testGameConfig);
        let testPlayer = new Player(0, 'test');
        testGameObject.join(testPlayer);
        expect(testGameObject.findPlayerByUsername('test')).toBe(testPlayer);
    });

    it('should allow finding a player by socket id', () => {
        let testGameObject = new GameObject(v4(), testGameConfig);
        let testPlayer = new Player(0, 'test');
        testGameObject.join(testPlayer);
        testPlayer.setSocketId('test');
        expect(() => testGameObject.findPlayerBySocketId('test')).toBeDefined();
    });
});



// it('should register a node', () => {
//     let testGameObject = new GameObject();
//     let testNode = new Computer('test', '1.1.1.1');
//     testGameObject.registerNode(testNode);
//     expect(testGameObject.nodesByIP.get(testNode.ip)).toBe(testNode);
//     expect(testGameObject.dns.get(testNode.hostname)).toBe(testNode.ip);
// });

// it('should get a node by IP', () => {
//     let testGameObject = new GameObject();
//     let testNode = new Computer('test', '1.1.1.1');
//     testGameObject.registerNode(testNode);
//     expect(testGameObject.getNodeByIP(testNode.ip)).toBe(testNode);
// });
