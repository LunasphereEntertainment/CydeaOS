import { Component } from '@angular/core';
import { MediaMood } from "@cydeaos/libs/media/media-mood/media-mood";

@Component({
  selector: 'app-game-launcher',
  templateUrl: './game-launcher.component.html',
  styleUrls: ['./game-launcher.component.scss']
})
export class GameLauncherComponent {
  mainMood = MediaMood.MainMenu;

}
