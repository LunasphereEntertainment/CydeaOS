import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { JwtService } from '../shared/jwt/jwt.service';
import { JwtAuthGuard } from '../shared/jwt/guard/jwt-auth.guard';
import { GameService } from '../game/game.service';
import { MediaService } from './media.service';

describe('MediaController', () => {
  let controller: MediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [ GameService, MediaService, JwtService, JwtAuthGuard ]
    }).compile();

    controller = module.get<MediaController>(MediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
