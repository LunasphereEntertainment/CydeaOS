import { CliRunner } from "../cli.runner";
import { Computer } from "../../nodes/computer/computer";
import { CliCommand } from "../cli-command";

export class LsCommand implements CliRunner {
    static executable = "ls";

    execute(command: CliCommand, target: Computer): Promise<string> {
        return Promise.resolve(
            target.fileSystem.listFiles()
                .map(file => file.name)
                .join("\n")
        );
    }
}
