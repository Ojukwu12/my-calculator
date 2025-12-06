#!/bin/bash
set -e

echo "📦 Installing and building frontend..."
cd frontend
npm install
npm run build

echo "✅ Build complete!"
cd ..
