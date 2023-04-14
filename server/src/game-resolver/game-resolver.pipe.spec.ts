import { GameResolverPipe } from './game-resolver.pipe';
import { Test } from '@nestjs/testing';
import { GameManagementService } from '../game-management/game.management.service';

describe('GameResolverPipe', () => {
    let testingPipe: GameResolverPipe,
        testingService: GameManagementService;

    beforeEach(async () => {
        let moduleRef = await Test.createTestingModule({
            providers: [ GameManagementService, GameResolverPipe ]
        }).compile();

        testingService = moduleRef.get<GameManagementService>(GameManagementService);
        testingPipe = moduleRef.get<GameResolverPipe>(GameResolverPipe);
    })

    it('should be defined', () => {
        expect(testingPipe).toBeDefined();
    });
});
