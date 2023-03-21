import { Component } from '@angular/core';
import { GameObject } from "@cydeaos/libs/game-object/game-object";
import { FormControl } from "@angular/forms";
import { GameManagementService } from "../game-management.service";

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent {
  gameInfo?: GameObject;
  joined: boolean = false;

  gameCodeInput = new FormControl('');

  constructor(private gameManagementService: GameManagementService) { }

  attemptJoinGame() {
    this.gameManagementService.joinGame(this.gameCodeInput.value!).subscribe(joinResponse => {
      if (joinResponse.data) {
        this.gameInfo = joinResponse.data;
        this.joined = true;
      }
    });
  }
}
