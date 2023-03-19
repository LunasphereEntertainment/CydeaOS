import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPType } from '../../../../../libs/ip-generator/ip-generator'
import { MusicPlaybackMode } from '../../../../../libs/media/media.playback.mode'
import { GameConfiguration, GameType } from '../../../../../libs/game-configuration/game-configuration'

@Component({
  selector: 'app-host-game',
  templateUrl: './host-game-setup.component.html',
  styleUrls: [ './host-game-setup.component.scss' ]
})
export class HostGameSetupComponent {
  hostGameForm = new FormGroup({
    'gameMode': new FormControl(GameType.Elimination),
    'ipMode': new FormControl(IPType.IPv4),
    'musicMode': new FormControl(MusicPlaybackMode.Client),
  });

  constructor() {

  }
}
