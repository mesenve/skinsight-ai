import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), "public", "avatars");

const patients = [
  { id: "01", skin: "#c4a07a", skinShadow: "#a88462", hair: "#2c1810", hairStyle: "short", bg: "#cfd8e3", shirt: "#5a6b7d", eye: "#3d2914" },
  { id: "02", skin: "#8d5524", skinShadow: "#6e4219", hair: "#1a1208", hairStyle: "bald", bg: "#d4dbe4", shirt: "#4a5568", eye: "#1a1008" },
  { id: "03", skin: "#f0c9a8", skinShadow: "#d4a88a", hair: "#1f2937", hairStyle: "bob", bg: "#c8d2dc", shirt: "#6b7280", eye: "#374151" },
  { id: "04", skin: "#e8b796", skinShadow: "#cc9a7a", hair: "#4a3728", hairStyle: "side", bg: "#d1d9e2", shirt: "#64748b", eye: "#292018" },
  { id: "05", skin: "#6b4423", skinShadow: "#523218", hair: "#0f0a06", hairStyle: "coil", bg: "#cbd5e1", shirt: "#475569", eye: "#0a0604" },
  { id: "06", skin: "#ddb896", skinShadow: "#c49a78", hair: "#6b5b4f", hairStyle: "gray", bg: "#d6dde5", shirt: "#78716c", eye: "#3d342c" },
  { id: "07", skin: "#f5d6c6", skinShadow: "#e0b8a8", hair: "#c9a227", hairStyle: "long", bg: "#ccd4de", shirt: "#94a3b8", eye: "#5c4a32" },
  { id: "08", skin: "#b8886e", skinShadow: "#9a6f58", hair: "#2d241c", hairStyle: "parted", bg: "#d0d8e0", shirt: "#5c6a78", eye: "#241c14" },
  { id: "09", skin: "#a67c52", skinShadow: "#8a6340", hair: "#1c1510", hairStyle: "bun", bg: "#c9d2db", shirt: "#6b7c8f", eye: "#181008" },
  { id: "10", skin: "#e0c4ac", skinShadow: "#c8a890", hair: "#9ca3af", hairStyle: "thin", bg: "#d3dae3", shirt: "#71717a", eye: "#4b5563" },
];

function hairPath(style) {
  switch (style) {
    case "short":
      return `<ellipse cx="120" cy="88" rx="62" ry="38" fill="HAIR"/><path d="M58 95 Q120 45 182 95 L182 130 Q120 110 58 130 Z" fill="HAIR"/>`;
    case "bald":
      return `<ellipse cx="120" cy="92" rx="48" ry="28" fill="SKIN_SHADOW" opacity="0.25"/>`;
    case "bob":
      return `<ellipse cx="120" cy="85" rx="68" ry="42" fill="HAIR"/><rect x="52" y="85" width="136" height="55" rx="8" fill="HAIR"/>`;
    case "side":
      return `<path d="M55 100 Q120 48 185 88 L190 125 Q120 105 55 125 Z" fill="HAIR"/><ellipse cx="120" cy="82" rx="58" ry="35" fill="HAIR"/>`;
    case "coil":
      return `<ellipse cx="120" cy="80" rx="70" ry="45" fill="HAIR"/><circle cx="75" cy="95" r="12" fill="HAIR"/><circle cx="95" cy="75" r="10" fill="HAIR"/><circle cx="145" cy="78" r="11" fill="HAIR"/><circle cx="165" cy="98" r="13" fill="HAIR"/>`;
    case "gray":
      return `<ellipse cx="120" cy="86" rx="64" ry="40" fill="HAIR"/><path d="M58 98 Q120 50 182 98 L178 128 Q120 112 58 128 Z" fill="HAIR"/>`;
    case "long":
      return `<ellipse cx="120" cy="82" rx="66" ry="40" fill="HAIR"/><path d="M52 90 L48 175 Q120 160 192 175 L188 90 Z" fill="HAIR"/>`;
    case "parted":
      return `<ellipse cx="120" cy="84" rx="60" ry="36" fill="HAIR"/><path d="M120 52 L120 95 M58 92 Q120 55 182 92" stroke="HAIR" stroke-width="0"/>`;
    case "bun":
      return `<circle cx="120" cy="58" r="22" fill="HAIR"/><ellipse cx="120" cy="88" rx="58" ry="32" fill="HAIR"/>`;
    case "thin":
      return `<ellipse cx="120" cy="86" rx="55" ry="32" fill="HAIR"/><path d="M68 95 Q120 58 172 95" fill="none" stroke="HAIR" stroke-width="18" stroke-linecap="round"/>`;
    default:
      return `<ellipse cx="120" cy="86" rx="60" ry="36" fill="HAIR"/>`;
  }
}

function buildSvg(p) {
  const hair = hairPath(p.hairStyle)
    .replaceAll("HAIR", p.hair)
    .replaceAll("SKIN_SHADOW", p.skinShadow);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300" width="240" height="300">
  <rect width="240" height="300" fill="${p.bg}"/>
  <rect x="8" y="8" width="224" height="284" fill="none" stroke="#b0bcc9" stroke-width="1" opacity="0.5"/>
  <!-- shoulders / shirt -->
  <path d="M45 248 Q120 210 195 248 L210 300 L30 300 Z" fill="${p.shirt}"/>
  <!-- neck -->
  <rect x="102" y="195" width="36" height="42" rx="4" fill="${p.skinShadow}"/>
  <!-- face -->
  <ellipse cx="120" cy="155" rx="52" ry="62" fill="${p.skin}"/>
  <ellipse cx="120" cy="162" rx="46" ry="54" fill="${p.skin}"/>
  <!-- ears -->
  <ellipse cx="68" cy="158" rx="8" ry="12" fill="${p.skinShadow}"/>
  <ellipse cx="172" cy="158" rx="8" ry="12" fill="${p.skinShadow}"/>
  <!-- hair -->
  ${hair}
  <!-- eyes -->
  <ellipse cx="100" cy="148" rx="9" ry="6" fill="white"/>
  <ellipse cx="140" cy="148" rx="9" ry="6" fill="white"/>
  <circle cx="101" cy="149" r="4" fill="${p.eye}"/>
  <circle cx="141" cy="149" r="4" fill="${p.eye}"/>
  <!-- brows -->
  <path d="M88 136 Q100 130 112 136" stroke="${p.hair}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M128 136 Q140 130 152 136" stroke="${p.hair}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- nose -->
  <path d="M120 152 L118 168 Q120 172 122 168 Z" fill="${p.skinShadow}" opacity="0.5"/>
  <!-- mouth neutral -->
  <path d="M108 182 Q120 186 132 182" stroke="${p.skinShadow}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- subtle ID photo vignette -->
  <rect width="240" height="300" fill="url(#vignette)" opacity="0.08"/>
  <defs>
    <radialGradient id="vignette" cx="50%" cy="45%" r="65%">
      <stop offset="70%" stop-color="white"/>
      <stop offset="100%" stop-color="black"/>
    </radialGradient>
  </defs>
</svg>`;
}

mkdirSync(OUT, { recursive: true });
for (const p of patients) {
  writeFileSync(join(OUT, `id-${p.id}.svg`), buildSvg(p), "utf8");
}
console.log(`Generated ${patients.length} ID portraits in ${OUT}`);
