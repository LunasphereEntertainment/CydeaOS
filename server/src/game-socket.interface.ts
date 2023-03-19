import { AuthSocket } from "./auth-socket.interface";
import { GameObject } from "../dist/game-models/game-object/game-object";

export interface GameSocket extends AuthSocket {
    game: GameObject;
}
