# !/bin/bash

xclip -o -selection clipboard | while IFS=':' read -r key value || [ -n "$key" ]; do
  # Skip lines without a colon
  [ -z "$value" ] && continue

  key=$(echo "$key" | xargs)     # Trim spaces
  value=$(echo "$value" | xargs) # Trim spaces

  echo "exporting $key with value: $value"
  export "$key=$value"
done
