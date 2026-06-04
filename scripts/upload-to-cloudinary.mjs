/**
 * One-time script to upload all local product & hero-banner images to Cloudinary.
 *
 * Prerequisites — add these to .env.local:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
 *   CLOUDINARY_API_KEY=your_api_key
 *   CLOUDINARY_API_SECRET=your_api_secret
 *
 * Run:
 *   node scripts/upload-to-cloudinary.mjs
 */

import { v2 as cloudinary } from "cloudinary";
import { createRequire } from "module";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env.local manually ────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");
const envPath = join(root, ".env.local");

if (!existsSync(envPath)) {
  console.error("❌  .env.local not found. Create it first.");
  process.exit(1);
}

for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...rest] = trimmed.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

// ── Validate credentials ─────────────────────────────────────────────────────
const { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error(`
❌  Missing Cloudinary credentials in .env.local
    Make sure all three are set:
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
      CLOUDINARY_API_KEY=...
      CLOUDINARY_API_SECRET=...
  `);
  process.exit(1);
}

cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// ── Build upload list ────────────────────────────────────────────────────────
const uploads = [];

// 30 product images
for (let i = 1; i <= 30; i++) {
  // product 9 is .jpg, rest are .png
  const filename = i === 9 ? "9.jpg" : `${i}.png`;
  uploads.push({
    localPath: join(root, "public", "products", filename),
    publicId: `cosmetic-site/products/${i}`,
    label: `Product ${i}`,
  });
}

// 8 hero banner images
for (let i = 1; i <= 8; i++) {
  uploads.push({
    localPath: join(root, "public", "hero-banners", `${i}.png`),
    publicId: `cosmetic-site/hero-banners/${i}`,
    label: `Hero Banner ${i}`,
  });
}

// Logo (optional)
const logoPath = join(root, "public", "only-logo.png");
if (existsSync(logoPath)) {
  uploads.push({
    localPath: logoPath,
    publicId: "cosmetic-site/logo",
    label: "Logo",
  });
}

// ── Upload ───────────────────────────────────────────────────────────────────
let success = 0;
let skipped = 0;
let failed = 0;

console.log(`\n🚀  Uploading ${uploads.length} images to Cloudinary...\n`);

for (const { localPath, publicId, label } of uploads) {
  if (!existsSync(localPath)) {
    console.warn(`  ⚠️  SKIP   ${label} — file not found: ${localPath}`);
    skipped++;
    continue;
  }

  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      overwrite: false,      // won't re-upload if already exists
      resource_type: "image",
    });
    console.log(`  ✅  OK     ${label}  →  ${result.secure_url}`);
    success++;
  } catch (err) {
    // "already exists" is not a real error when overwrite: false
    if (err?.http_code === 400 && err?.message?.includes("already exists")) {
      console.log(`  ℹ️  EXISTS  ${label}`);
      success++;
    } else {
      console.error(`  ❌  FAIL   ${label}  —  ${err?.message ?? err}`);
      failed++;
    }
  }
}

console.log(`
─────────────────────────────────────────
  ✅  Uploaded : ${success}
  ⚠️  Skipped  : ${skipped}
  ❌  Failed   : ${failed}
─────────────────────────────────────────
${failed === 0 ? "🎉  All done! Restart your dev server." : "Fix the errors above and re-run."}
`);
