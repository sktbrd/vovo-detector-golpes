#!/bin/bash

echo "🔍 Checking Google Indexation Status..."
echo ""

# Site operator search
SITE_URL="detectordegolpes.com.br"
TOTAL_PAGES=$(curl -sL "https://$SITE_URL/sitemap.xml" | grep -c '<loc>')

echo "📊 Sitemap Pages: $TOTAL_PAGES"
echo ""
echo "✅ To check indexed pages:"
echo "   1. Open: https://www.google.com/search?q=site:$SITE_URL"
echo "   2. Count results manually (Google shows total)"
echo ""
echo "📈 Or use Search Console:"
echo "   https://search.google.com/search-console?resource_id=sc-domain:$SITE_URL"
echo ""
echo "🎯 Goal: Get all $TOTAL_PAGES pages indexed within 7 days"
