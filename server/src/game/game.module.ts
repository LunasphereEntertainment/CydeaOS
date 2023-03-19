import { Module } from '@nestjs/common';
import { NodeGeneratorService } from './node-generator/node-generator.service';
import { GameResolverInterceptor } from './game-resolver/game-resolver.interceptor';
import { SharedModule } from '../shared/shared.module';
import { GameManagementService } from '../game-management/game.management.service';

@Module({
  controllers: [],
  providers: [GameManagementService, GameResolverInterceptor, NodeGeneratorService],
  imports: [SharedModule],
  exports: [],
})
export class GameModule {}
