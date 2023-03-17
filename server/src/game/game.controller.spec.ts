import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { JwtService } from "../shared/jwt/jwt.service";
import { JwtAuthGuard } from "../shared/jwt/guard/jwt-auth.guard";
import { GameService } from "./game.service";
import { NodeGeneratorService } from "./node-generator/node-generator.service";

describe('GameController', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [ GameService, NodeGeneratorService, JwtService, JwtAuthGuard ]
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
