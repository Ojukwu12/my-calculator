#!/bin/bash
set -e

echo "🚀 Starting calculator server..."
cd backend
node dist/server.js
