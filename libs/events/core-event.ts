import { GameEvent, GameEventCategory } from './game-event';

export class CoreSystemEvent extends GameEvent {
    type: CoreEventType;
    message: string;

    constructor(type: CoreEventType, message: string) {
        super(GameEventCategory.CoreSystem)
        this.type = type;
        this.message = message;
    }
}

export enum CoreEventType {
    Success = "success",
    Error = "error",
}