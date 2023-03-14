export class NodeEventPayload {
    public type: NodeEventType;
    public data: any;
}

export enum NodeEventType {
    FindNode = 'find-node',
    ExecuteCommand = 'execute-command',
    AddFile = 'add-file',
    UpdateFile = 'update-file',
    RemoveFile = 'remove-file',
}

/*
export interface FileRequest {
    name: string;
    path: string;
    content: string;
}*/
