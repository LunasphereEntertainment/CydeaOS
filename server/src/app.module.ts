import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaService } from './media/media.service';
import { MediaController } from './media/media.controller';
import { SharedModule } from './shared/shared.module';
import { GameSettingsGateway } from './game-settings/game-settings.gateway';
import { GameManagementGateway } from './game-management/game-management.gateway';
import { MediaGateway } from './media/media.gateway';
import { CommandRunnerGateway } from './command-runner/command-runner.gateway';
import { NodeManagementService } from './node-management/node-management.service';
import { GameSettingsService } from './game-settings/game-settings.service';
import { GameManagementService } from './game-management/game.management.service';
import { FileSystemGateway } from './file-system/file-system.gateway';
import { NetworkingGateway } from './networking/networking.gateway';
import { NodeManagementGateway } from './node-management/node-management.gateway';
import { GameResolverInterceptor } from './game/game-resolver/game-resolver.interceptor';

@Module({
    imports: [ SharedModule ],
    controllers: [ AppController, MediaController ],
    providers: [
        AppService,
        MediaService,
        GameSettingsService,
        GameSettingsGateway,
        GameManagementService,
        GameManagementGateway,
        GameResolverInterceptor,
        MediaGateway,
        CommandRunnerGateway,
        NodeManagementService,
        FileSystemGateway,
        NetworkingGateway,
        NodeManagementGateway
    ],
})
export class AppModule {
}
