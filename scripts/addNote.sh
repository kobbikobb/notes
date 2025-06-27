# !/bin/bash

# Exit if any variable is unset
: "${authUserPoolId:?}"
: "${authUserPoolClientId:?}"
: "${region:?}"
: "${authIdentityPoolId:?}"
: "${apiUrl:?}"
: "${username:?}"
: "${password:?}"

# Post note
npx aws-api-gateway-cli-test \
--user-pool-id="$authUserPoolId" \
--app-client-id="$authUserPoolClientId" \
--cognito-region="$region" \
--identity-pool-id="$authIdentityPoolId" \
--invoke-url="$apiUrl" \
--api-gateway-region="$region" \
--username="$username" \
--password="$password" \
--path-template="/notes" \
--method="POST" \
--body='{"content":"hello world","attachment":"hello.jpg"}'
