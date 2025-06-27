import * as Util from '@notes/core/util';
import { getNoteItem } from '@notes/core/repositories';

export const main = Util.handler(async (event) => {
    const userId = Util.getUserId(event);

    const noteId = event?.pathParameters?.id;
    if (!noteId) {
        throw new Error('Note ID is required.');
    }

    const item = getNoteItem(userId, noteId);

    return JSON.stringify(item);
});
