import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { MediaService } from './media/media.service';
import { MediaController } from './media/media.controller';
import { SharedModule } from './shared/shared.module';
import { GameSettingsGateway } from './game-settings/game-settings.gateway';
import { GameManagementGateway } from './game-management/game-management.gateway';
import { MediaGateway } from './media/media.gateway';
import { CommandRunnerGateway } from './command-runner/command-runner.gateway';
import { NodeManagementService } from './node-management/node-management.service';

@Module({
  imports: [GameModule, SharedModule],
  controllers: [AppController, MediaController],
  providers: [AppService, MediaService, GameSettingsGateway, GameManagementGateway, MediaGateway, CommandRunnerGateway, NodeManagementService],
})
export class AppModule {}
