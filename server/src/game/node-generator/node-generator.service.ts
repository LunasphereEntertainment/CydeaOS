import { Injectable } from '@nestjs/common';
import { Player } from '../../game-models/player/player';
import { Computer } from '../../game-models/computer/computer';
import { FileType, IFileEntry } from '../../game-models/file-system/file-system';

@Injectable()
export class NodeGeneratorService {
    emptyFileSystem(): IFileEntry[] {
        return [
            {
                type: FileType.Directory,
                name: 'home',
                content: []
            },
            {
                type: FileType.Directory,
                name: 'log',
                content: []
            },
            {
                type: FileType.Directory,
                name: 'bin',
                content: []
            },
            {
                type: FileType.Directory,
                name: 'sys',
                content: []
            }
        ]
    }

    generatePlayerNode(player: Player): Computer {
        return new Computer(
            `${player.displayName}'s Computer`,
            this.emptyFileSystem(),
        )
    }

    generateComputerNode(): Computer {
        return new Computer(
            'computer',
            this.emptyFileSystem(),
        )
    }
}
