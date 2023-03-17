import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { MusicPlaybackMode } from "../media/media-event/media-event";
import { IPType } from "./ip-generator/ip-generator";
import { GameConfiguration, GameType } from "../game-models/game-configuration/game-configuration";
import { GameState } from "../game-models/game-object/game-object";

describe('GameService', () => {
    let service: GameService;
    let testGameConfig: GameConfiguration;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GameService],
        }).compile();

        service = module.get<GameService>(GameService);

        testGameConfig = new GameConfiguration(
            GameType.Elimination,
            IPType.IPv4,
            MusicPlaybackMode.Client
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a game', () => {
        const game = service.newGame(testGameConfig);
        expect(game).toBeDefined();
        expect(game.id).toBeDefined();
        expect(game.config).toBeDefined();
        expect(game.players).toBeDefined();
        expect(game.config).toBe(testGameConfig);
    });

    it('should register a game', () => {
        const game = service.newGame(testGameConfig);
        expect(service.getGame(game.id)).toBe(game);
    });

    it('should handle game lookup failure', () => {
        expect(() => service.getGame('test')).toThrowError();
    });

    it('should allow stopping a game', () => {
        const game = service.newGame(testGameConfig);
        game.start();
        expect(game.state).toBe(GameState.Running);
        game.stop();
        expect(game.state).toBe(GameState.Stopped);
    });

    it('should also clean up after stopping a game', () => {
        const game = service.newGame(testGameConfig);
        game.start();
        expect(game.state).toBe(GameState.Running);
        service.stopGame(game.id);
        expect(game.state).toBe(GameState.Stopped);
        expect(() => service.getGame(game.id)).toThrowError(`Game with id ${game.id} not found`);
    });
});
