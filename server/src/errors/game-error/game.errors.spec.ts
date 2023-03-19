import { GameNotFoundError } from "./game.errors";

describe('Game Errors', () => {
    describe('GameNotFoundError', () => {
        it('should create an instance', () => {
            const error = new GameNotFoundError('test');
            expect(error).toBeTruthy();
            expect(error.message).toBe('Game with id test not found');
        });
    });
});
