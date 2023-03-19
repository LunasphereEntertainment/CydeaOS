import { CliRunner } from "../cli.runner";
import { CliCommand } from "../cli-command";
import { Computer } from "../../nodes/computer/computer";

export class NmapCommand implements CliRunner {
    static executable = "nmap";

    execute(command: CliCommand, target?: Computer): Promise<string> {
        const nmapPortList = target.listPorts().map(port => `${port.port}/tcp\t\t${port.isOpen ? 'open' : 'closed'}\tunknown`); // TODO: ${port.service}

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
