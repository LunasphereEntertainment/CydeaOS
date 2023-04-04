import { Component, OnDestroy } from '@angular/core';
import { GameObject } from "@cydeaos/libs/game-object/game-object";
import { FormControl } from "@angular/forms";
import { GameManagementService } from "../game-management.service";
import { SocketService } from '../../shared/socket.service';
import { GameManagementEventType } from '@cydeaos/libs/events/game-management-event/game-management-event-type';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnDestroy {
  gameInfo?: GameObject;
  joined: boolean = false;

  gameCodeInput = new FormControl('');

  private waitSubscription?: Subscription;

  constructor(private gameManagementService: GameManagementService, private socketService: SocketService, private router: Router) { }

  attemptJoinGame() {
    this.gameManagementService.joinGame(this.gameCodeInput.value!).subscribe(joinResponse => {
      if (joinResponse.data) {
        this.gameInfo = joinResponse.data;
        this.joined = true;

        localStorage.setItem('gameCode', this.gameCodeInput.value!);

        this.waitForStart();
      }
    });
  }

  private waitForStart() {
    this.waitSubscription = this.socketService.listen<GameObject>(GameManagementEventType.GameStarted)
      .subscribe(game => {
        if (game.gameCode === this.gameInfo?.gameCode) {
          this.router.navigate(['/game'], { queryParams: { as: 'client' }});
        }
      })
  }

  ngOnDestroy() {
    this.waitSubscription?.unsubscribe();
  }
}
