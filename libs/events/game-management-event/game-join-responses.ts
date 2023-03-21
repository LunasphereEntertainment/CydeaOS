import { GameEventType } from "./game-event-type";
import { GameObject } from "../../game-object/game-object";
import { Player } from "../../player/player";

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
