import { Computer } from '../computer/computer';
import { Account } from '../../luna-models/account';

export class Player {
    id: number;
    displayName: string;
    state: PlayerState;
    private ip: string;

    private socket: string;

    constructor(id: number, displayName: string, state: PlayerState = PlayerState.InGame, ip?: string) {
        this.id = id;
        this.displayName = displayName;
        this.state = state;

        if (ip)
            this.ip = ip;
    }

    static fromAccount(account: Account) {
        return new Player(account.id, account.username);
    }

    setIP(ip: string) {
        this.ip = ip;
    }

    getIP() {
        return this.ip;
    }

    setSocket(socket: string) {
        this.socket = socket;
    }

    getSocket() {
        return this.socket;
    }

    isOnline() {
        return this.state === PlayerState.Online || this.state === PlayerState.InGame;
    }
}

export enum PlayerState {
    Offline,
    Online,
    InGame

}
