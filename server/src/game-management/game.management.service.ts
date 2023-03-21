import { Injectable } from '@nestjs/common';
import { GameObject } from '@cydeaos/libs/game-object/game-object';
import { GameConfiguration } from '@cydeaos/libs/game-configuration/game-configuration';
import { GameNotFoundError } from '../errors/game-error/game.errors';
import * as randomWords from "random-words";
import { Account } from "@cydeaos/libs/luna/account";

@Injectable()
export class GameManagementService {
    private activeGames: Map<string, GameObject> = new Map();

    getGame(id: string): GameObject {
        if (this.activeGames.has(id)) {
            return this.activeGames.get(id)!;
        }

        throw new GameNotFoundError(id);
    }

    newGame(config: GameConfiguration, host: Account): GameObject {
        const game = new GameObject(randomWords.default({ exactly: 3, join: '-' }), config, host);

        this.activeGames.set(game.id, game);

        return game;
    }

    stopGame(gameId: string) {
        const game = this.getGame(gameId);
        game.stop();
    }

    deleteGame(gameId: string) {
        this.activeGames.delete(gameId);
    }

}



