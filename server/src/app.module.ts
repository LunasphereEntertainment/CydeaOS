import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { MediaService } from './media/media.service';
import { MediaController } from './media/media.controller';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [GameModule, SharedModule],
  controllers: [AppController, MediaController],
  providers: [AppService, MediaService],
})
export class AppModule {}
