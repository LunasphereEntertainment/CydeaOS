import { Account } from '../../server/src/luna-models/account';

export class Player {
    id: number;
    username: string;
    state: PlayerState;
    private socketId: string;

    constructor(id: number, username: string, state: PlayerState = PlayerState.Online) {
        this.id = id;
        this.username = username;
        this.state = state;
    }

    static fromAccount(account: Account) {
        return new Player(account.id, account.username);
    }

    getSocketId(): string {
        return this.socketId;
    }

    // only allow setting the socket id once
    setSocketId(socketId: string) {
        // if (this.socketId) {
        //     throw new Error('Socket id already set');
        // }
        this.socketId = socketId;
    }

    isOnline() {
        return this.state !== PlayerState.Offline;
    }
}

export enum PlayerState {
    Offline,
    Online,
    InGame

}
