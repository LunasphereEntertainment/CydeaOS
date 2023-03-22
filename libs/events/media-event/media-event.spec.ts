import { MediaEvent, MediaEventType } from './media-event';

describe('MediaEvent', () => {
  it('should be defined', () => {
    expect(new MediaEvent(
        MediaEventType.GetCurrentTrack,
        null,
    )).toBeDefined();
  });
});
