import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { NodeGeneratorService } from './node-generator/node-generator.service';
import { GameResolverInterceptor } from './game-resolver/game-resolver.interceptor';
import { NodesController } from './nodes/nodes.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [GameController, NodesController],
  providers: [GameService, GameResolverInterceptor, NodeGeneratorService],
  imports: [SharedModule]
})
export class GameModule {}
