export class GameNotFoundError extends Error {
    constructor(id: string) {
        super(`Game with id ${id} not found`);
    }
}
