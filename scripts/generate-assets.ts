/**
 * Vertex AI asset generation (brief §9). Repeatable: generate once, commit the
 * optimised outputs, do not run on every build. ADC provides auth; project and
 * location come from env (defaults below).
 *
 *   npx tsx scripts/generate-assets.ts            # Imagen images only
 *   npx tsx scripts/generate-assets.ts --veo      # also generate the Veo hero loop
 *
 * Generated imagery is abstract/textural/environmental only (never the artist).
 */
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { imagenAssets, veoHeroPrompt, type ImagenAsset } from "./asset-prompts";

const PROJECT = process.env.GOOGLE_CLOUD_PROJECT || "radlabs-497004";
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || "us-central1";
const OUT = join(process.cwd(), "public/assets/generated");
const HERO_OUT = join(process.cwd(), "public/assets/hero");

const ai = new GoogleGenAI({ vertexai: true, project: PROJECT, location: LOCATION });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function generateImage(prompt: string, aspectRatio: string): Promise<Buffer | null> {
  for (const model of ["imagen-4.0-generate-001", "imagen-3.0-generate-002"]) {
    try {
      const resp = await ai.models.generateImages({
        model,
        prompt,
        config: { numberOfImages: 1, aspectRatio: aspectRatio as never },
      });
      const b64 = resp.generatedImages?.[0]?.image?.imageBytes;
      if (b64) {
        console.log(`  ok via ${model}`);
        return Buffer.from(b64, "base64");
      }
    } catch (e) {
      console.warn(`  ${model} failed: ${(e as Error).message}`);
    }
  }
  return null;
}

async function processImage(asset: ImagenAsset, raw: Buffer) {
  if (asset.kind === "og") {
    const bg = await sharp(raw).resize(1200, 630, { fit: "cover" }).toBuffer();
    const scrim = Buffer.from(
      `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#0a0a0b" fill-opacity="0.42"/></svg>`,
    );
    const logo = await sharp(join(process.cwd(), "public/assets/brand/logo.png"))
      .resize({ width: 560 })
      .toBuffer();
    const tag = Buffer.from(
      `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><text x="600" y="500" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="24" fill="#E6B45A" letter-spacing="5">UK DJ · PRODUCER · MULTI-INSTRUMENTALIST</text></svg>`,
    );
    await sharp(bg)
      .composite([{ input: scrim }, { input: logo, gravity: "center" }, { input: tag }])
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(join(OUT, "og.jpg"));
    console.log("  -> og.jpg (1200x630, real logo)");
    return;
  }

  const maxW = asset.kind === "artwork" ? 1200 : 1600;
  const base = sharp(raw).resize({ width: maxW, withoutEnlargement: true });
  await base.clone().avif({ quality: 55, effort: 4 }).toFile(join(OUT, `${asset.id}.avif`));
  await base.clone().webp({ quality: 72 }).toFile(join(OUT, `${asset.id}.webp`));
  console.log(`  -> ${asset.id}.avif + .webp`);
}

async function runImagen() {
  mkdirSync(OUT, { recursive: true });
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const only = onlyArg ? onlyArg.slice("--only=".length).split(",") : null;
  const assets = only ? imagenAssets.filter((a) => only.includes(a.id)) : imagenAssets;
  for (const asset of assets) {
    console.log(`\n[imagen] ${asset.id}`);
    const raw = await generateImage(asset.prompt, asset.aspectRatio);
    if (!raw) {
      console.warn(`  skipped ${asset.id} (no image returned)`);
      continue;
    }
    await processImage(asset, raw);
  }
}

async function runVeo() {
  mkdirSync(HERO_OUT, { recursive: true });
  console.log(`\n[veo] hero loop`);
  for (const model of ["veo-3.0-fast-generate-001", "veo-2.0-generate-001"]) {
    try {
      console.log(`  requesting via ${model} ...`);
      let op = await ai.models.generateVideos({
        model,
        prompt: veoHeroPrompt,
        config: { numberOfVideos: 1, aspectRatio: "16:9" },
      });
      const started = Date.now();
      while (!op.done) {
        if (Date.now() - started > 5 * 60 * 1000) throw new Error("timed out after 5 min");
        await sleep(12000);
        op = await ai.operations.getVideosOperation({ operation: op });
        process.stdout.write(".");
      }
      const video = op.response?.generatedVideos?.[0]?.video as
        | { videoBytes?: string; uri?: string }
        | undefined;
      if (video?.videoBytes) {
        const tmp = join(HERO_OUT, "_raw.mp4");
        writeFileSync(tmp, Buffer.from(video.videoBytes, "base64"));
        compressVideo(tmp);
        rmSync(tmp, { force: true });
        console.log(`\n  ok via ${model}`);
        return;
      }
      console.warn(`\n  ${model} returned a URI, not bytes: ${video?.uri ?? "none"} (download manually)`);
      return;
    } catch (e) {
      console.warn(`\n  ${model} failed: ${(e as Error).message}`);
    }
  }
}

function compressVideo(src: string) {
  // Web-friendly MP4 (H.264) + WebM (VP9) + a poster frame (brief §9.2)
  execFileSync("ffmpeg", ["-y", "-i", src, "-vf", "scale=1280:-2", "-c:v", "libx264",
    "-crf", "26", "-preset", "slow", "-an", "-movflags", "+faststart", join(HERO_OUT, "hero-loop.mp4")]);
  execFileSync("ffmpeg", ["-y", "-i", src, "-vf", "scale=1280:-2", "-c:v", "libvpx-vp9",
    "-crf", "34", "-b:v", "0", "-an", join(HERO_OUT, "hero-loop.webm")]);
  execFileSync("ffmpeg", ["-y", "-i", src, "-vf", "scale=1280:-2,select=eq(n\\,0)", "-frames:v", "1",
    join(HERO_OUT, "hero-poster.jpg")]);
  console.log("  -> hero-loop.mp4 + .webm + hero-poster.jpg");
}

async function main() {
  console.log(`Vertex: project=${PROJECT} location=${LOCATION}`);
  const veoOnly = process.argv.includes("--veo-only");
  if (!veoOnly) await runImagen();
  if (veoOnly || process.argv.includes("--veo")) await runVeo();
  else console.log("\n(skipping Veo — pass --veo to generate the hero loop)");
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
