#!/bin/bash
set -e

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🔨 Building React app..."
npm run build

echo "✅ Frontend build complete!"
echo "📁 Output in: frontend/dist"
