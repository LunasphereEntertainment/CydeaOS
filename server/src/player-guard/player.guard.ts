import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameSocket } from '../game-socket.interface';

@Injectable()
export class PlayerGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let client: GameSocket = context.switchToWs().getClient(),
        game = client.game;

    const player = game.players.find(p => p.getSocketId() === client.id);
    if (player) {
      client.player = player;

      return true;
    }

    return false;
  }
}
