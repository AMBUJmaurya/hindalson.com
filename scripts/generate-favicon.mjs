import sharp from "sharp";
import fs from "fs";
import path from "path";

/** Geometric H mark — no font dependency */
function svg(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#0e0e0e"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <rect x="1.25" y="1.25" width="61.5" height="61.5" rx="12.5" fill="none" stroke="#00c8d4" stroke-opacity="0.45" stroke-width="2"/>
  <!-- H letter -->
  <path fill="#ffffff" d="M18 14h8.5v13.5H37.5V14H46v36h-8.5V35.5H26.5V50H18V14z"/>
  <rect x="18" y="52.5" width="28" height="3.5" rx="1.75" fill="#00c8d4"/>
</svg>`;
}

async function writePng(file, size) {
  const buf = await sharp(Buffer.from(svg(64)))
    .resize(size, size, { fit: "contain" })
    .png()
    .toBuffer();
  fs.writeFileSync(file, buf);
  console.log("wrote", path.relative(process.cwd(), file));
}

const root = process.cwd();
const appDir = path.join(root, "app");
const publicDir = path.join(root, "public");

await writePng(path.join(appDir, "icon.png"), 512);
await writePng(path.join(appDir, "apple-icon.png"), 180);
await writePng(path.join(publicDir, "icon-192.png"), 192);
await writePng(path.join(publicDir, "icon-512.png"), 512);
await writePng(path.join(publicDir, "favicon-32.png"), 32);

// Real multi-size ICO isn't trivial; Next prefers app/icon.png.
// Keep a 32px PNG named favicon.ico only as last-resort — better copy PNG for browsers via metadata.
fs.writeFileSync(path.join(publicDir, "favicon.svg"), svg(64));
fs.copyFileSync(path.join(publicDir, "favicon-32.png"), path.join(publicDir, "favicon.ico"));

console.log("done");
