import { Test, TestingModule } from '@nestjs/testing';
import { MediaGateway } from './media.gateway';
import { MediaService } from './media.service';
import { GameManagementService } from '../game-management/game.management.service';

describe('MediaGateway', () => {
  let gateway: MediaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameManagementService, MediaGateway, MediaService],
    }).compile();

    gateway = module.get<MediaGateway>(MediaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
