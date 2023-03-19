import { CliCommand } from "../cli-command";
import { CliRunner } from "../cli.runner";

export class EchoCommand implements CliRunner {
    static executable = "echo";

    execute(command: CliCommand): Promise<string> {
        return Promise.resolve(command.args);
    }
}
