const maxRetries = 3;

function generateIPv4(): string {
    const octets: string[] = [];
    for (let i = 0; i < 4; i++) {
        octets.push(Math.floor(Math.random() * 256).toString());
    }
    return octets.join('.');
}

function generateIPv6(): string {
    const octets: string[] = [];
    for (let i = 0; i < 8; i++) {
        octets.push(Math.floor(Math.random() * 65536).toString(16));
    }
    return octets.join(':');
}

export class IPGenerator {
    private readonly type: IPType;
    private readonly generatedIPs: Set<string> = new Set();

    constructor(type: IPType = IPType.IPv4) {
        this.type = type;

        if (this.type !== IPType.IPv4 && this.type !== IPType.IPv6) {
            throw new Error('Invalid IP type');
        }
    }

    generate() {
        let ip: string;

        for (let i = 0; i < maxRetries; i++) {
            switch (this.type) {
                case IPType.IPv4:
                    ip = generateIPv4();
                    break
                case IPType.IPv6:
                    ip = generateIPv6();
                    break;
                default:
                    throw new Error('Invalid IP type');
            }

            if (!this.generatedIPs.has(ip)) {
                this.generatedIPs.add(ip);
                return ip;
            }
        }

        throw new Error('Could not generate IP');
    }
}

export class IPType {
    static IPv4 = 'IPv4';
    static IPv6 = 'IPv6';
}
