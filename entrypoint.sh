#!/bin/sh

# Generate API Documentation
npm run apidocs

exec "$@"
