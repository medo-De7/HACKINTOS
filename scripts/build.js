#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

async function copy(src, dest) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src);
    for (const e of entries) {
      await copy(path.join(src, e), path.join(dest, e));
    }
  } else {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
  }
}

async function build() {
  console.log('Creating dist folder...');
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(dist, { recursive: true });

  const toCopy = ['server', 'client', 'public', 'README.md'];
  for (const p of toCopy) {
    const src = path.join(root, p);
    try {
      await copy(src, path.join(dist, p));
      console.log('Copied', p);
    } catch (err) {
      console.log('Skipping', p, err.message);
    }
  }

  const pkgPath = path.join(root, 'package.json');
  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));
  const prodPkg = {
    name: pkg.name,
    version: pkg.version,
    type: pkg.type || 'module',
    main: pkg.main || 'server/app.js',
    scripts: { start: 'node server/app.js' },
    dependencies: pkg.dependencies || {}
  };
  await fs.writeFile(path.join(dist, 'package.json'), JSON.stringify(prodPkg, null, 2));
  console.log('Wrote dist/package.json');

  console.log('\nDist created at', dist);
  console.log('To finish packaging, run:');
  console.log(`  cd ${path.relative(process.cwd(), dist)}`);
  console.log('  npm install --production');
  console.log('Then run `npm start` inside the dist folder.');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
