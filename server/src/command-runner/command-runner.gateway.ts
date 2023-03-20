import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CommandRunnerEvent, CommandRunnerEventType } from "../../../libs/events/command-runner-event/command-runner-event";
import { UseInterceptors } from "@nestjs/common";
import { GameResolverInterceptor } from "../game/game-resolver/game-resolver.interceptor";
import { GameSocket } from "../game-socket.interface";
import { NodeManagementService } from "../node-management/node-management.service";
import { Computer } from "../../../libs/nodes/computer/computer";
import { default as commandExecutor } from "../../../libs/command-line/cli.runner";

@WebSocketGateway({ cors: process.env.CORS === 'true' })
@UseInterceptors(GameResolverInterceptor)
export class CommandRunnerGateway {

  constructor(private readonly nodeManagementService: NodeManagementService) {
  }

  @SubscribeMessage(CommandRunnerEventType.ExecuteCommand)
  async handleExecuteCommand(client: GameSocket, payload: CommandRunnerEvent) {
    const game = client.game;
    let { command, targetIp } = payload,
      target: Computer | undefined = undefined;

    if (targetIp)
      target = this.nodeManagementService.findNode(game.id, targetIp);

    const result = await commandExecutor(command, target);
    client.emit(CommandRunnerEventType.ExecuteCommandResult, result);
  }
}