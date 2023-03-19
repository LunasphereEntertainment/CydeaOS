import { CliCommand } from "./cli-command";
import { EchoCommand } from "./echo-command/echo-command";
import { Computer } from "../nodes/computer/computer";
import { RmCommand } from "./rm-command/rm-command";
import { LsCommand } from "./ls-command/ls-command";

export interface CliRunner {
    execute(command: CliCommand, target?: Computer | Computer[] ): Promise<string>;
}

const executors: Map<string, CliRunner> = new Map([
    [EchoCommand.executable, new EchoCommand()],
    [RmCommand.executable, new RmCommand()],
    ['del', new RmCommand()],
    [LsCommand.executable, new LsCommand()],
    ['dir', new LsCommand()],
]);

export default function(cmd: string, target?: Computer): Promise<string> {
    const command = CliCommand.fromString(cmd);
    const executor = executors.get(command.executable);
    if (!executor) {
        return Promise.reject(`Unrecognised command: ${command.executable}`);
    }

    return executor.execute(command, target);
}
