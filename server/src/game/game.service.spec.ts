import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';

describe('GameService', () => {
    let service: GameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GameService],
        }).compile();

        service = module.get<GameService>(GameService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a game', () => {
        const game = service.createGame();
        expect(game).toBeDefined();
        expect(game.id).toBeDefined();
        expect(game.dns).toBeDefined();
        expect(game.nodesByIP).toBeDefined();
    });

    it('should throw an error when game not found', () => {
        expect(() => service.getGame('test')).toThrowError();
    });

    it('should register a game', () => {
        const game = service.createGame();
        service.registerGame(game);
        expect(service.activeGames.get(game.id)).toBe(game);
    });

    it('should handle game lookup failure', () => {
        expect(() => service.getGame('test')).toThrowError();
    });

    it('should delete a game', () => {
        const game = service.createGame();
        service.registerGame(game);
        expect(service.getGame(game.id)).toBeDefined();
        service.deleteGame(game.id);
        expect(() => service.getGame(game.id)).toThrowError(`Game with id ${game.id} not found`);
    });

    it('should handle game deletion failure', () => {
        expect(() => service.deleteGame('test')).toThrowError(`Game with id test not found`);
    });
});
