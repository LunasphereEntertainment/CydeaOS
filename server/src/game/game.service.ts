import { Injectable } from '@nestjs/common';
import { GameObject } from "../game-models/game-object/game-object";
import { GameConfiguration } from '../game-models/game-configuration/game-configuration';

@Injectable()
export class GameService {
    private activeGames: Map<string, GameObject> = new Map();

    createGame(config: GameConfiguration): GameObject {
        const game = new GameObject(config);

        this.registerGame(game);

        return game;
    }

    registerGame(game: GameObject) {
        this.activeGames.set(game.id, game);
    }

    getGame(id: string): GameObject {
        if (!this.activeGames.has(id)) {
            throw new GameNotFoundError(id);
        }

        return this.activeGames.get(id);
    }

    deleteGame(id: string) {
        if (!this.activeGames.has(id)) {
            throw new GameNotFoundError(id);
        }

        this.activeGames.delete(id);
    }
}

export class GameNotFoundError extends Error {
    constructor(id: string) {
        super(`Game with id ${id} not found`);
    }
}

