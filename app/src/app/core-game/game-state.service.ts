import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  currentTarget = new BehaviorSubject("localhost");
  currentPath = new BehaviorSubject("");

  constructor() { }

  changeTarget(target?: string) {
    this.currentTarget.next(target || "localhost");
    this.currentPath.next("");
  }

  changePath(path: string) {
    this.currentPath.next(path);
  }
}
