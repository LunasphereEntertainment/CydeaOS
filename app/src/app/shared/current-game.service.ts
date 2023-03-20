import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { GameObject } from "@cydeaos/libs/game-object/game-object";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {
  private currentGame?: GameObject;
  constructor() { }

  setCurrentGame(game: GameObject) {
    this.currentGame = game;
  }

  getCurrentGame() {
    return this.currentGame;
  }
}
