#!/usr/bin/env node
/**
 * Google Analytics 4 Traffic Checker
 * 
 * Pulls traffic data from GA4 API and displays current stats
 * 
 * Setup: See GA4_SETUP.md
 * Usage: node scripts/check-ga4-traffic.js
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const PROPERTY_ID = process.env.GA4_PROPERTY_ID || '529648976';
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || './ga4-credentials.json';

async function getTrafficData() {
  try {
    // Initialize client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: path.join(__dirname, '..', CREDENTIALS_PATH)
    });

    console.log('🔍 Fetching GA4 data...\n');

    // Request: Last 7 days traffic
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'date',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'screenPageViews',
        },
        {
          name: 'sessions',
        },
      ],
    });

    // Parse results
    const rows = response.rows || [];
    let totalUsers = 0;
    let totalPageviews = 0;
    let totalSessions = 0;
    const dailyData = [];

    rows.forEach(row => {
      const date = row.dimensionValues[0].value;
      const users = parseInt(row.metricValues[0].value);
      const pageviews = parseInt(row.metricValues[1].value);
      const sessions = parseInt(row.metricValues[2].value);

      totalUsers += users;
      totalPageviews += pageviews;
      totalSessions += sessions;

      dailyData.push({
        date: formatDate(date),
        users,
        pageviews,
        sessions
      });
    });

    // Get top pages
    const [pagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'screenPageViews',
          },
          desc: true,
        },
      ],
      limit: 10,
    });

    const topPages = (pagesResponse.rows || []).map(row => ({
      path: row.dimensionValues[0].value,
      pageviews: parseInt(row.metricValues[0].value)
    }));

    // Display results
    console.log('📊 TRAFFIC SUMMARY (Last 7 Days)\n');
    console.log('═══════════════════════════════════════');
    console.log(`Total Users:      ${totalUsers.toLocaleString()}`);
    console.log(`Total Pageviews:  ${totalPageviews.toLocaleString()}`);
    console.log(`Total Sessions:   ${totalSessions.toLocaleString()}`);
    console.log(`Avg Users/Day:    ${Math.round(totalUsers / 7).toLocaleString()}`);
    console.log(`Avg Pageviews/Day: ${Math.round(totalPageviews / 7).toLocaleString()}`);
    console.log('═══════════════════════════════════════\n');

    console.log('📅 DAILY BREAKDOWN\n');
    dailyData.forEach(day => {
      const bar = '█'.repeat(Math.min(day.users, 50));
      console.log(`${day.date}  ${day.users.toString().padStart(4)} users  ${bar}`);
    });

    console.log('\n📄 TOP 10 PAGES\n');
    topPages.forEach((page, index) => {
      const truncated = page.path.length > 50 
        ? page.path.substring(0, 47) + '...'
        : page.path;
      console.log(`${(index + 1).toString().padStart(2)}. ${truncated.padEnd(50)} ${page.pageviews.toString().padStart(5)} views`);
    });

    // Save to JSON
    const reportData = {
      timestamp: new Date().toISOString(),
      period: 'last_7_days',
      summary: {
        totalUsers,
        totalPageviews,
        totalSessions,
        avgUsersPerDay: Math.round(totalUsers / 7),
        avgPageviewsPerDay: Math.round(totalPageviews / 7)
      },
      daily: dailyData,
      topPages
    };

    const reportPath = path.join(__dirname, '..', 'automation', 'data', 'reports', `ga4-${getDateString()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n💾 Report saved: ${reportPath}\n`);

    // Check if we're on track for 80/day goal
    const avgDaily = Math.round(totalUsers / 7);
    const target = 80;
    const progress = Math.round((avgDaily / target) * 100);

    console.log('🎯 PROGRESS TO GOAL\n');
    console.log(`Current:  ${avgDaily} users/day`);
    console.log(`Target:   ${target} users/day`);
    console.log(`Progress: ${progress}% ${progress >= 100 ? '🎉' : progress >= 50 ? '📈' : '🚀'}`);
    
    if (avgDaily >= target) {
      console.log('\n✅ READY FOR ADSENSE APPLICATION!\n');
    } else {
      const daysLeft = Math.ceil((target - avgDaily) / (avgDaily / 7));
      console.log(`\n📅 Estimated ${daysLeft} days to reach goal (at current growth rate)\n`);
    }

  } catch (error) {
    console.error('❌ Error fetching GA4 data:', error.message);
    
    if (error.message.includes('ENOENT')) {
      console.log('\n⚠️  Credentials file not found!');
      console.log('📖 Follow setup guide: scripts/GA4_SETUP.md\n');
    } else if (error.message.includes('PERMISSION_DENIED')) {
      console.log('\n⚠️  Service account doesn\'t have access to GA4 property!');
      console.log('📖 Step 4 in setup guide: Add service account email to GA4\n');
    }
    
    process.exit(1);
  }
}

function formatDate(yyyymmdd) {
  const year = yyyymmdd.substring(0, 4);
  const month = yyyymmdd.substring(4, 6);
  const day = yyyymmdd.substring(6, 8);
  return `${year}-${month}-${day}`;
}

function getDateString() {
  return new Date().toISOString().split('T')[0];
}

// Run
getTrafficData();
