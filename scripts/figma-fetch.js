/**
 * Fetch design data from Figma (file + node) using your access token.
 * Run: node scripts/figma-fetch.js
 * Requires: .env with FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY (see .env.example).
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const FILE_KEY = process.env.FIGMA_FILE_KEY || 'kU8IAfFj7A2h2rXg3D8PIF';
const NODE_IDS = process.env.FIGMA_NODE_IDS || '1252:59579,1252:59580';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;

function get(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'GET',
        headers: { 'X-Figma-Token': TOKEN },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch {
            resolve(body);
          }
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  if (!TOKEN) {
    console.error('Missing FIGMA_ACCESS_TOKEN. Copy .env.example to .env and add your token.');
    console.error('Get a token: https://www.figma.com/developers/api#access-tokens');
    process.exit(1);
  }

  const outDir = path.join(__dirname, '..', 'figma-export');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  try {
    const nodesUrl = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(NODE_IDS)}`;
    console.log('Fetching nodes...', NODE_IDS);
    const nodesRes = await get(nodesUrl);
    if (nodesRes.err) {
      console.error('Figma API error:', nodesRes.err);
      process.exit(1);
    }
    fs.writeFileSync(
      path.join(outDir, 'nodes.json'),
      JSON.stringify(nodesRes, null, 2),
      'utf8'
    );
    console.log('Saved figma-export/nodes.json');

    const imagesUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(NODE_IDS)}&format=png&scale=2`;
    const imagesRes = await get(imagesUrl);
    if (imagesRes.images) {
      fs.writeFileSync(
        path.join(outDir, 'images.json'),
        JSON.stringify(imagesRes, null, 2),
        'utf8'
      );
      console.log('Saved figma-export/images.json (node id -> image URL)');
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
