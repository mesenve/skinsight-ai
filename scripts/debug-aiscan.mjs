import fs from "fs";

const transcriptPath =
  "C:/Users/merve/.cursor/projects/c-Users-merve-OneDrive-Desktop-SkinSight-AI/agent-transcripts/3247c2f9-642d-4cf0-83c9-593d0b20caee/3247c2f9-642d-4cf0-83c9-593d0b20caee.jsonl";

const target = "AIScanOverlay.tsx";
const versions = [];

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
    if (!filePath.includes(target)) continue;
    const c = part.input.contents || "";
    versions.push({
      len: c.length,
      scanBeam: c.includes("animate-scan-beam"),
      focusPulse: c.includes("animate-focus-pulse"),
      ssCard: c.includes("ss-card"),
      steps: (c.match(/const STEPS/g) || []).length,
    });
  }
}

console.log(versions);
