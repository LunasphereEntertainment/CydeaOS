import { MediaError, MediaLibrary } from './media-library';
import { MediaEntry, MediaGenre } from './media.entry/media.entry';

describe('MediaLibrary', () => {
  it('should be defined', () => {
    expect(new MediaLibrary()).toBeDefined();
  });

  it('should add a media entry', () => {
    const mediaLibrary = new MediaLibrary();
    const mediaEntry = new MediaEntry('test', MediaGenre.Chill);
    mediaLibrary.addMediaEntry(mediaEntry);
    expect(mediaLibrary.getTrack(mediaEntry.uuid)).toBe(mediaEntry);
  });

  it('should throw an error when adding a duplicate media entry', () => {
    const mediaLibrary = new MediaLibrary();
    const mediaEntry = new MediaEntry('test', MediaGenre.Chill);
    mediaLibrary.addMediaEntry(mediaEntry);
    expect(() => mediaLibrary.addMediaEntry(mediaEntry)).toThrowError(MediaError);
  });
});
