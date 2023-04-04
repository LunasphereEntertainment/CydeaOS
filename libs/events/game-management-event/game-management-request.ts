import { GameConfiguration } from '../../game-configuration/game-configuration';

export interface GameManagementRequest {
    config?: GameConfiguration;

    gameCode?: string;
}
