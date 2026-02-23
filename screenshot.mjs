import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3003/ferramentas');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'ferramentas-screenshot.png', fullPage: true });
  await browser.close();
  console.log('Screenshot saved: ferramentas-screenshot.png');
})();
