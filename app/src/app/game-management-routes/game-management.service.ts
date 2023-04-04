import { Injectable } from '@angular/core';
import { SocketService } from '../shared/socket.service';
import { Observable } from 'rxjs';
import { GameManagementEventType } from '@cydeaos/libs/events/game-management-event/game-management-event-type';
import { GameConfiguration } from '@cydeaos/libs/game-configuration/game-configuration';
import { GameManagementRequest } from '@cydeaos/libs/events/game-management-event/game-management-request';
import { GameManagementResponse } from '@cydeaos/libs/events/game-management-event/game-management-response';
import { GameJoinClientResponse } from '@cydeaos/libs/events/game-management-event/game-join-responses';
import { GameManagementEvent } from '@cydeaos/libs/events/game-management-event/game-management-event';
import { GameEventCategory } from '@cydeaos/libs/events/game-event';

@Injectable()
export class GameManagementService {

  constructor(private socketService: SocketService) {
  }

  getGameInfo(gameCode: string): Observable<GameManagementEvent> {
    return this.socketService.sendAndReceive<GameManagementEvent>(
      GameEventCategory.GameManagement,
      <GameManagementEvent>{
        type: GameManagementEventType.GameGet,
        gameCode: gameCode,
      });
  }

  createGame(config: GameConfiguration): Observable<GameManagementEvent> {
    return this.socketService.sendAndReceive<GameManagementEvent>(
      GameEventCategory.GameManagement,
      <GameManagementEvent>{
        type: GameManagementEventType.GameCreation,
        gameConfig: config,
      }
    );
  }

  joinGame(gameCode: string): Observable<GameJoinClientResponse> {
    return this.socketService.sendAndReceive<GameJoinClientResponse>(GameManagementEventType.GameJoined, <GameManagementRequest>{
      gameCode: gameCode
    });
  }

  leaveGame(gameCode: string): Observable<GameJoinClientResponse> {
    return this.socketService.sendAndReceive<GameJoinClientResponse>(GameManagementEventType.GameLeft, <GameManagementRequest>{
      gameCode: gameCode
    });
  }

  startGame(gameCode: string): Observable<GameManagementResponse> {
    return this.socketService.sendAndReceive<GameManagementResponse>(GameManagementEventType.GameStarted, <GameManagementRequest>{
      gameCode: gameCode
    });
  }
}
