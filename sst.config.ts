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
        const web = await import('./infra/web');

        return {
            region: aws.getRegionOutput().name,
            notesTableName: storage.notesTable.name,
            billingTableName: storage.billingTable.name,
            apiUrl: api.api.url,
            webUrl: web.frontend.url,
            authUserPoolId: auth.userPool.id,
            authIdentityPoolId: auth.identityPool.id,
            authUserPoolClientId: auth.userPoolClient.id,
        };
    },
});
