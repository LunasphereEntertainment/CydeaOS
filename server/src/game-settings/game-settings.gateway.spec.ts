import { Test, TestingModule } from '@nestjs/testing';
import { GameSettingsGateway } from './game-settings.gateway';
import { GameSettingsService } from './game-settings.service';
import { SharedModule } from '../shared/shared.module';

describe('GameSettingsGateway', () => {
  let gateway: GameSettingsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ SharedModule ],
      providers: [GameSettingsGateway, GameSettingsService],
    }).compile();

    gateway = module.get<GameSettingsGateway>(GameSettingsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
