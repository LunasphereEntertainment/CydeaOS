export abstract class GameEvent {
    category: GameEventCategory;
    gameCode?: string;

    protected constructor(category: GameEventCategory) {
        this.category = category;
    }
}

export enum GameEventCategory {
    GameManagement= "game-management",
    Network = "network",
    File = "file",
    Command = "command",
    Music = "music",
    Settings = "settings",
    Chat = "chat",
    Player = "player",
    CoreSystem = "core-system",
}