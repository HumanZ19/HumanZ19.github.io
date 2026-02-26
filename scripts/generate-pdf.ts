/**
 * generate-pdf.ts
 * Post-build Puppeteer script: renders /cv-print/ → dist/cv-karim-aithammou.pdf
 *
 * Run after `astro build`:  pnpm run generate-pdf
 * Requires: puppeteer (already in devDependencies)
 */

// node:child_process not used — static server is built inline
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const outputPdf = path.join(distDir, 'cv-karim-aithammou.pdf');
const PORT = 4399;

// ─── Minimal static file server ───────────────────────────────────────────────
// Serves the dist/ directory so Puppeteer can access /cv-print/

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function startServer(): Promise<ReturnType<typeof createServer>> {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    let urlPath = req.url ?? '/';
    // Strip query string
    urlPath = urlPath.split('?')[0] ?? '/';

    // Resolve to filesystem path
    let filePath = path.join(distDir, urlPath);

    // If directory, look for index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] ?? 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve, reject) => {
    server.listen(PORT, '127.0.0.1', () => {
      console.log(`  → Static server ready at http://localhost:${PORT}`);
      resolve(server);
    });
    server.on('error', reject);
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function generatePdf() {
  console.log('\n📄 Generating CV PDF with Puppeteer…');

  // Verify dist exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ not found — run `pnpm build` first');
    process.exit(1);
  }

  const server = await startServer();

  let browser;
  try {
    // Use system Chrome if Puppeteer's bundled Chrome is not available
    const systemChrome = [
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/snap/bin/chromium',
    ].find((p) => fs.existsSync(p));

    const launchOptions: Parameters<typeof puppeteer.launch>[0] = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    };

    if (systemChrome) {
      console.log(`  → Using system Chrome: ${systemChrome}`);
      launchOptions.executablePath = systemChrome;
    }

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();

    // Set viewport to A4 width
    await page.setViewport({ width: 1240, height: 1754 });

    const url = `http://localhost:${PORT}/cv-print/`;
    console.log(`  → Opening ${url}`);

    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30_000,
    });

    // Hide the print button before generating PDF
    await page.addStyleTag({ content: '.no-print { display: none !important; }' });

    await page.pdf({
      path: outputPdf,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    const stats = fs.statSync(outputPdf);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`✅ PDF saved: ${outputPdf} (${sizeKB} KB)`);
  } finally {
    await browser?.close();
    server.close();
  }
}

generatePdf().catch((err) => {
  console.error('❌ PDF generation failed:', err);
  process.exit(1);
});
