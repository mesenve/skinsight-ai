const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');

const assets = {
  heroPoster: ['hero/cellular-signal.png', 1448, 88],
  footerPoster: ['footer/hex-night-hq.png', 1600, 88],
  faqPoster: ['faq/clinician-story-poster.jpg', 576, 88],
  globe: ['earth/trusted-doctors-globe.webp', 960, 90],
  intake: ['how-it-works/step-01-intake.png', 512, 90],
  review: ['how-it-works/step-02-ai-review.png', 512, 90],
  clinician: ['how-it-works/step-03-clinician.png', 512, 90],
  reportPoster: ['how-it-works/step-04-report.png', 512, 90],
  james: ['avatars/clinician-james.webp', 512, 90],
  sophie: ['avatars/clinician-sophie.webp', 512, 90],
  aiko: ['avatars/clinician-aiko.webp', 512, 90],
  leila: ['avatars/clinician-leila.webp', 512, 90],
  levent: ['avatars/clinician-levent.webp', 512, 90],
  logo: ['logo.png', 128, 95],
  badge: ['icons/official-badge.png', 48, 95],
};

function fastStart(input) {
  const boxes = [];
  for (let offset = 0; offset < input.length;) {
    const size = input.readUInt32BE(offset);
    if (size < 8 || offset + size > input.length) throw new Error('Unsupported MP4 box');
    boxes.push({ offset, size, type: input.toString('ascii', offset + 4, offset + 8) });
    offset += size;
  }
  const moov = boxes.find(b => b.type === 'moov');
  const mdat = boxes.find(b => b.type === 'mdat');
  if (!moov || !mdat || boxes.some(b => b.type === 'moof')) throw new Error('Unsupported MP4 structure');
  if (moov.offset < mdat.offset) return input;
  const metadata = Buffer.from(input.subarray(moov.offset, moov.offset + moov.size));
  const containers = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl', 'edts', 'dinf', 'udta']);
  let offsetsUpdated = 0;
  function update(start, end) {
    for (let i = start; i < end;) {
      const size = metadata.readUInt32BE(i);
      if (size < 8 || i + size > end) throw new Error('Invalid MP4 metadata');
      const type = metadata.toString('ascii', i + 4, i + 8);
      if (type === 'stco' || type === 'co64') {
        const count = metadata.readUInt32BE(i + 12);
        const step = type === 'stco' ? 4 : 8;
        for (let n = 0; n < count; n++) {
          const at = i + 16 + n * step;
          const original = type === 'stco' ? metadata.readUInt32BE(at) : Number(metadata.readBigUInt64BE(at));
          if (original >= mdat.offset && original < moov.offset) {
            const adjusted = original + moov.size;
            if (type === 'stco') metadata.writeUInt32BE(adjusted, at);
            else metadata.writeBigUInt64BE(BigInt(adjusted), at);
            offsetsUpdated++;
          }
        }
      } else if (containers.has(type)) update(i + 8, i + size);
      i += size;
    }
  }
  update(0, metadata.length);
  if (!offsetsUpdated) throw new Error('No media offsets updated');
  const output = [];
  for (const box of boxes) {
    if (box.type === 'moov') continue;
    if (box === mdat) output.push(metadata);
    output.push(input.subarray(box.offset, box.offset + box.size));
  }
  return Buffer.concat(output);
}

(async () => {
  await fs.mkdir('public/media', { recursive: true });
  const manifest = {}, sizes = [];
  for (const [name, [source, width, quality]] of Object.entries(assets)) {
    const input = path.join('public', source);
    const buffer = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
    const hash = crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 12);
    const file = `${name}.${hash}.webp`;
    await fs.writeFile(path.join('public/media', file), buffer);
    manifest[name] = `/media/${file}`;
    sizes.push({ name, before: (await fs.stat(input)).size, after: buffer.length });
  }
  const originalVideo = await fs.readFile('public/footer/skinsight-footer.mp4');
  const video = fastStart(originalVideo);
  const hash = crypto.createHash('sha256').update(video).digest('hex').slice(0, 12);
  const videoFile = `footerVideo.${hash}.mp4`;
  await fs.writeFile(path.join('public/media', videoFile), video);
  manifest.footerVideo = `/media/${videoFile}`;
  sizes.push({ name: 'footerVideo', before: originalVideo.length, after: video.length });
  console.log(JSON.stringify({ manifest, sizes }));
})().catch(error => { console.error(error); process.exitCode = 1; });
