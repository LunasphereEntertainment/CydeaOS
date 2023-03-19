import { Test, TestingModule } from '@nestjs/testing';
import { GameManagementService } from './game.management.service';
import { IPType } from "../../../libs/ip-generator/ip-generator";
import { GameConfiguration, GameType } from "../../../libs/game-configuration/game-configuration";
import { GameState } from "../../../libs/game-object/game-object";
import { MusicPlaybackMode } from "../../../libs/media/media.playback.mode";

describe('GameService', () => {
    let service: GameManagementService;
    let testGameConfig: GameConfiguration;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GameManagementService],
        }).compile();

        service = module.get<GameManagementService>(GameManagementService);

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
