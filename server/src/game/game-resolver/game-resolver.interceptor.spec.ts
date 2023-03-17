import { GameResolverInterceptor } from './game-resolver.interceptor';
import { Test, TestingModule } from "@nestjs/testing";
import { GameService } from "../game.service";

describe('GameResolverInterceptor', () => {
    let gameResolverInterceptor: GameResolverInterceptor;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [GameService, GameResolverInterceptor],
        }).compile();

        gameResolverInterceptor = app.get<GameResolverInterceptor>(GameResolverInterceptor);
    });

    it('should be defined', () => {
        expect(gameResolverInterceptor).toBeDefined();
    });
});
