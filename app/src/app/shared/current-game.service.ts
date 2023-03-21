import { Injectable } from '@angular/core';
import { GameObject } from "@cydeaos/libs/game-object/game-object";

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {
  private currentGame?: GameObject;

  constructor() {
  }

  setCurrentGame(game: GameObject) {
    this.currentGame = game;
  }

  getCurrentGame() {
    return this.currentGame;
  }
}
