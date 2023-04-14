
export enum FileType {
    Text = "text",
    Image = "image",
    Binary = "binary",
    Executable = "executable",
    Directory = "directory"
}

export interface IFileEntry {
    name: string;

    type: FileType;

    content: string | IFileEntry[];
}

export function EmptyDir() {
    return { name: "", type: FileType.Directory, content: [] };
}

export class FileNotFound extends Error {
    constructor() {
        super("File not found");
    }
}

export class FileNotDirectory extends Error {
    constructor() {
        super("File is not a directory");
    }
}
