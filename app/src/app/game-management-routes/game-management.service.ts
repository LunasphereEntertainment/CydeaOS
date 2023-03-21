import { Injectable } from '@angular/core';
import { SocketService } from "../shared/socket.service";
import { GameObject } from "@cydeaos/libs/game-object/game-object";
import { Observable } from "rxjs";
import { GameEventType } from "@cydeaos/libs/events/game-management-event/game-event-type";
import { GameConfiguration } from "@cydeaos/libs/game-configuration/game-configuration";
import { GameManagementRequest } from "@cydeaos/libs/events/game-management-event/game-management-request";
import { GameManagementResponse } from "@cydeaos/libs/events/game-management-event/game-management-response";
import { GameJoinClientResponse } from "@cydeaos/libs/events/game-management-event/game-join-responses";

@Injectable()
export class GameManagementService {

  constructor(private socketService: SocketService) {
  }

  getGame(gameCode: string): Observable<GameObject> {
    return this.socketService.sendAndReceive<GameObject>(GameEventType.GameGet, gameCode);
  }

  createGame(config: GameConfiguration): Observable<GameManagementResponse> {
    return this.socketService.sendAndReceive<GameManagementResponse>(GameEventType.GameCreation, <GameManagementRequest>{
      config: config
    });
  }

  joinGame(gameCode: string): Observable<GameJoinClientResponse> {
    return this.socketService.sendAndReceive<GameJoinClientResponse>(GameEventType.GameJoined, <GameManagementRequest>{
      gameId: gameCode
    });
  }

  leaveGame(gameCode: string): Observable<GameJoinClientResponse> {
    return this.socketService.sendAndReceive<GameJoinClientResponse>(GameEventType.GameLeft, <GameManagementRequest>{
      gameId: gameCode
    });
  }

  startGame(gameCode: string): Observable<GameManagementResponse> {
    return this.socketService.sendAndReceive<GameManagementResponse>(GameEventType.GameStarted, <GameManagementRequest>{
      gameId: gameCode
    });
  }
}
