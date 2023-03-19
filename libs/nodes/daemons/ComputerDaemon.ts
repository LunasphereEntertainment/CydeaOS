import { NetworkPort } from "../../network-port/network.port";

export interface ComputerDaemon {
    name: string;
    ports: NetworkPort[];

    online: boolean;

    handleRequest(data: any): any;
}
