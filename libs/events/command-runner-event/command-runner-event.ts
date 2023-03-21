// import { CliCommand } from '../../command-line/cli-command';

export interface CommandRunnerEvent {
    type: CommandRunnerEventType;
    command: string;
    targetIp?: string; // hostname or ip address
    result?: string;
    error?: string;

    /*static fromCommand(command: string, targetIp?: string): CommandRunnerEvent {
        const cmd = new CommandRunnerEvent();
        cmd.command = CliCommand.fromString(command);
        cmd.targetIp = targetIp;
        return cmd;
    }*/

    // constructor(type: CommandRunnerEventType = CommandRunnerEventType.ExecuteCommand) {
    //     this.type = type;
    // }
}

export enum CommandRunnerEventType {
    ExecuteCommand = "ExecuteCommand",
    ExecuteCommandResult = "ExecuteCommandResult",
    ExecuteCommandError = "ExecuteCommandError",
}
