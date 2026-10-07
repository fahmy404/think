// Generates optimized web derivatives from the ORIGINAL supplied banner.
// No redrawing: everything below is crop + resize + re-encode of original pixels.
import sharp from 'sharp';
import fs from 'node:fs';

const SRC = 'D:/think/assets-source/think-logo..png';
const OUT = 'D:/think/site/public/brand';
fs.mkdirSync(OUT, { recursive: true });

const W = 82677;
const H = 11811;
const src = () => sharp(SRC, { limitInputPixels: false });

// Wordmark bounds measured from the 1600px preview (scale 51.67), plus padding.
const wm = { left: 30600, top: 2800, width: 21200, height: 6100 };

async function out(name, pipeline, formats = ['avif', 'webp']) {
  for (const f of formats) {
    const p = pipeline.clone();
    if (f === 'avif') await p.avif({ quality: 55, effort: 6 }).toFile(`${OUT}/${name}.avif`);
    if (f === 'webp') await p.webp({ quality: 82, effort: 6 }).toFile(`${OUT}/${name}.webp`);
    if (f === 'png') await p.png({ compressionLevel: 9 }).toFile(`${OUT}/${name}.png`);
  }
  console.log('done', name);
}

// Full banner (desktop hero): 2560 and 1440 wide.
await out('banner-2560', src().resize(2560));
await out('banner-1440', src().resize(1440));

// Mobile hero: tall crop centered on the wordmark so it stays legible on phones.
// 4:5 portrait crop of the original, centered on the wordmark.
const mw = 6200, mh = 7750;
const mleft = Math.round(wm.left + wm.width / 2 - mw / 2);
await out(
  'hero-mobile-900',
  src().extract({ left: mleft, top: Math.round(H - mh), width: mw, height: mh }).resize(900),
);

// Wordmark crop for nav/footer/loader (original pixels, no alteration).
await out('wordmark-1200', src().extract(wm).resize(1200), ['avif', 'webp', 'png']);
await out('wordmark-600', src().extract(wm).resize(600), ['webp', 'png']);

// Open Graph image 1200x630 (cover crop around wordmark).
const ogW = 12600, ogH = 6615;
await out(
  'og',
  src().extract({
    left: Math.round(wm.left + wm.width / 2 - ogW / 2),
    top: Math.round(wm.top + wm.height / 2 - ogH / 2),
    width: ogW,
    height: ogH,
  }).resize(1200, 630),
  ['png'],
);
console.log('ALL DONE', W, H);
