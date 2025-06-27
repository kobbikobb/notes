import * as uuid from 'uuid';
import { Resource } from 'sst';
import * as Util from '@notes/core/util';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    const userId = event.requestContext.authorizer?.iam.cognitoIdentity.identityId;
    let data = {
        content: '',
        attachment: '',
    };
    if (event.body != null) {
        data = JSON.parse(event.body);
    }

    const params = {
        TableName: Resource.Notes.name,
        Item: {
            userId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now(),
        },
    };

    await dynamoDb.send(new PutCommand(params));

    return JSON.stringify(params.Item);
});
