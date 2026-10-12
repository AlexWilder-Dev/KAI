// One-off image prep: dish crops, café stills, og.jpg and icons.
// Run with `npm run images`. Sources live in media-src/, output goes to public/.
import sharp from 'sharp';
import { readFile, mkdir, stat } from 'node:fs/promises';

const SRC = 'media-src';
const OUT = 'public/img';
const FLATLAY = `${SRC}/deliveroo-photo.jpg`; // 2688 x 1512, their Deliveroo spread

await mkdir(OUT, { recursive: true });

// [name, left, top, width, height] in flat-lay pixels. All 4:3 so the stacks line up.
const dishes = [
  ['strawberry-choc', 1421, 1000, 680, 510],
  ['pb-banana', 70, 0, 600, 450],
  ['biscoff', 2108, 282, 580, 435],
  ['greek-yogurt', 620, 176, 640, 480],
  ['bacon-maple', 1551, 235, 600, 450],
  ['red-leicester', 1092, 0, 360, 190],
  ['breakfast-stack', 510, 1036, 560, 420],
  ['salmon-avo', 1150, 600, 480, 360],
  ['avo-eggs', 150, 555, 560, 420],
  ['benedict', 2120, 1092, 560, 420],
  ['tater-tots', 1957, 0, 440, 330],
  ['tarty-tots', 1060, 1135, 440, 330],
];

for (const [name, left, top, width, height] of dishes) {
  await sharp(FLATLAY)
    .extract({ left, top, width, height })
    .resize({ width: Math.min(width, 720), withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`${OUT}/${name}.jpg`);
}

// Wide strips from the same spread
const strips = [
  ['sides', 1560, 756, 1128, 300], // pots of avocado, bacon, sriracha
  ['spread', 0, 0, 2688, 1512],
];
for (const [name, left, top, width, height] of strips) {
  await sharp(FLATLAY)
    .extract({ left, top, width, height })
    .resize({ width: Math.min(width, 1600), withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(`${OUT}/${name}.jpg`);
}

// Stills from their café video and banner
const stills = [
  ['poster', `${SRC}/stills/frame-0.jpg`, null],
  ['coffee', `${SRC}/stills/frame-6.6.jpg`, null],
  ['busy', `${SRC}/stills/frame-10.6.jpg`, null],
  ['yolk', `${SRC}/stills/frame-13.jpg`, null],
  ['biscoff-side', `${SRC}/stills/frame-16.jpg`, null],
  ['interior', `${SRC}/stills/gif-interior.jpg`, { left: 0, top: 0, width: 860, height: 630 }],
];
for (const [name, file, region] of stills) {
  let img = sharp(file);
  if (region) img = img.extract(region);
  await img.jpeg({ quality: 80, mozjpeg: true }).toFile(`${OUT}/${name}.jpg`);
}

// Logo paths, recoloured as needed
const logoSvg = await readFile(`${SRC}/kai-eat-well.svg`, 'utf8');
const logoPaths = [...logoSvg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
const logo = (fill, x, y, scale) =>
  `<g transform="translate(${x} ${y}) scale(${scale})" fill="${fill}">${logoPaths
    .map((d) => `<path d="${d}"/>`)
    .join('')}</g>`;
const wordmark = (fill, x, y, scale) =>
  `<g transform="translate(${x} ${y}) scale(${scale})" fill="${fill}"><path d="${logoPaths[0]}"/></g>`;

// og.jpg: the spread, with a stack of two layers carrying the logo
const ogW = 1200;
const ogH = 630;
const card = { w: 440, h: 260 };
const cx = (ogW - card.w) / 2;
const cy = (ogH - card.h) / 2 - 10;
const ogOverlay = `
<svg width="${ogW}" height="${ogH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="s" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#2a1a05" flood-opacity="0.28"/>
    </filter>
  </defs>
  <rect x="${cx + 26}" y="${cy + 30}" width="${card.w - 52}" height="${card.h}" rx="34" fill="#FBBF24" filter="url(#s)"/>
  <rect x="${cx}" y="${cy}" width="${card.w}" height="${card.h}" rx="38" fill="#FFFFFF" filter="url(#s)"/>
  ${logo('#16130F', cx + (card.w - 296 * 1.05) / 2, cy + (card.h - 155 * 1.05) / 2, 1.05)}
</svg>`;
await sharp(FLATLAY)
  .extract({ left: 0, top: 50, width: 2688, height: 1411 })
  .resize(ogW, ogH)
  .composite([{ input: Buffer.from(ogOverlay), top: 0, left: 0 }])
  .jpeg({ quality: 78, mozjpeg: true, chromaSubsampling: '4:2:0' })
  .toFile('public/og.jpg');

// Icons: black wordmark on amber
const icon = (size, pad) => {
  const s = (size - pad * 2) / 296;
  const h = 107 * s;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#FBBF24"/>
  ${wordmark('#16130F', pad, (size - h) / 2, s)}
</svg>`;
};
await sharp(Buffer.from(icon(180, 26)))
  .png()
  .toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(icon(64, 6)))
  .resize(32, 32)
  .png()
  .toFile('public/favicon-32.png');

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#FBBF24"/>
  ${wordmark('#16130F', 6, 32 - (107 * (52 / 296)) / 2, 52 / 296)}
</svg>`;
const { writeFile } = await import('node:fs/promises');
await writeFile('public/favicon.svg', faviconSvg);

const og = await stat('public/og.jpg');
const meta = await sharp('public/og.jpg').metadata();
console.log(`og.jpg ${meta.width}x${meta.height} ${(og.size / 1024).toFixed(1)}KB`);
