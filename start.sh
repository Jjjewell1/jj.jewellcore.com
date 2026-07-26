#!/bin/sh
set -e

echo "Running database migrations..."
npx drizzle-kit push --config=drizzle.config.mjs

echo "Starting application..."
exec node server.js
