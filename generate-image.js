const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PAGE_URL = 'https://leekk5570.github.io/smartstore-date-banner/';
const OUTPUT = 'restock-notice.png';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.emulateTimezone('Asia/Seoul');
    await page.setViewport({ width: 860, height: 1493, deviceScaleFactor: 1 });
    await page.goto(PAGE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.screenshot({ path: path.join(__dirname, OUTPUT), clip: { x: 0, y: 0, width: 860, height: 1493 } });
    if (!fs.existsSync(path.join(__dirname, OUTPUT))) throw new Error('Image was not created.');
  } finally {
    await browser.close();
  }
})();
