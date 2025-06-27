import { Resource } from 'sst';
import * as Util from '@notes/core/util';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { UpdateCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const main = Util.handler(async (event) => {
    const data = JSON.parse(event.body || '{}');
    const userId = event.requestContext.authorizer?.iam.cognitoIdentity.identityId;

    const params = {
        TableName: Resource.Notes.name,
        Key: {
            userId,
            noteId: event?.pathParameters?.id,
        },
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ':attachment': data.attachment || null,
            ':content': data.content || null,
        },
    };

    await dynamoDb.send(new UpdateCommand(params));

    return JSON.stringify({ status: true });
});
