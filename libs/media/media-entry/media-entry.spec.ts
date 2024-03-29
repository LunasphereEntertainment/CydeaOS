import { MediaEntry } from "./media-entry";
import { MediaMood } from "../media-mood/media-mood";

describe('MediaEntry', () => {
    it('should be defined', () => {
        expect(new MediaEntry('media/chill/test1.mp3')).toBeDefined();
        expect(new MediaEntry('media/chill/test2.mp3', MediaMood.Chill)).toBeDefined();
        expect(new MediaEntry('media/chill/test3.mp3', MediaMood.Chill, '1234')).toBeDefined();
    });

    it('should have a uuid', () => {
        expect(new MediaEntry('media/chill/test1.mp3').uuid).toBeDefined();
        expect(new MediaEntry('media/chill/test2.mp3', MediaMood.Chill).uuid).toBeDefined();
    });

    it('should have a path', () => {
        expect(new MediaEntry('media/chill/test1.mp3').path).toEqual('media/chill/test1.mp3');
    });

    it('should be able to copy itself', () => {
        const mediaEntry = new MediaEntry('media/chill/test1.mp3', MediaMood.Chill);
        const copy = MediaEntry.copy(mediaEntry);
        expect(copy).toBeDefined();
        expect(copy.uuid).toEqual(mediaEntry.uuid);
        expect(copy.path).toEqual(mediaEntry.path);
        expect(copy.name).toEqual(mediaEntry.name);
        expect(copy.mood).toEqual(mediaEntry.mood);

        // Make sure the copy is a new object
        expect(copy).not.toBe(mediaEntry); // not the same reference
        mediaEntry.name = 'something else';
        expect(copy.name).not.toEqual(mediaEntry.name);
    });
});
