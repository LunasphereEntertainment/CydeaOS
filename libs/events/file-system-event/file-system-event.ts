import { IFileEntry } from '../../nodes/file-system/i-file-entries';
import { InGameEvent, RequiresIP } from '../game-event-payload';

export interface FileSystemEvent extends InGameEvent, RequiresIP {
    type: FileSystemEventType;
    path: string;
    file?: IFileEntry;
}

export enum FileSystemEventType {
    ListFiles = 'listFiles',
    ReadFile = 'readFile',
    WriteFile = 'writeFile',
    DeleteFile = 'deleteFile'
}
