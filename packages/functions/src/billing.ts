import * as uuid from 'uuid';
import { Resource } from 'sst';
import * as Util from '@notes/core/util';
import * as Billing from '@notes/core/billing';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    // TODO: Move to a util
    const userId = event.requestContext.authorizer?.iam.cognitoIdentity.identityId;
    const { storage, source } = JSON.parse(event.body || '{}');
    const amount = Billing.compute(storage);
    const description = 'Scratch charge';
    const currency = 'usd';

    // TODO: Move to a util
    const params = {
        TableName: Resource.Billing.name,
        Item: {
            userId,
            transactionId: uuid.v1(),
            source,
            amount,
            description,
            currency,
        },
    };

    await dynamoDb.send(new PutCommand(params));

    return JSON.stringify({ status: true });
});
