import { Injectable } from '@nestjs/common';
import { Computer } from "../../../libs/nodes/computer/computer";
import { GameNotFoundError } from "../errors/game-error/game.errors";

@Injectable()
export class NodeManagementService {
    private readonly nodes: Map<string, Computer[]> = new Map();

    addNode(gameId: string, node: Computer) {
        if (!this.nodes.has(gameId)) {
            throw new GameNotFoundError(gameId);
        }

        this.nodes.get(gameId).push(node);
    }

    findNode(gameId: string, ipAddress: string): (Computer | undefined) {
        if (!this.nodes.has(gameId)) {
            throw new GameNotFoundError(gameId);
        }

        return this.nodes.get(gameId).find(node => node.ip === ipAddress);
    };

    findNodeByHostname(gameId: string, hostname: string): Computer | undefined {
        if (!this.nodes.has(gameId)) {
            throw new GameNotFoundError(gameId);
        }

        return this.nodes.get(gameId).find(node => node.hostname === hostname);
    }

    clearNodes(gameId: string) {
        if (!this.nodes.has(gameId)) {
            throw new GameNotFoundError(gameId);
        }

        this.nodes.set(gameId, []);
    }

    initializeGame(gameId: string) {
        this.nodes.set(gameId, []);
    }
}
