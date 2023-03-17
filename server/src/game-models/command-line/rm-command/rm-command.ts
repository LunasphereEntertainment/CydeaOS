import { CliRunner } from "../cli.runner.interface";
import { CliCommand } from "../cli-command";
import { Computer } from "../../nodes/computer/computer";

export class RmCommand implements CliRunner {
    static executable = "rm";

    execute(command: CliCommand, target: Computer): Promise<string> {
        try {
            target.fileSystem.deleteFile(command.args);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
