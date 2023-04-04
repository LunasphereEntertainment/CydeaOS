import { CliRunner } from "../cli.runner";
import { CliCommand } from "../cli-command";
import { Computer } from "../../nodes/computer/computer";

export class NmapCommand implements CliRunner {
    static executable = "nmap";

    execute(command: CliCommand, target?: Computer): Promise<string> {
        const nmapPortList = target.daemons.map(daemon => {
            const portList = daemon.ports;
            return portList.map(port => {
                let openStr = port.isOpen() ? "open" : "closed";
                return `${port.port}/tcp\t\t${openStr}\t${daemon.name}`;
            })
        });

        const sysTime = new Date();
        const sysTimeStr = `${sysTime.getFullYear()}-${sysTime.getMonth() + 1}-${sysTime.getDate()} ${sysTime.getHours()}:${sysTime.getMinutes()} UTC`;

        return Promise.resolve(
            `Starting Nmap 7.70 ( https://nmap.org ) at ${sysTimeStr}\n
            Nmap scan report for ${target.ip}\n
            Host is up (0.00040s latency).\n
            
            PORT\t\tSTATE\tSERVICE\n
            ${nmapPortList.join("\n")}\n`
        );
    }
}
