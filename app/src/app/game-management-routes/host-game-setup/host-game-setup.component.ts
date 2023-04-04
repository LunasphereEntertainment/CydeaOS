import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPType } from '@cydeaos/libs/ip-generator/ip-generator'
import { MusicPlaybackMode } from '@cydeaos/libs/media/media.playback.mode'
import { GameConfiguration, GameType } from '@cydeaos/libs/game-configuration/game-configuration'
import { GameObject } from '@cydeaos/libs/game-object/game-object';
import { CurrentGameService } from '../../shared/current-game.service';
import { Router } from '@angular/router';
import { GameManagementService } from '../game-management.service';
import { GameManagementResponse } from '@cydeaos/libs/events/game-management-event/game-management-response';

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

  constructor(private gameManagementService: GameManagementService, private currentGameService: CurrentGameService, private router: Router) {
  }

  onSubmit() {
    const config: GameConfiguration = {
      type: this.hostGameForm.value.gameMode!,
      ipType: this.hostGameForm.value.ipMode!,
      musicMode: this.hostGameForm.value.musicMode!
    }

    this.gameManagementService.createGame(config)
      .subscribe((data: GameManagementResponse) => {
        const game = data.data!;
        localStorage.setItem('hostGameCode', game.gameCode);

        this.router.navigate(['/host']);
      });
  }
}
