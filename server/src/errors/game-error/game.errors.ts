import { NotFoundException } from '@nestjs/common';

export class GameNotFoundError extends NotFoundException {
    constructor(id: string) {
        super(`Game with id ${ id } not found`);
    }
}
