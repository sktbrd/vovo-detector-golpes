#!/bin/bash
# Quick GA4 API Setup

set -e

echo "🚀 Installing Google Analytics Data API..."
cd "$(dirname "$0")/.."

# Install dependency
pnpm add @google-analytics/data dotenv

echo ""
echo "✅ Package installed!"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Follow the guide: scripts/GA4_SETUP.md"
echo "   (Create service account, download JSON, add to GA4)"
echo ""
echo "2. Move credentials file:"
echo "   mv ~/Downloads/your-service-account-*.json ./ga4-credentials.json"
echo ""
echo "3. Add to .env.local:"
echo "   GA4_PROPERTY_ID=529648976"
echo "   GOOGLE_APPLICATION_CREDENTIALS=./ga4-credentials.json"
echo ""
echo "4. Test it:"
echo "   node scripts/check-ga4-traffic.js"
echo ""
