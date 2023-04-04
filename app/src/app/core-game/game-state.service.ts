import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  currentTarget = new BehaviorSubject("localhost");
  currentPath = new BehaviorSubject("");


  constructor() { }
}
