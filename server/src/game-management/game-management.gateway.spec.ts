import { Test, TestingModule } from '@nestjs/testing';
import { GameManagementGateway } from './game-management.gateway';
import { GameManagementService } from "./game.management.service";
import { JwtService } from "../shared/jwt/jwt.service";
import { SharedModule } from "../shared/shared.module";

describe('GameManagementGateway', () => {
  let gateway: GameManagementGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ SharedModule ],
      providers: [GameManagementGateway, GameManagementService],
    }).compile();

    gateway = module.get<GameManagementGateway>(GameManagementGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
