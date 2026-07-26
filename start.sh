#!/bin/sh
set -e

echo "Running database migrations..."
echo "DATABASE_URL is set: $([ -n "$DATABASE_URL" ] && echo 'yes' || echo 'no')"
npx drizzle-kit push --config=drizzle.config.mjs

echo "Starting application..."
exec node server.js
