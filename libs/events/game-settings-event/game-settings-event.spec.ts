import { GameSettingsEvent, GameSettingsEventType } from './game-settings-event';

describe('GameSettingsEvent', () => {
  it('should be defined', () => {
    expect(new GameSettingsEvent(GameSettingsEventType.Load)).toBeDefined();
  });
});
