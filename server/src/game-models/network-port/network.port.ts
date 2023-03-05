export class NetworkPort {
    port: number;
    open: boolean;

    constructor(port: number, open: boolean = false) {
        this.port = port;
        this.open = open;
    }

    openPort() {
        this.open = true;
    }

    closePort() {
        this.open = false;
    }

    isOpen() {
        return this.open;
    }
}
