import * as Util from '@notes/core/util';
import { getNoteItems } from '@notes/core/repositories';

export const main = Util.handler(async (event) => {
    const userId = Util.getUserId(event);
    const items = await getNoteItems(userId);
    return JSON.stringify(items);
});
