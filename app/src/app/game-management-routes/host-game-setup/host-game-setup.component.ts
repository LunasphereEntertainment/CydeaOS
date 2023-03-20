import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPType } from '../../../../../libs/ip-generator/ip-generator'
import { MusicPlaybackMode } from '../../../../../libs/media/media.playback.mode'
import { GameType } from '../../../../../libs/game-configuration/game-configuration'
import { SocketService } from "../../shared/socket.service";
import { GameManagementEvent, GameManagementEventType } from "../../../../../libs/events/game-management-event/game-management-event"
import { GameObject } from "@cydeaos/libs/game-object/game-object";
import { CurrentGameService } from "../../shared/current-game.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-host-game',
  templateUrl: './host-game-setup.component.html',
  styleUrls: ['./host-game-setup.component.scss']
})
export class HostGameSetupComponent {
  hostGameForm = new FormGroup({
    'gameMode': new FormControl(GameType.Elimination),
    'ipMode': new FormControl(IPType.IPv4),
    'musicMode': new FormControl(MusicPlaybackMode.Client),
  });

  gameOptions = GameType;

  ipOptions = IPType;

  musicOptions = MusicPlaybackMode;

  constructor(private socketService: SocketService, private currentGameService: CurrentGameService, private router: Router) {
  }

  onSubmit() {
    const event = <GameManagementEvent>{
      type: GameManagementEventType.GameCreated,
      data: {
        type: this.hostGameForm.value.gameMode,
        ipType: this.hostGameForm.value.ipMode,
        musicMode: this.hostGameForm.value.musicMode
      }
    }

    this.socketService.sendAndReceive<GameObject>(GameManagementEventType.GameCreated, event)
      .subscribe((data: GameObject) => {
        localStorage.setItem('hostGameCode', data.id);

        this.router.navigate(['/host']);
      });
  }
}
