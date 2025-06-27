import { Resource } from 'sst';
import {
    PutCommand,
    GetCommand,
    QueryCommand,
    DynamoDBDocumentClient,
    DeleteCommand,
    UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

type BillingItem = {
    userId: string;
    transactionId: string;
    source: string;
    amount: number;
    description: string;
    currency: string;
};

type NoteItem = {
    userId: string;
    noteId: string;
    content: string;
    attachment?: string;
    createdAt: number;
};

type NoteItemUpdate = {
    userId: string;
    noteId: string;
    content: string;
    attachment?: string;
};

export async function addBillingItem(item: BillingItem): Promise<void> {
    const params = {
        TableName: Resource.Billing.name,
        Item: item,
    };
    await dynamoDb.send(new PutCommand(params));
}

export async function addNoteItem(item: NoteItem): Promise<void> {
    const params = {
        TableName: Resource.Notes.name,
        Item: item,
    };

    await dynamoDb.send(new PutCommand(params));
}

export async function deleteNoteItem(userId: string, noteId: string): Promise<void> {
    const params = {
        TableName: Resource.Notes.name,
        Key: {
            userId,
            noteId,
        },
    };

    await dynamoDb.send(new DeleteCommand(params));
}

export async function getNoteItem(userId: string, noteId: string): Promise<NoteItem> {
    const params = {
        TableName: Resource.Notes.name,
        Key: {
            userId,
            noteId,
        },
    };

    const result = await dynamoDb.send(new GetCommand(params));
    if (!result.Item) {
        throw new Error('Item not found.');
    }
    return result.Item as NoteItem;
}

export async function getNoteItems(userId: string): Promise<NoteItem[]> {
    const params = {
        TableName: Resource.Notes.name,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId,
        },
    };

    const result = await dynamoDb.send(new QueryCommand(params));

    return result.Items as NoteItem[];
}

export async function updateNoteItem(item: NoteItemUpdate): Promise<void> {
    const params = {
        TableName: Resource.Notes.name,
        Key: {
            userId: item.userId,
            noteId: item.noteId,
        },
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ':attachment': item.attachment || null,
            ':content': item.content,
        },
    };

    await dynamoDb.send(new UpdateCommand(params));
}
