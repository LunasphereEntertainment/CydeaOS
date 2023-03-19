import { v4 as uuidv4 } from 'uuid';
import { Player } from '../player/player';
import { IPGenerator } from '../ip-generator/ip-generator';
import { GameConfiguration } from '../game-configuration/game-configuration';

export class GameObject {
    id: string;

    readonly config: GameConfiguration;

    players: Player[] = [];

    state: GameState = GameState.WaitingForPlayers;

    public readonly ipGenerator: IPGenerator;

    constructor(config: GameConfiguration) {
        this.id = uuidv4();

        this.ipGenerator = new IPGenerator(config.ipType);

        this.config = config
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

    start() {
        if (this.state !== GameState.WaitingForPlayers) {
            throw new Error(`Game(id: ${this.id}) is already running/finished.`);
        }

        this.state = GameState.Running;
    }

    stop() {
        if (this.state === GameState.Stopped) {
            throw new Error(`Game(id: ${this.id}) is already stopped`);
        }

        this.state = GameState.Stopped;
    }
}


export enum GameState {
    WaitingForPlayers,
    Running,
    Stopped
}
