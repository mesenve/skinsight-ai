import fs from "fs";

const transcriptPath =
  "C:/Users/merve/.cursor/projects/c-Users-merve-OneDrive-Desktop-SkinSight-AI/agent-transcripts/3247c2f9-642d-4cf0-83c9-593d0b20caee/3247c2f9-642d-4cf0-83c9-593d0b20caee.jsonl";

const targets = [
  "AIScanOverlay.tsx",
  "AIRiskScoreCard.tsx",
  "LesionImageViewer.tsx",
  "BodyMap.tsx",
  "ReportPreview.tsx",
  "BeforeAfterCompare.tsx",
  "Timeline.tsx",
  "DoctorNotesPanel.tsx",
  "CaseActionBar.tsx",
  "ABCDAnalysisCard.tsx",
];

const allVersions = Object.fromEntries(targets.map((t) => [t, []]));

for (const line of fs.readFileSync(transcriptPath, "utf8").split("\n")) {
  if (!line.includes('"Write"')) continue;
  let obj;
  try {
    obj = JSON.parse(line);
  } catch {
    continue;
  }

  for (const part of obj.message?.content || []) {
    if (part.type !== "tool_use" || part.name !== "Write") continue;
    const filePath = part.input?.path || "";
    const contents = part.input?.contents || "";
    for (const target of targets) {
      if (filePath.includes(target)) {
        allVersions[target].push(contents);
      }
    }
  }
}

function pickVersion(target, versions) {
  if (!versions.length) return "";

  const score = (content) => {
    let s = 0;
    if (!content.includes("ss-card")) s += 10;
    if (content.includes("ss-card")) s -= 20;
    if (content.includes("SegmentedControl")) s -= 15;
    if (content.includes("card-surface")) s += 5;
    if (content.includes("var(--shadow-soft)")) s += 3;
    if (content.includes("strokeDasharray")) s += 8;
    if (content.includes("animate-scan-beam")) s += 20;
    if (content.includes("animate-focus-pulse")) s -= 20;
    if (content.includes("compact?: boolean")) s -= 5;
    if (content.includes("Within Range")) s += 4;
    if (content.includes("ZoomIn")) s += 2;
    return s;
  };

  return versions.reduce((best, current) =>
    score(current) > score(best) ? current : best
  );
}

const outDir = "C:/Users/merve/OneDrive/Desktop/SkinSight AI/.restore-tmp";
fs.mkdirSync(outDir, { recursive: true });

for (const target of targets) {
  const versions = allVersions[target];
  const picked = pickVersion(target, versions);
  console.log(
    target,
    `versions=${versions.length}`,
    `len=${picked.length}`,
    picked.includes("ss-card") ? "HAS-SS" : "OK"
  );
  fs.writeFileSync(`${outDir}/${target}`, picked);
}
