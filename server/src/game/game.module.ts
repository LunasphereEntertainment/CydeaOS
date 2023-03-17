import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { NodeGeneratorService } from './node-generator/node-generator.service';
import { GameResolverInterceptor } from './game-resolver/game-resolver.interceptor';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [GameController],
  providers: [GameService, GameResolverInterceptor, NodeGeneratorService],
  imports: [SharedModule],
  exports: [GameService],
})
export class GameModule {}
