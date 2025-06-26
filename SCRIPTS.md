# Scripts

# Define variables

COGNITO_REGION="us-east-1"
USER_POOL_ID=""
USER_POOL_CLIENT_ID=""
USERNAME=""
PASSWORD=""

# Sign up the user

aws cognito-idp sign-up \
 --region "$COGNITO_REGION" \
  --client-id "$USER_POOL_CLIENT_ID" \
 --username "$USERNAME" \
  --password "$PASSWORD"

# Confirm the user signup as admin

aws cognito-idp admin-confirm-sign-up \
 --region "$COGNITO_REGION" \
  --user-pool-id "$USER_POOL_ID" \
 --username "$USERNAME"
