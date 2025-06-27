# !/bin/bash

# Exit if any variable is unset
: "${authUserPoolId:?}"
: "${authUserPoolClientId:?}"
: "${region:?}"
: "${authIdentityPoolId:?}"
: "${apiUrl:?}"
: "${username:?}"
: "${password:?}"

# Post billing information

npx aws-api-gateway-cli-test \
--username="$username" \
--password="$password" \
--user-pool-id="$authUserPoolId" \
--app-client-id="$authUserPoolClientId" \
--cognito-region="$region" \
--identity-pool-id="$authIdentityPoolId" \
--invoke-url="$apiUrl" \
--api-gateway-region="$region" \
--path-template="/billing" \
--method="POST" \
--body='{"source":"tok_visa","storage":21}'
