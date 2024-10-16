set -e

npm run supabase:start -- -x studio,migra,deno-relay,pgadmin-schema-diff,imgproxy &
docker run --add-host=host.docker.internal:host-gateway --rm -it --name=stripe -d stripe/stripe-cli:latest listen --forward-to http://host.docker.internal:3000/api/stripe/webhook --skip-verify --api-key "$STRIPE_SECRET_KEY" --log-level debug

if [ "$1" = "build" ]; then
  echo "Building and testing in production mode"
  NODE_ENV=test next build
  NODE_ENV=test next start &
else
  echo "Testing in development mode"
  npm run dev:test &
fi

npm run cypress:headless
npm run supabase:stop -- --no-backup
exit 0