import { MediaMood } from "../../../../libs/media/media-mood/media-mood";
import { InternalServerErrorException } from '@nestjs/common';

export class MediaError extends InternalServerErrorException {
    constructor(message: string) {
        super(message);
    }

    static entryNotFound(uuid: string): MediaError {
        return new MediaError(`MediaEntry with ${uuid} not found`);
    }

    static moodNotFound(mood: MediaMood): MediaError {
        return new MediaError(`MediaMood ${mood} not found`);
    }

    static queueEmpty(mood: MediaMood): MediaError {
        return new MediaError(`MediaQueue for mood ${mood} is empty`);
    }

    static duplicateEntry(uuid: string): MediaError {
        return new MediaError(`MediaEntry with uuid ${uuid} already exists`);
    }
}
