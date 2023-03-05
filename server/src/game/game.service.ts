import { Injectable } from '@nestjs/common';
import { GameObject } from "../game-models/game-object/game-object";

@Injectable()
export class GameService {
    activeGames: Map<string, GameObject> = new Map();

    createGame(): GameObject {
        const game = new GameObject();
        this.activeGames.set(game.id, game);
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

