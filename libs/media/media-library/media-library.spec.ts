import { MediaLibrary } from './media-library';
import { MediaMood } from "../media-mood/media-mood";
import { MediaError } from "../../../server/src/errors/media-error/media.error";
import { MediaEntry } from "../media-entry/media-entry";

describe('MediaLibrary', () => {
  it('should be defined', () => {
    expect(new MediaLibrary()).toBeDefined();
  });

  it('should add a media entry', () => {
    const mediaLibrary = new MediaLibrary();
    const mediaEntry = new MediaEntry('test', MediaMood.Chill);
    mediaLibrary.addMediaEntry(mediaEntry);
    expect(mediaLibrary.getTrack(mediaEntry.uuid)).toBe(mediaEntry);
  });

  it('should throw an error when adding a duplicate media entry', () => {
    const mediaLibrary = new MediaLibrary();
    const mediaEntry = new MediaEntry('test', MediaMood.Chill);
    mediaLibrary.addMediaEntry(mediaEntry);
    expect(() => mediaLibrary.addMediaEntry(mediaEntry)).toThrowError(MediaError);
  });
});
