import { CliRunner } from "../cli.runner.interface";
import { CliCommand } from "../cli-command";
import { Computer } from "../../nodes/computer/computer";
import { FileType } from "../../nodes/file-system/i-file-entries";

export class ReplaceCommand implements CliRunner {
    static executable = "replace";
    execute(command: CliCommand, target: Computer): Promise<string> {
        const args = command.args.split(" ");

        const [fileName, regexStr, replacement] = args.slice(0, 3);

        // grab the file from the file system
        const file = target.fileSystem.getFile(fileName);
        // confirm it's a text file


        // configure the regex
        const regex = new RegExp(regexStr, "g");

        // replace the text
        const content = (<string>file.content).replace(regex, replacement);

        // update the file contents
        target.fileSystem.updateFile(args[0], {name: file.name, type: file.type, content});

        return Promise.resolve(content);
    }
}
