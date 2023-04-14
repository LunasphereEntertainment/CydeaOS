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
import { MediaGateway } from './media/media.gateway';
import { NodeManagementGateway } from './node-management/node-management.gateway';
import { FileSystemGateway } from './file-system/file-system.gateway';
import { GameResolverPipe } from './resolvers/game-resolver/game-resolver.pipe';
import { NodeResolverPipe } from './resolvers/node-resolver/node-resolver.pipe';
import { GameManagementGateway } from './game-management/game-management.gateway';

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
        MediaGateway,
        GameManagementGateway,
        NodeManagementGateway,
        FileSystemGateway,
        GameResolverPipe,
        NodeResolverPipe
    ],
})
export class AppModule {
}
