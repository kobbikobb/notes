import * as Util from '@notes/core/util';
import { updateNoteItem } from '@notes/core/repositories';

export const main = Util.handler(async (event) => {
    const userId = Util.getUserId(event);
    const noteId = event?.pathParameters?.id;
    if (!noteId) {
        throw new Error('Note ID is required.');
    }
    const data = JSON.parse(event.body || '{}');

    await updateNoteItem({ userId, noteId, ...data });

    return JSON.stringify({ status: true });
});
