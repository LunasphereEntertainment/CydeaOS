import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SocketService {
  readonly socket: Socket

  constructor() {
    this.socket = io('http://localhost:3000');
  }
}
