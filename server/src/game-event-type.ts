export const enum GameChannels {
    GAME = 'game',
    NODES = 'nodes',
    MUSIC = 'music',
    CHAT = 'chat'
}

export class GameEventPayload {
    type: GameEventType;
    data: any;
}

export const enum GameEventType {
    GAME_CREATED = 'game-creation',
    GAME_JOINED = 'game-joined',
    GAME_STARTED = 'game-started',
    GAME_FINISHED = 'game-finished',
}