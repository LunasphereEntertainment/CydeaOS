import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { FileSystemEvent, FileSystemEventType } from '@cydeaos/libs/events/file-system-event/file-system-event';
import { NodeManagementService } from '../node-management/node-management.service';
import { Computer } from '@cydeaos/libs/nodes/computer/computer';
import { GameSocket } from '../game-socket.interface';
import { FileNotFound, FileType, IFileEntry } from '@cydeaos/libs/nodes/file-system/i-file-entries';
import { IPNotFoundError } from '../errors/node-errors/node-errors';

@WebSocketGateway({ cors: process.env.CORS === 'true' })
export class FileSystemGateway {

    constructor(private nodeManagementService: NodeManagementService) {
    }

    @SubscribeMessage(FileSystemEventType.ListFiles)
    handleListFiles(client: GameSocket, payload: any): IFileEntry[] {
        const { target: targetIp, path } = payload;
        const node = this.resolveNode(client.game.gameCode, targetIp);
        if (node) {
            return node.fileSystem.listFiles(path);
        }

        throw new IPNotFoundError(targetIp);
    }

    @SubscribeMessage(FileSystemEventType.ReadFile)
    handleReadFile(client: GameSocket, payload: any): string {
        const { target: targetIp, path } = payload;
        const node = this.resolveNode(client.game.gameCode, targetIp);
        if (node) {
            const file = node.fileSystem.getFile(path);
            if (file.type !== FileType.Directory) {
                return <string>file.content;
            } else {
                throw new Error('Cannot read a directory.');
            }
        }

        throw new IPNotFoundError(targetIp);
    }

    @SubscribeMessage(FileSystemEventType.WriteFile)
    handleWriteFile(client: GameSocket, payload: FileSystemEvent): void {
        const { target: targetIp, file, path } = payload.data,
            node = this.resolveNode(client.game.gameCode, targetIp);

        if (!file) {
            throw new Error('File content is missing.');
        }

        if (node) {
            try {
                const file = node.fileSystem.getFile(path);
                node.fileSystem.updateFile(path, file);
            } catch (e) {
                if (e instanceof FileNotFound)
                    node.fileSystem.createFile(path, file);

                throw e;
            }
        }
    }

    @SubscribeMessage(FileSystemEventType.DeleteFile)
    handleDeleteFile(client: GameSocket, payload: FileSystemEvent): void {
        const { target: targetIp, path } = payload.data,
            node = this.resolveNode(client.game.gameCode, targetIp);

        if (node) {
            node.fileSystem.deleteFile(path);
        }
    }

    private resolveNode(gameId: string, targetIp: string): (Computer | undefined) {
        return this.nodeManagementService.findNode(gameId, targetIp);
    }
}
