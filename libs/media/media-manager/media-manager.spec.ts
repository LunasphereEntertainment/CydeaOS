import { MediaManager } from './media-manager';
import { MediaLibrary } from '../media-library/media-library';

describe('MediaManager', () => {
  it('should be defined', () => {
    expect(new MediaManager(
        new MediaLibrary(),
    )).toBeDefined();
  });
});
