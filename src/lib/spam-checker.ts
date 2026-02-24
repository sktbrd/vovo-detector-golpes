// Spam checking via Tellows scraping + local database

import * as cheerio from 'cheerio';
import { supabase, isSupabaseConfigured } from './supabase';

export interface SpamCheckResult {
  isSpam: boolean;
  score: number; // 0-100 (100 = confirmed spam)
  sources: {
    tellows?: { score: number; reports: number };
    local?: { reports: number; confidence: number; categories: Record<string, number> };
  };
  category?: string;
  warnings: string[];
}

// In-memory cache (1 hour TTL)
const cache = new Map<string, { result: SpamCheckResult; expiresAt: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Scrape Tellows (ethical scraping with User-Agent)
async function checkTellows(number: string): Promise<{ score: number; reports: number } | null> {
  try {
    const cleanNumber = number.replace(/\D/g, '');
    const url = `https://www.tellows.com.br/num/${cleanNumber}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VovoDetector/1.0; +https://detectordegolpes.com.br)',
      },
      // Timeout after 5s
      signal: AbortSignal.timeout(5000),
    });
    
    if (!response.ok) return null;
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Parse score (Tellows uses 1-10 scale, we convert to 0-100)
    const scoreText = $('.scoreValue, .score').first().text().trim();
    const score = parseInt(scoreText) || 0;
    
    // Parse number of reports
    const reportsText = $('meta[name="description"]').attr('content') || '';
    const reportsMatch = reportsText.match(/(\d+)\s+avalia(ções|çao)/i);
    const reports = reportsMatch ? parseInt(reportsMatch[1]) : 0;
    
    return {
      score: Math.min(100, score * 10), // Convert 1-10 to 0-100
      reports,
    };
  } catch (error) {
    console.error('Tellows scraping error:', error);
    return null;
  }
}

// Check local Supabase database
async function checkLocalDatabase(number: string): Promise<{
  reports: number;
  confidence: number;
  categories: Record<string, number>;
} | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  
  try {
    const cleanNumber = number.replace(/\D/g, '');
    
    const { data, error } = await supabase
      .from('spam_stats')
      .select('*')
      .eq('number', cleanNumber)
      .single();
    
    if (error || !data) return null;
    
    return {
      reports: data.total_reports || 0,
      confidence: data.confidence_score || 0,
      categories: data.categories || {},
    };
  } catch (error) {
    console.error('Local DB check error:', error);
    return null;
  }
}

// Main spam check function
export async function checkSpam(number: string): Promise<SpamCheckResult> {
  const cleanNumber = number.replace(/\D/g, '');
  
  // Check cache first
  const cached = cache.get(cleanNumber);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.result;
  }
  
  // Run checks in parallel
  const [tellowsData, localData] = await Promise.all([
    checkTellows(cleanNumber),
    checkLocalDatabase(cleanNumber),
  ]);
  
  // Calculate aggregate score
  let totalScore = 0;
  let sourceCount = 0;
  const warnings: string[] = [];
  
  if (tellowsData && tellowsData.score > 0) {
    totalScore += tellowsData.score;
    sourceCount++;
    
    if (tellowsData.score >= 70) {
      warnings.push(`⚠️ ${tellowsData.reports} denúncias no Tellows`);
    }
  }
  
  if (localData && localData.reports > 0) {
    totalScore += localData.confidence * 100;
    sourceCount++;
    
    if (localData.reports >= 5) {
      warnings.push(`⚠️ ${localData.reports} denúncias de usuários do Vovó`);
    }
    
    // Add category-specific warnings
    const topCategory = Object.entries(localData.categories)
      .sort(([, a], [, b]) => b - a)[0];
    
    if (topCategory) {
      warnings.push(`🚨 Categoria: ${topCategory[0]} (${topCategory[1]} reports)`);
    }
  }
  
  const avgScore = sourceCount > 0 ? totalScore / sourceCount : 0;
  
  // Determine primary category
  let category: string | undefined;
  if (localData?.categories) {
    const entries = Object.entries(localData.categories);
    if (entries.length > 0) {
      category = entries.sort(([, a], [, b]) => b - a)[0][0];
    }
  }
  
  const result: SpamCheckResult = {
    isSpam: avgScore >= 50,
    score: Math.round(avgScore),
    sources: {
      tellows: tellowsData ? { score: tellowsData.score, reports: tellowsData.reports } : undefined,
      local: localData ? {
        reports: localData.reports,
        confidence: localData.confidence,
        categories: localData.categories,
      } : undefined,
    },
    category,
    warnings,
  };
  
  // Cache result
  cache.set(cleanNumber, {
    result,
    expiresAt: Date.now() + CACHE_TTL,
  });
  
  return result;
}

// Report spam number
export async function reportSpam(
  number: string,
  category: 'golpe' | 'telemarketing' | 'cobranca' | 'outro',
  comment?: string,
  ipHash?: string
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase not configured, spam report ignored');
    return false;
  }
  
  try {
    const cleanNumber = number.replace(/\D/g, '');
    
    // Insert report
    const { error: reportError } = await supabase
      .from('spam_reports')
      .insert({
        number: cleanNumber,
        category,
        comment,
        ip_hash: ipHash,
      });
    
    if (reportError) {
      console.error('Report insert error:', reportError);
      return false;
    }
    
    // Update stats
    const { error: statsError } = await supabase.rpc('increment_spam_report', {
      p_number: cleanNumber,
      p_category: category,
    });
    
    if (statsError) {
      console.error('Stats update error:', statsError);
      // Don't fail if stats update fails
    }
    
    // Invalidate cache
    cache.delete(cleanNumber);
    
    return true;
  } catch (error) {
    console.error('Report spam error:', error);
    return false;
  }
}
