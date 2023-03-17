import { Injectable } from '@nestjs/common';
import { Player } from '../../game-models/player/player';
import { FileType, IFileEntry } from "../../game-models/nodes/file-system/i-file-entries";
import { Computer } from "../../game-models/nodes/computer/computer";

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
            `${player.username}'s Computer`
        )
    }

    generateComputerNode(): Computer {
        return new Computer(
            'computer'
        )
    }
}
