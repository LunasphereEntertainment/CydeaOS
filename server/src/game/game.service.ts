import { Injectable } from '@nestjs/common';
import { GameObject } from "../game-models/game-object/game-object";
import { GameConfiguration } from '../game-models/game-configuration/game-configuration';
import { GameNotFoundError } from "./game.errors";

@Injectable()
export class GameService {
    private activeGames: Map<string, GameObject> = new Map();

    getGame(id: string): GameObject {
        if (!this.activeGames.has(id)) {
            throw new GameNotFoundError(id);
        }

        return this.activeGames.get(id);
    }

    newGame(config: GameConfiguration): GameObject {
        const game = new GameObject(config);

        this.activeGames.set(game.id, game);

        return game;
    }

    stopGame(gameId: string) {
        const game = this.getGame(gameId);
        game.stop();
        this.activeGames.delete(gameId);
    }

}



