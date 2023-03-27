import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { GameManagementService } from "../game-management/game.management.service";

@Injectable()
export class GameResolverPipe implements PipeTransform {
  constructor(private gameService: GameManagementService) {
  }
  transform(gameCode: string, metadata: ArgumentMetadata) {
      try {
          const game = this.gameService.getGame(gameCode);
          return game;
      } catch (e) {
          console.warn(e);
          return null;
      }
  }
}
