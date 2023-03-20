import { Injectable } from '@nestjs/common';
import { GameObject } from "../../../libs/game-object/game-object";
import { GameConfiguration } from '../../../libs/game-configuration/game-configuration';
import { GameNotFoundError } from "../errors/game-error/game.errors";
import { v4 } from 'uuid';

@Injectable()
export class GameManagementService {
    private activeGames: Map<string, GameObject> = new Map();

    getGame(id: string): GameObject {
        if (!this.activeGames.has(id)) {
            throw new GameNotFoundError(id);
        }

        return this.activeGames.get(id);
    }

    newGame(config: GameConfiguration): GameObject {
        const game = new GameObject(v4(), config);

        this.activeGames.set(game.id, game);

        return game;
    }

    stopGame(gameId: string) {
        const game = this.getGame(gameId);
        game.stop();
        this.activeGames.delete(gameId);
    }

}



