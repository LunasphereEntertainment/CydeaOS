import { MediaEvent, MediaEventType } from './media-event';
import { MediaMood } from '../../media/media-mood/media-mood';

describe('MediaEvent', () => {
  it('should be defined', () => {
    expect(new MediaEvent(
        MediaEventType.GetCurrentTrack,
        MediaMood.MainMenu
    )).toBeDefined();
  });
});
