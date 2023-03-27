import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { CommandRunnerEvent, CommandRunnerEventType } from '@cydeaos/libs/events/command-runner-event/command-runner-event';
import { NodeManagementService } from '../node-management/node-management.service';
import { Computer } from '@cydeaos/libs/nodes/computer/computer';
import { default as commandExecutor } from '@cydeaos/libs/command-line/cli.runner';
import { AuthSocket } from "../auth-socket.interface";
import { GameObject } from "@cydeaos/libs/game-object/game-object";
import { GameResolverPipe } from "../game-resolver/game-resolver.pipe";

@WebSocketGateway({ cors: true })
export class CommandRunnerGateway {

    constructor(private readonly nodeManagementService: NodeManagementService) {
    }

    @SubscribeMessage(CommandRunnerEventType.ExecuteCommand)
    async handleExecuteCommand(
        @MessageBody('gameCode', GameResolverPipe) game: GameObject,
        @MessageBody() payload: CommandRunnerEvent,
        @ConnectedSocket() client: AuthSocket
    ): Promise<WsResponse<CommandRunnerEvent>> {
        let {command, targetIp} = payload,
            target: Computer | undefined = undefined;

        if (targetIp)
            target = this.nodeManagementService.findNode(game.id, targetIp);

        try {
            const result = await commandExecutor(command, target);
            // client.emit(CommandRunnerEventType.ExecuteCommandResult, result);

            return {
                event: CommandRunnerEventType.ExecuteCommandResult,
                data: {
                    type: CommandRunnerEventType.ExecuteCommandResult,
                    command: command,
                    gameCode: game.id,
                    result,
                }
            }
        } catch (e) {
            return {
                event: CommandRunnerEventType.ExecuteCommandError,
                data: {
                    type: CommandRunnerEventType.ExecuteCommandError,
                    command: command,
                    gameCode: game.id,
                    error: e,
                }
            };
        }
    }
}
