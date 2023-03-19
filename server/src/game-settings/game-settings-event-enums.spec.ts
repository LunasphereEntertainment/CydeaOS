import { GameSettingsEvent, GameSettingsEventType } from './game-settings-event-enums';

describe('GameSettingsEvent', () => {
  it('should be defined', () => {
    expect(new GameSettingsEvent(GameSettingsEventType.Load)).toBeDefined();
  });
});
