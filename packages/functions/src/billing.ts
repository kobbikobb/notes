import * as uuid from 'uuid';
import * as Util from '@notes/core/util';
import * as Billing from '@notes/core/billing';
import { addBillingItem } from '@notes/core/repositories';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const main = Util.handler(async (event: APIGatewayProxyEvent) => {
    const userId = Util.getUserId(event);
    const { storage, source } = JSON.parse(event.body || '{}');
    const amount = Billing.compute(storage);
    const description = 'Scratch charge';
    const currency = 'usd';

    await addBillingItem({
        userId,
        transactionId: uuid.v1(),
        source,
        amount,
        description,
        currency,
    });

    return JSON.stringify({ status: true });
});
