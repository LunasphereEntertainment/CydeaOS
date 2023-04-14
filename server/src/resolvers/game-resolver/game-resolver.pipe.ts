import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { GameManagementService } from '../../game-management/game.management.service';

@Injectable()
export class GameResolverPipe implements PipeTransform {
    constructor(private gameService: GameManagementService) {
    }

    transform(gameCode: string, metadata: ArgumentMetadata) {
        if (!gameCode) {
            return null;
        }

        try {
            return this.gameService.getGame(gameCode);
        } catch (e) {
            console.warn(e);
        }
        return null;
    }
}
