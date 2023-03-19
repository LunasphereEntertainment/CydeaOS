import { AuthSocket } from "./auth-socket.interface";
import { GameObject } from "../../libs/game-object/game-object";
import { Player } from '../../libs/player/player';

export interface GameSocket extends AuthSocket {
    game: GameObject;

    player?: Player;
}
