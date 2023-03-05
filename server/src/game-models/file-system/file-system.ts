
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
