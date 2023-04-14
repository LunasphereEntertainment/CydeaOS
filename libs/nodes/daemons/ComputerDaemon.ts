import { NetworkPort } from "../../network-port/network.port";
import { NetworkPacketType } from '../networking/packet';
import { Computer } from '../computer/computer';

export abstract class ComputerDaemon {
    supportedPacketType: NetworkPacketType;
    online: boolean = true;
    ports: NetworkPort[];
    protected _computer: Computer;

    protected constructor(computer: Computer, supportedPacketType: NetworkPacketType, overridePort: number = 0) {
        this._computer = computer;
        this.supportedPacketType = supportedPacketType;

        this.ports = [
            new NetworkPort(overridePort, false)
        ]
    }

    abstract handleRequest(data: any): any;
}
