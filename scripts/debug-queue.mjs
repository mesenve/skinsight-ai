import fs from "fs";

const transcriptPath =
  "C:/Users/merve/.cursor/projects/c-Users-merve-OneDrive-Desktop-SkinSight-AI/agent-transcripts/3247c2f9-642d-4cf0-83c9-593d0b20caee/3247c2f9-642d-4cf0-83c9-593d0b20caee.jsonl";

const target = "PatientQueueTable.tsx";
const versions = [];

for (const line of fs.readFileSync(transcriptPath, "utf8").split("\n")) {
  if (!line.includes('"Write"') && !line.includes('"StrReplace"')) continue;
  let obj;
  try {
    obj = JSON.parse(line);
  } catch {
    continue;
  }
  for (const part of obj.message?.content || []) {
    if (part.type !== "tool_use") continue;
    if (part.name === "Write") {
      const p = part.input?.path || "";
      if (p.includes(target)) versions.push(part.input.contents);
    }
  }
}

versions.forEach((v, i) => {
  console.log(
    `v${i + 1} len=${v.length}`,
    v.includes("divide-y") ? "TABLE" : "NO-TABLE",
    v.includes("border border") ? "BORDERS" : "NO-BORDERS",
    v.includes("space-y-3") ? "CARD-LIST" : ""
  );
});

if (versions[0]) {
  fs.writeFileSync(
    "C:/Users/merve/OneDrive/Desktop/SkinSight AI/.restore-tmp/PatientQueueTable-v1.tsx",
    versions[0]
  );
}
