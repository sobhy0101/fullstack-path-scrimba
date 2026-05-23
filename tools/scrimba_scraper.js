import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  await page.setViewportSize({ width: 1440, height: 900 });

  const jsonPayloads = [];

  page.on('response', async response => {
    const url = response.url();
    try {
      const contentType = response.headers()['content-type'] || '';
      if (contentType.includes('application/json') || url.includes('.json') || url.includes('/api/')) {
        const text = await response.text();
        jsonPayloads.push({ url, text });
      }
    } catch (e) {
      // Ignore errors for failed/empty requests
    }
  });

  console.log('Navigating to Scrimba course link...');
  await page.goto('https://scrimba.com/fullstack-path-c0fullstack/~04lp', {
    waitUntil: 'networkidle',
    timeout: 60000
  });

  console.log('Page loaded. Waiting for 10 seconds for dynamic content to hydrate...');
  await page.waitForTimeout(10000);

  // Take a screenshot
  const screenshotPath = path.resolve('tools/screenshot_loaded.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Screenshot saved to ${screenshotPath}`);

  // Dump page HTML for analysis
  const html = await page.content();
  fs.writeFileSync('tools/page_dom.html', html);
  console.log('DOM HTML written to tools/page_dom.html');

  // Let's dump all text to see if any transcript is already visible
  const bodyText = await page.innerText('body');
  fs.writeFileSync('tools/body_text.txt', bodyText);
  console.log('Body text length:', bodyText.length);

  // Let's check for any buttons/links
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, [role="button"], a, span, div')).map(el => ({
      tagName: el.tagName,
      text: el.innerText || '',
      id: el.id || '',
      className: el.className || '',
      ariaLabel: el.getAttribute('aria-label') || '',
      title: el.getAttribute('title') || ''
    })).filter(el => {
      const txt = el.text.toLowerCase();
      const aria = el.ariaLabel.toLowerCase();
      const title = el.title.toLowerCase();
      const cls = el.className.toLowerCase();
      return txt.includes('transcript') || txt.includes('cc') || txt.includes('caption') ||
             aria.includes('transcript') || aria.includes('caption') ||
             title.includes('transcript') || title.includes('caption') ||
             cls.includes('transcript') || cls.includes('caption');
    });
  });
  console.log('Matching elements in DOM:', JSON.stringify(buttons, null, 2));

  // Save the captured JSON payloads to inspect
  console.log(`Captured ${jsonPayloads.length} JSON payloads.`);
  
  // Write a summary of payloads (URLs and first 200 chars of text)
  const payloadSummary = jsonPayloads.map(p => ({
    url: p.url,
    preview: p.text.substring(0, 300)
  }));
  fs.writeFileSync('tools/payloads_summary.json', JSON.stringify(payloadSummary, null, 2));
  
  // Save full payloads as well
  fs.writeFileSync('tools/captured_payloads.json', JSON.stringify(jsonPayloads, null, 2));

  await browser.close();
}

run().catch(console.error);
