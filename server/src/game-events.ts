export const enum GameChannels {
    GAME = 'game',
    MUSIC = 'music',
    CHAT = 'chat'
}

export class EventMessagePayload {
    type: GameEvents;
    data: any;
}

export const enum GameEvents {
    GAME_CREATED = 'game-creation',
    GAME_JOINED = 'game-joined',
    GAME_STARTED = 'game-started',
    GAME_FINISHED = 'game-finished',
}