import { FileSystemEmulation } from '../file-system/file-system-emulation';
import { NetworkPort } from '../../network-port/network.port';
import { ComputerDaemon } from '../daemons/ComputerDaemon';
import { NetworkPacket } from '../networking/packet';

export const DefaultSystemOwner = 'System'

export class Computer {
    hostname: string;

    ip?: string;

    readonly fileSystem: FileSystemEmulation;

    daemons: ComputerDaemon[] = [];

    online: boolean;

    owner: string;


    constructor(hostname: string, fileSystemEmulation: FileSystemEmulation = new FileSystemEmulation(), owner: string = DefaultSystemOwner) {
        this.hostname = hostname;
        this.fileSystem = fileSystemEmulation;
        this.owner = owner;
        this.online = true;
    }

    getPort(port: number): NetworkPort {
        this.checkStatus()

        const ports = this.listPorts();

        const foundPort = ports.find((p) => p.port === port);

        if (!foundPort) {
            throw new Error(`Port ${ port } not found`);
        }

        return foundPort;
    }

    listPorts(): NetworkPort[] {
        this.checkStatus()

        let ports: NetworkPort[] = [];

        this.daemons.forEach((daemon) => ports = ports.concat(daemon.ports));

        return ports;
    }

    isOnline(): boolean {
        return this.online;
    }

    handlePacket(packet: NetworkPacket): any[] {
        this.checkStatus();

        return this.daemons
            .filter((daemon) => daemon.supportedPacketType === packet.type)
            .map((daemon) => daemon.handleRequest(packet));
    }

    private checkStatus() {
        if (!this.isOnline()) {
            throw new ComputerOfflineError();
        }
    }
}

const ComputerOfflineMessage = 'Computer is offline';

export class ComputerOfflineError extends Error {
    constructor() {
        super(ComputerOfflineMessage);
        Object.setPrototypeOf(this, ComputerOfflineError.prototype);
    }
}

