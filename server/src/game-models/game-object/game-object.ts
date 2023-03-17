import { Computer } from '../computer/computer';
import { v4 as uuidv4 } from 'uuid'
import { Player } from '../player/player';
import { IPGenerator, IPType } from '../../game/ip-generator/ip-generator';
import { GameConfiguration } from '../game-configuration/game-configuration';

export class GameObject {
    id: string;

    config: GameConfiguration;

    players: Player[] = [];

    public readonly ipGenerator: IPGenerator;

    constructor(config: GameConfiguration) {
        this.id = uuidv4();

        this.ipGenerator = new IPGenerator(config.ipType);
    }

    join(player: Player) {
        this.players.push(player);
    }

    findPlayerByUsername(username: string): Player | undefined {
        return this.players.find(player => player.username === username);
    }

    findPlayerBySocketId(socketId: string): Player | undefined {
        return this.players.find(player => player.getSocketId() === socketId);
    }
}

