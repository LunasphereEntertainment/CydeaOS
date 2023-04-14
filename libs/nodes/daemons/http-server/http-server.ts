import { ComputerDaemon } from '../ComputerDaemon';
import { FileType } from '../../file-system/i-file-entries';
import { Computer } from '../../computer/computer';
import { HTTPPacketData, NetworkPacketType } from '../../networking/packet';

export class HttpServer extends ComputerDaemon {
    constructor(private computer: Computer, overridePort: number = 80) {
        super(computer, NetworkPacketType.HTTP, overridePort);
    }

    public handleRequest(packet: HTTPPacketData): string {
        const { path } = packet;

        const file = this._computer.fileSystem.getFile(path);
        if (file.type === FileType.Text) {
            return <string>file.content;
        } else {
            throw new FileNotServable();
        }
    }
}

export class FileNotServable extends Error {
    constructor() {
        super('File is not servable.');
    }
}
