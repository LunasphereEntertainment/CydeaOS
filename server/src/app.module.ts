import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaService } from './media/media.service';
import { MediaController } from './media/media.controller';
import { SharedModule } from './shared/shared.module';
import { NodeManagementService } from './node-management/node-management.service';
import { GameSettingsService } from './game-settings/game-settings.service';
import { GameManagementService } from './game-management/game.management.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CoreSystemGateway } from './core-system/core-system.gateway';

@Module({
    imports: [ SharedModule, EventEmitterModule.forRoot() ],
    controllers: [ AppController, MediaController ],
    providers: [
        AppService,
        MediaService,
        CoreSystemGateway,
        GameSettingsService,
        GameManagementService,
        NodeManagementService,
        MediaService,
    ],
})
export class AppModule {
}
