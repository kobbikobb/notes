# !/bin/bash

# Exit if any variable is unset
: "${authUserPoolId:?}"
: "${authUserPoolClientId:?}"
: "${region:?}"
: "${authIdentityPoolId:?}"
: "${apiUrl:?}"
: "${username:?}"
: "${password:?}"

# Post Billing
npx aws-api-gateway-cli-test \
--username="$username" \
--password="$password" \
--user-pool-id="$authUserPoolId" \
--app-client-id="$authUserPoolClientId" \
--cognito-region="$region" \
--identity-pool-id="$authIdentityPoolId" \
--invoke-url="$apiUrl" \
--method="POST" \
--body='{"source":"tok_visa","storage":21}'
