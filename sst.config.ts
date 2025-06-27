/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: 'notes',
            removal: input?.stage === 'production' ? 'retain' : 'remove',
            protect: ['production'].includes(input?.stage),
            home: 'aws',
        };
    },
    async run() {
        const storage = await import('./infra/storage');
        const api = await import('./infra/api');
        const auth = await import('./infra/auth');

        return {
            region: aws.getRegionOutput().name,
            storageName: storage.table.name,
            storageArn: storage.table.arn,
            apiUrl: api.api.url,
            authUserPoolId: auth.userPool.id,
            authIdentityPoolId: auth.identityPool.id,
            authUserPoolClientId: auth.userPoolClient.id,
        };
    },
});
