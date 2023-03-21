import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { defer, fromEvent, Observable } from "rxjs";

@Injectable()
export class SocketService {
  private socket?: Socket

  constructor() {
    const token = localStorage.getItem('token');

    // this.socket = io('http://localhost:3000');
    this.socket = io('http://localhost:3000', {extraHeaders: {Authorization: `Bearer ${token}`}});

  }

  public sendAndReceive<T>(event: string, data: any): Observable<T> {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    return defer(() => {
      return new Promise<T>((resolve) => {
        this.socket!.emit(event, data);
        this.socket!.once(event, (response: T) => {
          resolve(response);
        });
      });
    });
  }

  public blindSend(event: string, data: any) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    this.socket!.emit(event, data);
  }

  public listen<T>(event: string): Observable<T> {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    return fromEvent<T>(this.socket!, event);
  }

  public stopListening(event: string) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    this.socket!.off(event);
  }
}
