import { IFileEntry } from '../../nodes/file-system/i-file-entries';

export class FileSystemEvent {
    type: FileSystemEventType;
    data: { target: string, file?: IFileEntry, path: string};
}

export enum FileSystemEventType {
    ListFiles = 'listFiles',
    ReadFile = 'readFile',
    WriteFile = 'writeFile',
    DeleteFile = 'deleteFile'
}