import { Computer } from '../computer/computer';
import { v4 as uuidv4 } from 'uuid'
import { DnsService, DnsServiceImpl } from '../dns-server/dns-service-impl';
import { Player } from '../player/player';
import { IPGenerator, IPType } from '../../game/ip-generator/ip-generator';
import { MediaGenre } from '../../media/media.entry/media.entry';
import { MediaQueue } from '../../media/media-library';
import { GameConfiguration } from '../game-configuration/game-configuration';

export class GameObject implements DnsService {
    id: string;

    config: GameConfiguration;

    dns: DnsServiceImpl

    nodesByIP: Map<string, Computer>

    players: Player[] = [];

    public readonly ipGenerator: IPGenerator;

    constructor(dns?: DnsServiceImpl, nodesByIP?: Map<string, Computer>, ipType?: IPType) {
        this.id = uuidv4();
        this.dns = dns || new DnsServiceImpl();
        this.nodesByIP = nodesByIP || new Map();

        this.ipGenerator = new IPGenerator(ipType);
    }

    static fromConfig(config: GameConfiguration): GameObject {
        const gameObject = new GameObject(null, null, config.ipType);
        gameObject.config = config;
        return gameObject;
    }

    join(player: Player) {
        this.players.push(player);
    }

    registerNode(node: Computer) {
        this.nodesByIP.set(node.ip, node);
        this.dns.set(node.hostname, node.ip);
    }

    getNodeByIP(ip: string): Computer {
        return this.nodesByIP.get(ip);
    }

    lookup(hostname: string): string {
        let ip = this.dns.get(hostname);

        return this.dns.lookup(hostname);
    }

    findNodeByHostname(hostname: string): Computer {
        return this.getNodeByIP(this.dns.lookup(hostname));
    }
}

