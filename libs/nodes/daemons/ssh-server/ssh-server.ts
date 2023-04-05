import { ComputerDaemon } from "../ComputerDaemon";
import { NetworkPort } from "../../../network-port/network.port";
import { Computer } from "../../computer/computer";
import CliRunner from "../../../command-line/cli.runner";

export class SshServer implements ComputerDaemon {
    name: string = "SSH Server";
    ports: NetworkPort[] = [];
    online = true;

    private readonly _computer: Computer;

    constructor(computer: Computer, overridePort: number = 22) {
        this.ports.push(new NetworkPort(overridePort, false));
        this._computer = computer;
    }

    handleRequest(data: any): Promise<string> {
        if (this.online) {
            return CliRunner(data, this._computer);
        }
    }
}
