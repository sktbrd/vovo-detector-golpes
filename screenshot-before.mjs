import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://detectordegolpes.com.br', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  await page.screenshot({ 
    path: 'reports/homepage-before.png',
    fullPage: true 
  });
  
  console.log('✅ Screenshot saved: reports/homepage-before.png');
  
  await browser.close();
})();
