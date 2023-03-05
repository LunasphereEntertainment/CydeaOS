import { NetworkPort } from "../network-port/network.port";
import { FileNotDirectory, FileNotFound, FileType, IFileEntry } from "../file-system/file-system";


export class Computer {
    hostname: string;

    ip: string;

    files: IFileEntry[];

    ports: NetworkPort[];

    online: boolean;

    owner: string;


    constructor(hostname: string, ip: string, files: IFileEntry[] = [], ports: NetworkPort[] = [], owner: string = "System") {
        this.hostname = hostname;
        this.ip = ip;
        this.files = files || [];
        this.ports = ports || [];
        this.owner = owner;
        this.online = true;
    }

    checkStatus() {
        if (!this.isOnline()) {
            throw new ComputerOfflineError();
        }
    }

    // getFiles(): IFileEntry[] {
    //     this.checkStatus()
    //
    //     return this.files;
    // }

    getFile(path: string): IFileEntry {
        this.checkStatus()


        const parts = path.split("/")
            .filter((part) => part !== "" && part !== "." && part !== ".."); // sanitize path

        let currentFile: IFileEntry | null = null;

        while (parts.length > 0) {
            let currentPath = parts.shift();
            if (currentFile === null) {
                currentFile = this.files.find((file) => file.name === currentPath);
            } else {
                if (currentFile.type !== FileType.Directory) {
                    throw new FileNotDirectory();
                }
                currentFile = (<IFileEntry[]>currentFile.content).find((file) => file.name === currentPath);
            }
        }

        if (currentFile == null) {
            throw new FileNotFound();
        }

        return currentFile;
    }

    getPort(number: number): NetworkPort {
        this.checkStatus()

        return this.ports.find((port) => port.port === number);
    }

    isOnline(): boolean {
        return this.online;
    }
}

const ComputerOfflineMessage = "Computer is offline";

export class ComputerOfflineError extends Error {
    constructor() {
        super(ComputerOfflineMessage);
        Object.setPrototypeOf(this, ComputerOfflineError.prototype);
    }
}

