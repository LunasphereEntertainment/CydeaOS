import { Component, OnInit } from '@angular/core';
import { GameObject } from '@cydeaos/libs/game-object/game-object';
import { SocketService } from '../../shared/socket.service';
import { Player } from '@cydeaos/libs/player/player';
import { filter, map } from 'rxjs';
import { GameManagementService } from '../game-management.service';
import { GameEventType } from '@cydeaos/libs/events/game-management-event/game-event-type';
import { GameManagementRequest } from '@cydeaos/libs/events/game-management-event/game-management-request';
import { GameJoinServerNotification } from '@cydeaos/libs/events/game-management-event/game-join-responses';
import { GameManagementResponse } from '@cydeaos/libs/events/game-management-event/game-management-response';

@Component({
  selector: 'app-host-game',
  templateUrl: './host-game.component.html',
  styleUrls: [ './host-game.component.scss' ]
})
export class HostGameComponent implements OnInit {
  currentGame: GameObject | undefined;
  gameCode: string = localStorage.getItem('hostGameCode') || '';

  constructor(private gameManagementService: GameManagementService, private socketService: SocketService) {
  }

  ngOnInit(): void {
    const self = this;

    this.socketService.listen<GameJoinServerNotification>(GameEventType.GameJoined)
      // only listen to host "player joined" events
      .pipe(
        filter(p => !!p.data['username']),
        map(p => p.data)
      )
      .subscribe((p: Player) => {
        self.currentGame!.players.push(p);
      });

    this.gameManagementService.getGame(this.gameCode)
      .subscribe((data: GameObject) => {
        self.currentGame = data;
      });
  }

  startGame() {
    this.socketService.sendAndReceive<GameManagementResponse>(GameEventType.GameStarted, <GameManagementRequest>{
      type: GameEventType.GameStarted,
      gameCode: this.gameCode,
    }).subscribe(
      (data) => {
        // verify it's the same game
        if (this.gameCode === data.gameCode)
          console.log('Game Started!!! :D');
      }
    );
  }
}
