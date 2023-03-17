import { ComputerDaemon } from "../ComputerDaemon";
import { NetworkPort } from "../../../network-port/network.port";
import { FileType } from "../../file-system/i-file-entries";
import { FileSystemEmulation } from "../../file-system/file-system-emulation";

export class HttpServer implements ComputerDaemon {
    name: string = "HTTP";
    ports: NetworkPort[] = [];

    online: boolean = true;
    constructor(private fs: FileSystemEmulation, overridePort: number = 80) {
        this.ports.push(new NetworkPort(overridePort, false));
    }

    public handleRequest(path: string): string {
        const file = this.fs.getFile(path);
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
