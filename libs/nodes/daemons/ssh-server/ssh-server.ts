import { ComputerDaemon } from '../ComputerDaemon';
import { Computer } from '../../computer/computer';
import CliRunner from '../../../command-line/cli.runner';
import { NetworkPacketType, SSHPacketData } from '../../networking/packet';

export class SshServer extends ComputerDaemon {
    constructor(computer: Computer, overridePort: number = 22) {
        super(computer, NetworkPacketType.SSH, overridePort);
    }

    handleRequest(packet: SSHPacketData): Promise<string> {
        if (this.online) {
            return CliRunner(packet.command, this._computer);
        }

        return Promise.reject('SSH Server is offline');
    }
}
