import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoplayService {
  ee: EventEmitter<AutoplayState> = new EventEmitter();
  constructor() { }

  notifyApproval() {
    this.ee.emit(AutoplayState.Approved);
  }

  promptUser() {
    this.ee.emit(AutoplayState.RequiresInteraction);
  }
}

export enum AutoplayState {
  RequiresInteraction,
  Approved
}
