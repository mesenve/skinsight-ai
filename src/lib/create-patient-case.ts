import type {
  ABCDAnalysis,
  ABCDStatus,
  BodyMapRegion,
  PatientCase,
  RiskLevel,
} from "@/lib/types";

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickStatus(score: number): ABCDStatus {
  if (score >= 70) return "concerning";
  if (score >= 45) return "moderate";
  return "normal";
}

function dimension(
  seed: number,
  explanations: Record<ABCDStatus, string>
): ABCDAnalysis["asymmetry"] {
  const score = 35 + (seed % 56);
  const status = pickStatus(score);
  return { status, score, explanation: explanations[status] };
}

export function createPendingAbcdAnalysis(): ABCDAnalysis {
  const pending = "Awaiting AI-assisted pattern analysis.";
  const base = { status: "normal" as const, score: 0, explanation: pending };
  return {
    asymmetry: base,
    border: base,
    color: base,
    diameter: base,
    evolution: base,
  };
}

export function generateMockAnalysis(
  seed: string
): Pick<PatientCase, "abcd" | "aiRiskScore" | "priority" | "aiObservations"> {
  const base = hashString(seed);

  const abcd: ABCDAnalysis = {
    asymmetry: dimension(base + 1, {
      concerning: "Lesion shows notable asymmetry across both axes.",
      moderate: "Mild asymmetry detected — review recommended.",
      normal: "Symmetry appears within expected range for this capture.",
    }),
    border: dimension(base + 2, {
      concerning: "Irregular, notched border with indistinct peripheral demarcation.",
      moderate: "Border shows minor irregularity in one quadrant.",
      normal: "Border appears relatively smooth and well defined.",
    }),
    color: dimension(base + 3, {
      concerning: "Multiple color variations detected within the lesion.",
      moderate: "Two dominant shades observed — monitor for change.",
      normal: "Color distribution appears relatively uniform.",
    }),
    diameter: dimension(base + 4, {
      concerning: "Estimated diameter above the clinic follow-up threshold.",
      moderate: "Diameter near the upper range for routine monitoring.",
      normal: "Estimated diameter within typical monitoring range.",
    }),
    evolution: dimension(base + 5, {
      concerning: "Visible change compared with the prior scan on file.",
      moderate: "Subtle visual change noted — correlation recommended.",
      normal: "No significant evolution detected in available history.",
    }),
  };

  const scores = [
    abcd.asymmetry.score,
    abcd.border.score,
    abcd.color.score,
    abcd.diameter.score,
    abcd.evolution.score,
  ];
  const aiRiskScore = Math.round(
    scores.reduce((sum, value) => sum + value, 0) / scores.length
  );

  let priority: RiskLevel = "low";
  if (aiRiskScore >= 70) priority = "high";
  else if (aiRiskScore >= 45) priority = "medium";

  const elevated = Object.entries(abcd)
    .filter(([, value]) => value.status !== "normal")
    .map(([key]) => key);

  const aiObservations = [
    `Composite triage index ${aiRiskScore} — decision-support signal only.`,
    elevated.length > 0
      ? `Elevated ABCDE dimensions: ${elevated.join(", ")}.`
      : "No elevated ABCDE dimensions flagged in this capture.",
    "Image quality sufficient for AI-assisted boundary review.",
    "Clinician verification required before any clinical action.",
  ];

  return { abcd, aiRiskScore, priority, aiObservations };
}

export interface NewPatientInput {
  patientName: string;
  age: number;
  mrn?: string;
  bodyMapRegion: BodyMapRegion;
  lesionLocation: string;
  lesionImageUrl: string;
  doctorNotes?: string;
}

export function buildCustomPatientCase(input: NewPatientInput): PatientCase {
  const id = `case-custom-${Date.now()}`;
  const today = new Date().toISOString().slice(0, 10);
  const mrn = input.mrn?.trim() || `MRN-${String(Date.now()).slice(-5)}`;

  return {
    id,
    patientName: input.patientName.trim(),
    age: input.age,
    mrn,
    lesionLocation: input.lesionLocation,
    bodyMapRegion: input.bodyMapRegion,
    lastScanDate: today,
    priority: "medium",
    status: "waiting_review",
    aiRiskScore: 0,
    abcd: createPendingAbcdAnalysis(),
    timeline: [
      {
        id: `scan-${id}`,
        date: today,
        imageUrl: input.lesionImageUrl,
        note: "Initial intake capture — AI review pending",
      },
    ],
    doctorNotes:
      input.doctorNotes?.trim() ||
      "New intake case. Awaiting AI-assisted review and clinician verification.",
    aiObservations: [],
    clinicianAssessment:
      "Pending clinician verification after initial AI-assisted review.",
    analysisPending: true,
    isCustom: true,
  };
}
