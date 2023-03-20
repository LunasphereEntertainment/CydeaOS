import { Component, OnInit } from '@angular/core';
import { GameObject } from "@cydeaos/libs/game-object/game-object";
import { SocketService } from "../../shared/socket.service";
import { GameManagementEventType } from "@cydeaos/libs/events/game-management-event/game-management-event";
import { Player } from "@cydeaos/libs/player/player";
import { filter } from "rxjs";

@Component({
  selector: 'app-host-game',
  templateUrl: './host-game.component.html',
  styleUrls: ['./host-game.component.scss']
})
export class HostGameComponent implements OnInit {
  currentGame: GameObject | undefined;
  gameCode: string = localStorage.getItem('hostGameCode') || '';

  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    const self = this;

    this.socketService.sendAndReceive<GameObject>(GameManagementEventType.GetGame, this.gameCode)
      .subscribe((data: GameObject) => {
        self.currentGame = data;
      });

    this.socketService.listen<Player>(GameManagementEventType.GameJoined)
      .pipe(filter(p => !!p['username']))
      .subscribe((p: Player) => {
        self.currentGame!.players.push(p);
      });
  }

  testJoinClicked() {
    this.socketService.blindSend(GameManagementEventType.GameJoined, this.gameCode);
  }

}
