import { NotFoundException } from '@nestjs/common';

export class IPNotFoundError extends NotFoundException {
    constructor(ip: string) {
        super(`IP ${ ip } could be found.`);
    }
}

export class HostnameNotFoundError extends NotFoundException {
    constructor(hostname: string) {
        super(`Hostname ${ hostname } could not be found.`);
    }
}