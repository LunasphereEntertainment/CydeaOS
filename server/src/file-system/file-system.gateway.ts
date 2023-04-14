import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { FileSystemEvent, FileSystemEventType } from '@cydeaos/libs/events/file-system-event/file-system-event';
import { Computer } from '@cydeaos/libs/nodes/computer/computer';
import { FileNotFound, FileType, IFileEntry } from '@cydeaos/libs/nodes/file-system/i-file-entries';
import { AuthSocket } from '../auth-socket.interface';
import { GameResolverPipe } from '../resolvers/game-resolver/game-resolver.pipe';
import { GameObject } from '@cydeaos/libs/game-object/game-object';
import { NodeResolverPipe } from '../resolvers/node-resolver/node-resolver.pipe';

@WebSocketGateway({ cors: process.env.CORS === 'true' })
export class FileSystemGateway {

    constructor() {
    }

    @SubscribeMessage(FileSystemEventType.ListFiles)
    handleListFiles(
        @MessageBody('gameId', GameResolverPipe) game: GameObject,
        @MessageBody() payload: FileSystemEvent,
        @MessageBody(NodeResolverPipe) node: Computer, // throws IPNotFoundError
        @ConnectedSocket() client: AuthSocket
    ): IFileEntry[] {
        return node.fileSystem.listFiles(payload.path);
    }

    @SubscribeMessage(FileSystemEventType.ReadFile)
    handleReadFile(
        @MessageBody('gameId', GameResolverPipe) game: GameObject,
        @MessageBody() payload: FileSystemEvent,
        @MessageBody(NodeResolverPipe) node: Computer, // throws IPNotFoundError
        @ConnectedSocket() client: AuthSocket,
    ): WsResponse<string> {
        const file = node.fileSystem.getFile(payload.path);

        if (file.type === FileType.Directory)
            throw new Error('Cannot read a directory.');

        return {
            event: FileSystemEventType.ReadFile,
            data: <string>file.content
        }
    }

    @SubscribeMessage(FileSystemEventType.WriteFile)
    handleWriteFile(
        @MessageBody('gameId', GameResolverPipe) game: GameObject,
        @MessageBody() payload: FileSystemEvent,
        @MessageBody(NodeResolverPipe) node: Computer, // throws IPNotFoundError
        @ConnectedSocket() client: AuthSocket,
    ): void {
        const { file, path } = payload;

        if (!file) {
            throw new Error('File content is missing.');
        }

        try {
            const file = node.fileSystem.getFile(path);
            node.fileSystem.updateFile(path, file);
        } catch (e) {
            if (e instanceof FileNotFound)
                node.fileSystem.createFile(path, file);

            throw e;
        }
    }

    @SubscribeMessage(FileSystemEventType.DeleteFile)
    handleDeleteFile(
        @MessageBody('gameId', GameResolverPipe) game: GameObject,
        @MessageBody() payload: FileSystemEvent,
        @MessageBody(NodeResolverPipe) node: Computer, // throws IPNotFoundError
    ): void {
        node.fileSystem.deleteFile(payload.path);
    }
}
