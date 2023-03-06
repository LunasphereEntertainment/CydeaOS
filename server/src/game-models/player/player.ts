import { Computer } from '../computer/computer';

export class Player {
    id: number;
    displayName: string;
    state: PlayerState;
    private computer: Computer;

    private socket: string;

    constructor(id: number, displayName: string, state: PlayerState = PlayerState.InGame) {
        this.id = id;
        this.displayName = displayName;
        this.state = state;
    }

    setComputer(computer: Computer) {
        this.computer = computer;
    }

    getComputer() {
        return this.computer;
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
