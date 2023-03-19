import { CliRunner } from "../cli.runner";
import { Computer } from "../../nodes/computer/computer";
import { FileType } from "../../nodes/file-system/i-file-entries";
import { CliCommand } from "../cli-command";
import { LsCommand } from "../ls-command/ls-command";

export class CatCommand implements CliRunner {
    static executable = "cat";

    execute(command: CliCommand, target: Computer): Promise<string> {
        const targetFile = target.fileSystem.getFile(command.args);
        if (targetFile.type === FileType.Directory) {

            return new LsCommand().execute(command, target);
            /*return Promise.resolve(
                target.fileSystem.listFiles(command.args)
                    .map(file => file.name)
                    .join("\n")
            );*/
        } else {
            return Promise.resolve(<string>targetFile.content);
        }
    }
}
