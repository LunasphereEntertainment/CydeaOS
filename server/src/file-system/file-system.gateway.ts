import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { FileSystemEvent, FileSystemEventType } from '../../../libs/events/file-system-event/file-system-event';
import { NodeManagementService } from '../node-management/node-management.service';
import { Computer } from '../../../libs/nodes/computer/computer';
import { GameSocket } from '../game-socket.interface';
import { UseInterceptors } from '@nestjs/common';
import { GameResolverInterceptor } from '../game/game-resolver/game-resolver.interceptor';
import { IFileEntry } from '../../../libs/nodes/file-system/i-file-entries';
import { IPNotFoundError } from '../errors/node-errors/node-errors';
import { FileNotFound, FileType } from '../../../libs/nodes/file-system/i-file-entries';

@WebSocketGateway({ cors: process.env.CORS === 'true' })
@UseInterceptors(GameResolverInterceptor)
export class FileSystemGateway {

    constructor(private nodeManagementService: NodeManagementService) {    }

    private resolveNode(gameId: string, targetIp: string): (Computer | undefined) {
        return this.nodeManagementService.findNode(gameId, targetIp);
    }

    @SubscribeMessage(FileSystemEventType.ListFiles)
    handleListFiles(client: GameSocket, payload: any): IFileEntry[] {
        const { target: targetIp, path } = payload;
        const node = this.resolveNode(client.game.id, targetIp);
        if (node) {
            return node.fileSystem.listFiles(path);
        }

        throw new IPNotFoundError(targetIp);
    }

    @SubscribeMessage(FileSystemEventType.ReadFile)
    handleReadFile(client: GameSocket, payload: any): string {
        const { target: targetIp, path } = payload;
        const node = this.resolveNode(client.game.id, targetIp);
        if (node) {
            const file = node.fileSystem.getFile(path);
            if (file.type !== FileType.Directory) {
                return <string>file.content;
            } else {
                throw new Error('Cannot read a directory.');
            }
        }
    }

    @SubscribeMessage(FileSystemEventType.WriteFile)
    handleWriteFile(client: GameSocket, payload: FileSystemEvent): void {
        const { target: targetIp, file, path } = payload.data,
            node = this.resolveNode(client.game.id, targetIp);

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
            node = this.resolveNode(client.game.id, targetIp);

        if (node) {
            node.fileSystem.deleteFile(path);
        }
    }
}
