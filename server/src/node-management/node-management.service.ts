import { Injectable } from '@nestjs/common';
import { Computer } from '@cydeaos/libs/nodes/computer/computer';
import { GameNotFoundError } from '../errors/game-error/game.errors';
import { GameConfiguration } from '@cydeaos/libs/game-configuration/game-configuration';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GameEventCategory } from '@cydeaos/libs/events/game-event';
import { GameManagementEventType } from '@cydeaos/libs/events/game-management-event/game-management-event-type';
import { GameObject } from '@cydeaos/libs/game-object/game-object';
import { loadNodes } from '../node-templates/node-loader';
import { IPGenerator } from '@cydeaos/libs/ip-generator/ip-generator';
import { NodeEventType } from '@cydeaos/libs/events/node-management-event/node-event-type';

const eliminationNodePath = 'C:\\Users\\admir\\CodingProjects\\Cydeaos\\server\\src\\node-templates\\elimination';

@Injectable()
export class NodeManagementService {
    private readonly nodes: Map<string, Computer[]> = new Map();

    constructor(private eventEmitter: EventEmitter2) {
        this.eventEmitter.on(
            [ GameEventCategory.GameManagement, GameManagementEventType.GameCreation ],
            (game: GameObject) => this.initializeGame(game.gameCode, game.config));
    }

    addNode(gameCode: string, node: Computer) {
        if (!this.nodes.has(gameCode)) {
            throw new GameNotFoundError(gameCode);
        }

        this.nodes.get(gameCode)!.push(node);

        this.eventEmitter.emit(
            [ GameEventCategory.NodeManagement, NodeEventType.NodeCreation ],
            node
        )
    }

    findNode(gameCode: string, ipAddress: string): (Computer | undefined) {
        if (!this.nodes.has(gameCode)) {
            throw new GameNotFoundError(gameCode);
        }

        return this.nodes.get(gameCode)!.find(node => node.ip === ipAddress);
    };

    findNodeByHostname(gameCode: string, hostname: string): Computer | undefined {
        if (!this.nodes.has(gameCode)) {
            throw new GameNotFoundError(gameCode);
        }

        return this.nodes.get(gameCode)!.find(node => node.hostname === hostname);
    }

    initializeGame(gameCode: string, config: GameConfiguration) {
        console.log(`Initializing nodes for game '${ gameCode }' using '${ config.ipType }' generator.`);

        let ipGenerator = new IPGenerator(config.ipType);

        loadNodes(eliminationNodePath).then(nodeList => {
            nodeList.forEach(node => {
                node.ip = ipGenerator.generate()
                this.addNode(gameCode, node);
            });
        });
    }

    deleteNodeById(gameCode: string, ip: string) {
        if (!this.nodes.has(gameCode)) {
            throw new GameNotFoundError(gameCode);
        }

        let nodeIndex = this.nodes.get(gameCode)!.findIndex(node => node.ip === ip);
        if (nodeIndex === -1) {
            throw new Error(`Node with IP '${ ip }' not found in game '${ gameCode }'.`);
        }
        this.nodes.get(gameCode)!.splice(nodeIndex, 1);
    }
}
