#!/usr/bin/env node
/**
 * Simple GA4 auth test
 */

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const CREDENTIALS_PATH = path.join(__dirname, '..', process.env.GOOGLE_APPLICATION_CREDENTIALS);

console.log('🔍 Testing GA4 connection...\n');
console.log('Property ID:', PROPERTY_ID);
console.log('Credentials:', CREDENTIALS_PATH);
console.log('Credentials exist:', require('fs').existsSync(CREDENTIALS_PATH));

async function test() {
  try {
    const client = new BetaAnalyticsDataClient({
      keyFilename: CREDENTIALS_PATH
    });

    console.log('\n📡 Attempting simple metadata request...\n');

    const [metadata] = await client.getMetadata({
      name: `properties/${PROPERTY_ID}/metadata`
    });

    console.log('✅ SUCCESS! Connection works.');
    console.log('Available dimensions:', metadata.dimensions?.length || 0);
    console.log('Available metrics:', metadata.metrics?.length || 0);

  } catch (error) {
    console.log('❌ ERROR:', error.message);
    console.log('\nFull error:', error);
  }
}

test();
