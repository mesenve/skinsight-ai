import type { ABCDAnalysis, ABCDStatus, RiskLevel } from "@/lib/types";

export interface AnalyzeLesionRequest {
  caseId: string;
  imageUrl: string;
  patientContext?: {
    patientName?: string;
    age?: number;
    lesionLocation?: string;
  };
}

export interface AnalyzeLesionResult {
  abcd: ABCDAnalysis;
  aiRiskScore: number;
  priority: RiskLevel;
  aiObservations: string[];
}

interface RawDimension {
  status?: string;
  score?: number;
  explanation?: string;
}

interface RawOpenAIAnalysis {
  abcd?: {
    asymmetry?: RawDimension;
    border?: RawDimension;
    color?: RawDimension;
    diameter?: RawDimension;
    evolution?: RawDimension;
  };
  aiRiskScore?: number;
  priority?: string;
  aiObservations?: string[];
}

const VALID_STATUS: ABCDStatus[] = ["concerning", "moderate", "normal"];
const VALID_PRIORITY: RiskLevel[] = ["high", "medium", "low"];

function clampScore(value: unknown): number {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.min(100, Math.max(0, Math.round(num)));
}

function normalizeStatus(value: unknown): ABCDStatus {
  if (typeof value === "string" && VALID_STATUS.includes(value as ABCDStatus)) {
    return value as ABCDStatus;
  }
  return "moderate";
}

function normalizePriority(value: unknown, aiRiskScore: number): RiskLevel {
  if (typeof value === "string" && VALID_PRIORITY.includes(value as RiskLevel)) {
    return value as RiskLevel;
  }
  if (aiRiskScore >= 70) return "high";
  if (aiRiskScore >= 45) return "medium";
  return "low";
}

function normalizeDimension(
  raw: RawDimension | undefined,
  fallbackLabel: string
): ABCDAnalysis["asymmetry"] {
  const score = clampScore(raw?.score);
  const status = normalizeStatus(raw?.status);
  const explanation =
    typeof raw?.explanation === "string" && raw.explanation.trim()
      ? raw.explanation.trim()
      : `${fallbackLabel} assessment pending clinician review.`;

  return { status, score, explanation };
}

export function mapOpenAIAnalysis(raw: RawOpenAIAnalysis): AnalyzeLesionResult {
  const abcd: ABCDAnalysis = {
    asymmetry: normalizeDimension(raw.abcd?.asymmetry, "Asymmetry"),
    border: normalizeDimension(raw.abcd?.border, "Border"),
    color: normalizeDimension(raw.abcd?.color, "Color"),
    diameter: normalizeDimension(raw.abcd?.diameter, "Diameter"),
    evolution: normalizeDimension(raw.abcd?.evolution, "Evolution"),
  };

  const dimensionScores = [
    abcd.asymmetry.score,
    abcd.border.score,
    abcd.color.score,
    abcd.diameter.score,
    abcd.evolution.score,
  ];
  const computedAverage = Math.round(
    dimensionScores.reduce((sum, value) => sum + value, 0) / dimensionScores.length
  );
  const aiRiskScore = clampScore(raw.aiRiskScore ?? computedAverage);
  const priority = normalizePriority(raw.priority, aiRiskScore);

  const aiObservations = Array.isArray(raw.aiObservations)
    ? raw.aiObservations
        .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
        .map((item) => item.trim())
        .slice(0, 6)
    : [];

  if (aiObservations.length === 0) {
    aiObservations.push(
      `Composite triage index ${aiRiskScore} — decision-support signal only.`,
      "Clinician verification required before any clinical action."
    );
  }

  return { abcd, aiRiskScore, priority, aiObservations };
}

export const AI_ANALYSIS_SYSTEM_PROMPT = `You are a dermatology triage decision-support assistant for clinicians reviewing dermoscopic images.

Rules:
- Do NOT provide a definitive diagnosis or tell the user they have cancer.
- Assess the lesion using the ABCDE framework (Asymmetry, Border, Color, Diameter, Evolution).
- Return ONLY valid JSON matching the requested schema.
- Scores are 0-100 where higher means more concerning for triage prioritization.
- status must be one of: "normal", "moderate", "concerning".
- priority must be one of: "low", "medium", "high".
- aiObservations: 3-5 short bullet-style strings for the clinician UI.
- Always include a disclaimer that clinician verification is required.`;

export function buildAnalysisUserPrompt(context?: AnalyzeLesionRequest["patientContext"]) {
  const lines = [
    "Analyze this dermoscopic lesion image for clinician triage support.",
    'Return JSON with keys: abcd (asymmetry, border, color, diameter, evolution — each with status, score, explanation), aiRiskScore, priority, aiObservations.',
  ];

  if (context?.patientName) lines.push(`Patient: ${context.patientName}`);
  if (context?.age) lines.push(`Age: ${context.age}`);
  if (context?.lesionLocation) lines.push(`Reported location: ${context.lesionLocation}`);

  return lines.join("\n");
}
