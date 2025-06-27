export const bucket = new sst.aws.Bucket('Uploads');

export const notesTable = new sst.aws.Dynamo('Notes', {
    fields: {
        userId: 'string',
        noteId: 'string',
    },
    primaryIndex: { hashKey: 'userId', rangeKey: 'noteId' },
});

export const billingTable = new sst.aws.Dynamo('Billing', {
    fields: {
        userId: 'string',
        transactionId: 'string',
    },
    primaryIndex: { hashKey: 'userId', rangeKey: 'transactionId' },
});
