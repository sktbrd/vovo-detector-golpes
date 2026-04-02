#!/usr/bin/env tsx
/**
 * Daily Automation Runner
 * 
 * Runs every day at 04:00 BRT
 * 
 * Tasks:
 * 1. Pull Search Console data
 * 2. Generate 3 new articles
 * 3. Save report
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { generateDailyContent } from './content-generator';
// import { pullSearchConsoleData } from '../scripts/search-console-pull';

interface DailyReport {
  date: string;
  timestamp: string;
  tasks: {
    searchConsole: { status: string; error?: string };
    contentGeneration: { status: string; articlesCreated?: number; error?: string };
  };
}

async function main() {
  console.log('🌅 Starting daily automation...');
  console.log(`⏰ ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n`);
  
  const report: DailyReport = {
    date: new Date().toISOString().split('T')[0],
    timestamp: new Date().toISOString(),
    tasks: {
      searchConsole: { status: 'pending' },
      contentGeneration: { status: 'pending' }
    }
  };
  
  // Task 1: Pull Search Console data
  try {
    console.log('📊 Task 1/2: Search Console data pull');
    // await pullSearchConsoleData();
    console.log('⚠️  Skipping (not implemented yet)\n');
    report.tasks.searchConsole.status = 'skipped';
  } catch (error: any) {
    console.error('❌ Search Console pull failed:', error.message);
    report.tasks.searchConsole.status = 'failed';
    report.tasks.searchConsole.error = error.message;
  }
  
  // Task 2: Generate content
  try {
    console.log('📝 Task 2/2: Content generation');
    const articlesCreated = await generateDailyContent();
    report.tasks.contentGeneration.status = 'success';
    report.tasks.contentGeneration.articlesCreated = articlesCreated;
  } catch (error: any) {
    console.error('❌ Content generation failed:', error.message);
    report.tasks.contentGeneration.status = 'failed';
    report.tasks.contentGeneration.articlesCreated = 0;
    report.tasks.contentGeneration.error = error.message;
  }
  
  // Save JSON report
  const reportDir = join(__dirname, '../data/reports');
  if (!existsSync(reportDir)) {
    mkdirSync(reportDir, { recursive: true });
  }
  const reportPath = join(reportDir, `${report.date}.json`);
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`💾 Report saved: ${reportPath}`);
  
  // Save MD report for Daily Report job (08:00)
  const mdReportDir = join(__dirname, '../../reports');
  if (!existsSync(mdReportDir)) {
    mkdirSync(mdReportDir, { recursive: true });
  }
  
  const articlesCount = report.tasks.contentGeneration.articlesCreated || 0;
  const contentStatus = report.tasks.contentGeneration.status === 'success' 
    ? `✅ ${articlesCount} artigos gerados` 
    : `❌ Falhou: ${report.tasks.contentGeneration.error}`;
  
  const mdContent = `# Daily Report - ${report.date}

## Resumo

**Data:** ${new Date(report.timestamp).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}

### Tarefas Executadas

#### 📝 Geração de Conteúdo
${contentStatus}

#### 📊 Search Console
Skipped (não implementado)

---

**Status geral:** ${report.tasks.contentGeneration.status === 'success' ? '✅ Sucesso' : '⚠️ Parcial/Falha'}
`;
  
  const mdReportPath = join(mdReportDir, `${report.date}.md`);
  writeFileSync(mdReportPath, mdContent);
  console.log(`📄 MD report saved: ${mdReportPath}`);
  
  console.log('\n✅ Daily automation complete!');
  
  return report;
}

if (require.main === module) {
  main().catch(console.error);
}

export { main as runDailyAutomation };
