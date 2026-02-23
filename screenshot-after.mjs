import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('🌐 Navigating to localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 10000 });
  await page.waitForTimeout(2000);
  
  console.log('📸 Capturing screenshot...');
  await page.screenshot({ 
    path: 'reports/homepage-after.png',
    fullPage: true 
  });
  
  console.log('✅ Screenshot saved: reports/homepage-after.png');
  
  await browser.close();
})();
