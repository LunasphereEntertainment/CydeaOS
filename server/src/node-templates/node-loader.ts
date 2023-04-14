import { Computer } from '@cydeaos/libs/nodes/computer/computer';
import { readdir, readFile, stat } from 'fs/promises'
import { IFileEntry } from '@cydeaos/libs/nodes/file-system/i-file-entries';
import * as console from 'console';
import { FileSystemEmulation } from '@cydeaos/libs/nodes/file-system/file-system-emulation';
import { ComputerDaemon } from '@cydeaos/libs/nodes/daemons/ComputerDaemon';
import { SshServer } from '@cydeaos/libs/nodes/daemons/ssh-server/ssh-server';
import { DnsServer } from '@cydeaos/libs/nodes/daemons/dns-server/dns-server';
import { HttpServer } from '@cydeaos/libs/nodes/daemons/http-server/http-server';

interface ComputerDaemonTemplate {
    type: string;
    port: number;
}

interface ComputerTemplateDefinition {
    hostname: string;
    daemons: ComputerDaemonTemplate[]
    files: IFileEntry
}

export async function loadNode(path: string): Promise<Computer> {
    const rawData = await readFile(path, 'utf-8');
    const nodeData: ComputerTemplateDefinition = JSON.parse(rawData);
    // if any of the required fields are not present - throw an error
    if (!nodeData.hostname || !nodeData.daemons || !nodeData.files) {
        throw new Error('Node template is missing required fields.');
    }

    let fs = new FileSystemEmulation(nodeData.files),
        comp = new Computer(nodeData.hostname, fs);

    nodeData.daemons.forEach(daemonDef => {
        let daemon: ComputerDaemon | undefined;
        switch (daemonDef.type) {
            case 'ssh':
                daemon = new SshServer(comp, daemonDef.port);
                break;
            case 'dns':
                daemon = new DnsServer(comp, daemonDef.port);
                break;
            case 'http':
            case 'web':
                daemon = new HttpServer(comp, daemonDef.port);
                break;
            default:
                console.warn(`Unknown daemon type: ${ daemonDef.type }`);
        }
        if (daemon) {
            comp.daemons.push(daemon);
        }
    });

    return comp;
}

export async function loadNodes(path: string): Promise<Computer[]> {
    const entries = await readdir(path),
        nodes: Computer[] = [];

    for (let entry of entries) {
        if (entry.endsWith('.json')) {
            const node = await loadNode(path + '/' + entry);
            nodes.push(node);
            // console.debug("Loaded node: " + node.hostname + " services: " + node.daemons.length + " from " + path + "/" + entry);
            console.debug(`${ node.hostname }\tservices: ${ node.daemons.length }\n`);
        } else {
            const fileInfo = await stat(path + '/' + entry);
            if (fileInfo.isDirectory()) {
                const subNodes = await loadNodes(path + '/' + entry);
                nodes.push(...subNodes);
            }
        }
    }

    return nodes;
}
