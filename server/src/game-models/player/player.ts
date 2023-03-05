import { Computer } from "../computer/computer";

export class Player {
    id: number;
    name: string;
    computer: Computer;
    state: PlayerState;

    private socket: string;

    constructor(id: number, name: string, home: Computer, state: PlayerState = PlayerState.InGame) {
        this.id = id;
        this.name = name;
        this.computer = home;
        this.state = state;
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
