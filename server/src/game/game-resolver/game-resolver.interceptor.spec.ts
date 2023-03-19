import { GameResolverInterceptor } from './game-resolver.interceptor';
import { Test, TestingModule } from "@nestjs/testing";
import { GameManagementService } from "../../game-management/game.management.service";

describe('GameResolverInterceptor', () => {
    let gameResolverInterceptor: GameResolverInterceptor;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [GameManagementService, GameResolverInterceptor],
        }).compile();

        gameResolverInterceptor = app.get<GameResolverInterceptor>(GameResolverInterceptor);
    });

    it('should be defined', () => {
        expect(gameResolverInterceptor).toBeDefined();
    });
});
