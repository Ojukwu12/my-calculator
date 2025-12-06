#!/bin/bash
set -e

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "🔨 Building TypeScript..."
npm run build

echo "✅ Build complete!"
