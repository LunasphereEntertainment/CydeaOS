export class CommandRunnerEvent {
    type: CommandRunnerEventType;
    command: string;
    targetIp?: string; // hostname or ip address
    result?: string;
    error?: string;
}

export enum CommandRunnerEventType {
    ExecuteCommand = "ExecuteCommand",
    ExecuteCommandResult = "ExecuteCommandResult",
    ExecuteCommandError = "ExecuteCommandError",
}
