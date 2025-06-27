import * as uuid from 'uuid';
import * as Util from '@notes/core/util';
import { addNoteItem } from '@notes/core/repositories';

export const main = Util.handler(async (event) => {
    const userId = Util.getUserId(event);
    let data = {
        content: '',
        attachment: '',
    };
    if (event.body != null) {
        data = JSON.parse(event.body);
    }

    const item = {
        userId,
        noteId: uuid.v1(),
        content: data.content,
        attachment: data.attachment,
        createdAt: Date.now(),
    };

    await addNoteItem(item);

    return JSON.stringify(item);
});
