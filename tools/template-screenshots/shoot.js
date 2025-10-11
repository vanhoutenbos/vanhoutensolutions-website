import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';

const targets = [
  { slug: 'coaching', url: 'https://themes.muffingroup.com/be/theme/coaching/' },
  { slug: 'sales', url: 'https://themeforest.net/category/wordpress/landing-pages?sort=sales' },
  { slug: 'consulting', url: 'https://demo.casethemes.net/consultio/' },
  { slug: 'ecommerce', url: 'https://themes.woocommerce.com/storefront/' }
];

const outDir = path.resolve(process.cwd(), '../../assets/images/templates');

async function ensureDir(dir) {
  try { await fs.mkdir(dir, { recursive: true }); } catch {}
}

async function shoot() {
  await ensureDir(outDir);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });

  for (const t of targets) {
    try {
      console.log('Capturing', t.slug, '→', t.url);
      await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 60000 });
      // Try dismissing cookie banners generically
      const selectors = ['button[aria-label*="accept" i]', 'button:has-text("Accept")', '#onetrust-accept-btn-handler', 'button[aria-label*="akkoord" i]'];
      for (const sel of selectors) {
        try { await page.click(sel, { timeout: 2000 }); } catch {}
      }
      const file = path.join(outDir, `${t.slug}.jpg`);
      await page.screenshot({ path: file, type: 'jpeg', quality: 85, fullPage: false });
      console.log('Saved', file);
    } catch (e) {
      console.warn('Failed', t.slug, e.message);
    }
  }

  await browser.close();
}

shoot();
