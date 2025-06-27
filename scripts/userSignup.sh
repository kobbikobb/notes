# !/bin/bash

# Exit if any variable is unset
: "${region:?}"
: "${authUserPoolClientId:?}"
: "${authUserPoolId:?}"
: "${username:?}"
: "${password:?}"

# Sign up the user
aws cognito-idp sign-up \
--region "$region" \
--client-id "$authUserPoolClientId" \
--username "$username" \
--password "$password"

# Confirm the user signup as admin
aws cognito-idp admin-confirm-sign-up \
--region "$region" \
--user-pool-id "$authUserPoolId" \
--username "$username"
