export class CliCommand {
    executable: string;
    args: string;

    constructor(executable: string, args: string) {
        this.executable = executable;
        this.args = args;
    }

    toString(): string {
        return [this.executable, this.args].join(" ");
    }

    static fromString(command: string): CliCommand {
        let spaceIndex = command.indexOf(" ");
        if (spaceIndex === -1) {
            return new CliCommand(command, "");
        }
        return new CliCommand(
            command.substring(0, spaceIndex),
            command.substring(spaceIndex + 1)
        );
    }


}
