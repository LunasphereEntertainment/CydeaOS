import { Player, PlayerState } from '../player/player';
import { GameConfiguration } from '../game-configuration/game-configuration';
import { Account } from '../luna/account';

export class GameObject {
    gameCode: string;

    readonly config: GameConfiguration;

    players: Player[] = [];

    state: GameState = GameState.WaitingForPlayers;

    readonly host: Account
    private hostSocketId?: string;

    // public readonly ipGenerator: IPGenerator;

    constructor(gameCode: string, config: GameConfiguration, host: Account) {
        this.gameCode = gameCode;

        this.config = config

        this.host = host;
    }

    join(player: Player) {
        this.players.push(player);
    }

    leave(player: Player) {
        const i = this.players.findIndex(p => p.username === player.username);
        if (i < 0) {
            console.warn(`Player ${player.username} is not in game ${this.gameCode}.`)
            return;
        }

        switch (this.state) {
            case GameState.WaitingForPlayers:
                this.players.splice(i, 1);
                break;
            case GameState.Running:
                this.players[i].state = PlayerState.Disconnected;
                break
        }
    }

    findPlayerByUsername(username: string): Player | undefined {
        return this.players.find(player => player.username === username);
    }

    /** @deprecated
     * Use findPlayerBySocketId instead
     * @param socketId
     */
    findPlayerBySocketId(socketId: string): Player | undefined {
        return this.players.find(player => player.getSocketId() === socketId);
    }

    getHostSocketId(): string {
        return this.hostSocketId!;
    }

    setHostSocketId(socketId: string) {
        this.hostSocketId = socketId;
    }

    start() {
        if (this.state !== GameState.WaitingForPlayers) {
            throw new Error(`Game(id: ${this.gameCode}) is already running/finished.`);
        }

        this.state = GameState.Running;
    }

    stop() {
        if (this.state === GameState.Stopped) {
            throw new Error(`Game(id: ${this.gameCode}) is already stopped`);
        }

        this.state = GameState.Stopped;
    }

    toJSON() {
        const { gameCode, config, players, state } = this;
        return {
            gameCode,
            config,
            players,
            state
        }
    }
}


export enum GameState {
    WaitingForPlayers,
    Running,
    Stopped
}
