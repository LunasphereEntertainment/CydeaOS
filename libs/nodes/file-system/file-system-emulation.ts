import { FileNotDirectory, FileNotFound, FileType, IFileEntry } from "./i-file-entries";

export class FileSystemEmulation {
    entries: IFileEntry = {name: '', type: FileType.Directory, content: []};

    constructor(fileTree?: IFileEntry) {
        if (fileTree) {
            this.entries = fileTree;
        }
    }

    getFile(path: string): IFileEntry {
        if (path.length === 0) {
            return this.entries;
        }

        let [parent, index] = this.getFileIndex(path);
        return (<IFileEntry[]>parent.content)[index];
    }

    private getFileIndex(path: string, mustExist: boolean = true): [IFileEntry, number] {
        const parts = path.split("/")
            .filter((part) => part !== "" && part !== "." && part !== ".."); // sanitize path

        let currentFile: IFileEntry | undefined = this.entries,
            parent: IFileEntry | undefined;

        while (parts.length > 0) {
            if (!currentFile && mustExist) {
                throw new FileNotFound();
            }

            let currentPath = parts.shift();

            if (currentFile!.type !== FileType.Directory) {
                throw new FileNotDirectory();
            }

            currentFile = (<IFileEntry[]>currentFile!.content).find((file) => file.name === currentPath);

            if (parts.length > 0) {
                parent = currentFile;
            }

        }

        if (!currentFile && mustExist) {
            throw new FileNotFound();
        }

        if (parent == null) {
            parent = this.entries;
        }

        return [parent, (<IFileEntry[]>parent.content).indexOf(currentFile!)];
    }

    listFiles(path: string = ""): IFileEntry[] {
        const file = this.getFile(path);
        if (file.type !== FileType.Directory) {
            throw new FileNotDirectory();
        }
        return <IFileEntry[]>file.content;
    }

    createFile(path: string, file: IFileEntry): IFileEntry {
        const [ parent, index ] = this.getFileIndex(`${path}/${file.name}`, false);
        if (index !== -1) {
            throw new Error("File already exists");
        }

        (<IFileEntry[]>parent.content).push(file);

        return file;
    }

    updateFile(path: string, file: IFileEntry): IFileEntry {
        const destination = this.getFile(path);
        if (destination.type === FileType.Directory) {
            throw new FileNotFound();
        }
        destination.content = file.content;
        return file;
    }

    deleteFile(path: string): void {
        let [parent, index] = this.getFileIndex(path);
        delete parent[index];
    }
}
