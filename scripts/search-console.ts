#!/usr/bin/env tsx
/**
 * Google Search Console API - Automation Script
 * 
 * Features:
 * - Request indexing for URLs
 * - Check indexation status
 * - Pull performance data
 * - Submit sitemap
 * 
 * Usage:
 *   pnpm tsx scripts/search-console.ts request-indexing
 *   pnpm tsx scripts/search-console.ts check-status
 *   pnpm tsx scripts/search-console.ts performance
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { join } from 'path';

const SITE_URL = 'sc-domain:detectordegolpes.com.br';
const SERVICE_ACCOUNT_PATH = join(process.env.HOME!, '.openclaw/.env.google-sa.json');

// Priority URLs to index
const PRIORITY_URLS = [
  'https://detectordegolpes.com.br',
  'https://detectordegolpes.com.br/blog/como-identificar-golpe-no-pix',
  'https://detectordegolpes.com.br/blog/como-identificar-mensagem-falsa',
  'https://detectordegolpes.com.br/blog/golpe-do-emprestimo-falso',
  'https://detectordegolpes.com.br/blog/golpe-whatsapp-fingindo-ser-parente',
  'https://detectordegolpes.com.br/blog/top-7-golpes-pix-2026',
  'https://detectordegolpes.com.br/blog/novo-golpe-whatsapp-web',
  'https://detectordegolpes.com.br/golpes-pix',
  'https://detectordegolpes.com.br/golpes-whatsapp',
  'https://detectordegolpes.com.br/ferramentas',
];

// Initialize Google Auth
function getAuthClient() {
  const credentials = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
  
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });
  
  return auth;
}

// Get Search Console client
async function getSearchConsole() {
  const auth = getAuthClient();
  const authClient = await auth.getClient();
  
  return google.searchconsole({
    version: 'v1',
    auth: authClient as any,
  });
}

// Request indexing for URL (via Indexing API)
async function requestIndexing(url: string) {
  try {
    const auth = getAuthClient();
    const authClient = await auth.getClient();
    
    const indexing = google.indexing({
      version: 'v3',
      auth: authClient as any,
    });
    
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: 'URL_UPDATED',
      },
    });
    
    console.log(`✅ Indexing requested: ${url}`);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Error requesting indexing for ${url}:`, error.message);
    return null;
  }
}

// Check site indexation status
async function checkIndexationStatus() {
  try {
    const searchconsole = await getSearchConsole();
    
    // Get sitemap status
    const sitemaps = await searchconsole.sitemaps.list({
      siteUrl: SITE_URL,
    });
    
    console.log('\n📊 Sitemap Status:');
    if (sitemaps.data.sitemap && sitemaps.data.sitemap.length > 0) {
      sitemaps.data.sitemap.forEach((sitemap: any) => {
        console.log(`  Sitemap: ${sitemap.path}`);
        console.log(`  Status: ${sitemap.isPending ? 'Pending' : 'Processed'}`);
        console.log(`  Submitted: ${sitemap.lastSubmitted}`);
        console.log(`  Last Downloaded: ${sitemap.lastDownloaded || 'N/A'}`);
        console.log(`  Warnings: ${sitemap.warnings || 0}`);
        console.log(`  Errors: ${sitemap.errors || 0}`);
        console.log('');
      });
    } else {
      console.log('  ⚠️  No sitemaps found. Submit sitemap.xml!');
    }
    
    return sitemaps.data;
  } catch (error: any) {
    console.error('❌ Error checking status:', error.message);
    return null;
  }
}

// Submit sitemap
async function submitSitemap(sitemapUrl: string = 'https://detectordegolpes.com.br/sitemap.xml') {
  try {
    const searchconsole = await getSearchConsole();
    
    await searchconsole.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: sitemapUrl,
    });
    
    console.log(`✅ Sitemap submitted: ${sitemapUrl}`);
    return true;
  } catch (error: any) {
    console.error('❌ Error submitting sitemap:', error.message);
    return false;
  }
}

// Get performance data
async function getPerformanceData(days: number = 7) {
  try {
    const searchconsole = await getSearchConsole();
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const response = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['page'],
        rowLimit: 25,
      },
    });
    
    console.log(`\n📈 Performance Data (Last ${days} days):`);
    
    if (response.data.rows && response.data.rows.length > 0) {
      console.log('\nTop Pages:');
      response.data.rows.forEach((row: any, i: number) => {
        console.log(`\n${i + 1}. ${row.keys[0]}`);
        console.log(`   Clicks: ${row.clicks || 0}`);
        console.log(`   Impressions: ${row.impressions || 0}`);
        console.log(`   CTR: ${((row.ctr || 0) * 100).toFixed(2)}%`);
        console.log(`   Position: ${(row.position || 0).toFixed(1)}`);
      });
    } else {
      console.log('  ℹ️  No performance data yet (site too new or not indexed)');
    }
    
    return response.data;
  } catch (error: any) {
    console.error('❌ Error getting performance data:', error.message);
    return null;
  }
}

// Main CLI handler
async function main() {
  const command = process.argv[2];
  
  console.log('🔍 Google Search Console API\n');
  
  switch (command) {
    case 'request-indexing':
      console.log('📝 Requesting indexing for priority URLs...\n');
      for (const url of PRIORITY_URLS) {
        await requestIndexing(url);
        // Rate limit: wait 1 second between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      console.log('\n✅ All requests sent!');
      console.log('⏰ Indexation expected in 24-72h');
      break;
      
    case 'check-status':
      await checkIndexationStatus();
      break;
      
    case 'submit-sitemap':
      await submitSitemap();
      break;
      
    case 'performance':
      const days = parseInt(process.argv[3]) || 7;
      await getPerformanceData(days);
      break;
      
    default:
      console.log('Usage:');
      console.log('  pnpm tsx scripts/search-console.ts request-indexing');
      console.log('  pnpm tsx scripts/search-console.ts check-status');
      console.log('  pnpm tsx scripts/search-console.ts submit-sitemap');
      console.log('  pnpm tsx scripts/search-console.ts performance [days]');
      process.exit(1);
  }
}

main().catch(console.error);
