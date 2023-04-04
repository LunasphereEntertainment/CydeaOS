import { GameEventType } from "./game-event-type";
import { GameObject } from "../../game-object/game-object";
import { Player } from "../../player/player";
import { InGameEvent } from '../game-event-payload';

/*
    * This is the response sent to the client after joining a game.
 */
export class GameJoinClientResponse {
    type: GameEventType = GameEventType.GameJoined;
    data: GameObject;

    constructor(game: GameObject) {
        this.data = game;
    }
}

export class GameJoinResponse implements InGameEvent {
    gameCode: string;
    data: GameObject | Player;

    constructor(gameCode: string, data: GameObject | Player) {
        this.gameCode = gameCode;
        this.data = data;
    }

    static clientPlayerResponse(game: GameObject): GameJoinResponse {
        return new GameJoinResponse(
            game.gameCode,
            game
        );
    }

    static serverPlayerResponse(gameCode: string, player: Player): GameJoinResponse {
        return new GameJoinResponse(
            gameCode,
            player
        );
    }
}


/*
    * This is the response sent to the host after a player joins a game.
 */
export class GameJoinServerNotification {
    type: GameEventType = GameEventType.GameJoined;
    data: Player;

    gameId: string;

    constructor(gameId: string, player: Player) {
        this.gameId = gameId;
        this.data = player;
    }

    static gameLeftNotification(gameId: string, player: Player): GameJoinServerNotification {
        const response = new GameJoinServerNotification(gameId, player);
        response.type = GameEventType.GameLeft;
        return response;
    }
}
