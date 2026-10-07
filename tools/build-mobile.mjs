// Fixes the mobile hero crop: a 2.2:1 strip centered on the wordmark, full original height.
import sharp from 'sharp';
const SRC = 'D:/think/assets-source/think-logo..png';
const OUT = 'D:/think/site/public/brand';
const H = 11811;
const cw = 26000;
const left = Math.round(30600 + 21200 / 2 - cw / 2);
const s = () =>
  sharp(SRC, { limitInputPixels: false }).extract({ left, top: 0, width: cw, height: H }).resize(1100);
await s().avif({ quality: 55, effort: 6 }).toFile(`${OUT}/hero-mobile-1100.avif`);
await s().webp({ quality: 82, effort: 6 }).toFile(`${OUT}/hero-mobile-1100.webp`);
console.log('mobile done');
