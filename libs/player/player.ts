import { Account } from '../luna/account';

export class Player {
    id: number;
    username: string;
    state: PlayerState;
    private socketId?: string;
    private currentTarget?: string;

    constructor(id: number, username: string, state: PlayerState = PlayerState.Online) {
        this.id = id;
        this.username = username;
        this.state = state;
    }

    static fromAccount(account: Account) {
        return new Player(account.id, account.username);
    }

    getSocketId(): string {
        return this.socketId!;
    }

    // only allow setting the socket id once
    setSocketId(socketId: string) {
        // if (this.socketId) {
        //     throw new Error('Socket id already set');
        // }
        this.socketId = socketId;
    }

    getCurrentTarget(): string {
        return this.currentTarget!;
    }

    setCurrentTarget(target: string) {
        this.currentTarget = target;
    }

    isOnline() {
        return this.state >= PlayerState.Online;
    }
}

export enum PlayerState {
    Offline,
    Disconnected,
    Online,
    InGame

}
