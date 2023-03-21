import { AuthSocket } from './auth-socket.interface';
import { GameObject } from '@cydeaos/libs/game-object/game-object';
import { Player } from '@cydeaos/libs/player/player';

export interface GameSocket extends AuthSocket {
    game: GameObject;

    player?: Player;
}
