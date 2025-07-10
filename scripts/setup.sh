#!/bin/bash
set -e

echo "🛠️  AIBOS Engine Setup"
echo "======================"

# Check prerequisites
check_command() {
  command -v $1 >/dev/null 2>&1 || {
    echo "❌ $1 is required but not installed"
    exit 1
  }
}

check_command node
check_command npm
check_command docker

# Environment setup
if [ ! -f .env ]; then
  echo "📝 Creating .env from template..."
  cp env.example .env
  echo "⚠️  Please configure your .env file before continuing"
  echo "   Key variables to set:"
  echo "   - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME"
  echo "   - JWT_SECRET"
  echo "   - REDIS_URL"
  exit 1
fi

# Load environment variables
source .env

# Install dependencies
echo "📦 Installing dependencies..."
npm install --workspaces

# Type checking
echo "🔍 Type checking..."
npm run type-check

# Build packages
echo "🏗️  Building packages..."
npm run build

# Database setup
echo "🗄️  Starting database container..."
if [ ! "$(docker ps -q -f name=postgres)" ]; then
  docker-compose -f docker-compose.db.yml up -d
  echo "⏳ Waiting for database to be ready..."
  sleep 10
else
  echo "✅ Database container already running"
fi

# Run migrations (if they exist)
if [ -d "packages/database/migrations" ]; then
  echo "🔄 Running migrations..."
  npm run db:migrate
fi

# Seed data (if it exists)
if [ -d "packages/database/seeds" ]; then
  echo "🌱 Seeding initial data..."
  npm run db:seed
fi

echo "✅ Setup complete!"
echo "🚀 Start developing with: npm run dev"
echo "📊 Monitor with: npm run metrics" 