import { CliRunner } from "../cli.runner";
import { Computer } from "../../nodes/computer/computer";
import { CliCommand } from "../cli-command";
import { FileType } from "../../nodes/file-system/i-file-entries";

export class LsCommand implements CliRunner {
    static executable = "ls";

    execute(command: CliCommand, target: Computer): Promise<string> {
        return Promise.resolve(
            target.fileSystem.listFiles(command.args)
                .map(file => {
                    const isDirectory = file.type === FileType.Directory
                    let returnString = file.name;

                    if (isDirectory) { // noinspection HtmlDeprecatedTag,XmlDeprecatedElement
                        returnString += '\t\t<DIR>'
                    }

                    return returnString;
                })
                .join("\n")
        );
    }
}
