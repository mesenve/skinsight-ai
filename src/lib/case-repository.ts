import type { DashboardStats, PatientCase, QueueFilter } from "@/lib/types";
import { staticCases } from "@/lib/mock-data";

const STORAGE_KEY = "skinsight-custom-cases";

function normalizePatientKey(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "");
}

function shouldRemoveStoredCase(patientCase: PatientCase): boolean {
  return normalizePatientKey(patientCase.patientName) === "mervesenver";
}

function readCustomCases(): PatientCase[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PatientCase[];
    if (!Array.isArray(parsed)) return [];

    const filtered = parsed.filter((item) => !shouldRemoveStoredCase(item));
    if (filtered.length !== parsed.length) {
      writeCustomCases(filtered);
    }

    return filtered;
  } catch {
    return [];
  }
}

function writeCustomCases(customCases: PatientCase[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customCases));
}

export function getCustomCases(): PatientCase[] {
  return readCustomCases();
}

export function saveCustomCase(patientCase: PatientCase) {
  const next = [...readCustomCases(), patientCase];
  writeCustomCases(next);
  return patientCase;
}

export function updateCustomCase(
  id: string,
  patch: Partial<PatientCase>
): PatientCase | undefined {
  const customCases = readCustomCases();
  const index = customCases.findIndex((item) => item.id === id);
  if (index === -1) return undefined;

  const updated = { ...customCases[index], ...patch };
  customCases[index] = updated;
  writeCustomCases(customCases);
  return updated;
}

export function removeCustomCase(id: string): boolean {
  const customCases = readCustomCases();
  const next = customCases.filter((item) => item.id !== id);
  if (next.length === customCases.length) return false;
  writeCustomCases(next);
  return true;
}

export function removeCustomCaseByPatientName(patientName: string): number {
  const target = normalizePatientKey(patientName);
  const customCases = readCustomCases();
  const next = customCases.filter(
    (item) => normalizePatientKey(item.patientName) !== target
  );
  const removed = customCases.length - next.length;
  if (removed > 0) writeCustomCases(next);
  return removed;
}

export function mergeCases(customCases: PatientCase[]): PatientCase[] {
  return [...staticCases, ...customCases];
}

export function getMergedCaseById(
  id: string,
  customCases: PatientCase[]
): PatientCase | undefined {
  return (
    staticCases.find((item) => item.id === id) ??
    customCases.find((item) => item.id === id)
  );
}

export function getDashboardStatsFromCases(cases: PatientCase[]): DashboardStats {
  const today = new Date().toISOString().slice(0, 10);
  return {
    totalCases: cases.length,
    highRisk: cases.filter((item) => item.priority === "high").length,
    waitingReview: cases.filter((item) => item.status === "waiting_review").length,
    followUpToday: cases.filter(
      (item) => item.status === "follow_up" && item.lastScanDate === today
    ).length,
  };
}

export function filterMergedCases(
  cases: PatientCase[],
  query: string,
  filter: QueueFilter
): PatientCase[] {
  let result = [...cases];

  if (filter === "high_risk") {
    result = result.filter((item) => item.priority === "high");
  } else if (filter === "follow_up") {
    result = result.filter((item) => item.status === "follow_up");
  } else if (filter === "doctor_review") {
    result = result.filter((item) => item.status === "waiting_review");
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      (item) =>
        item.patientName.toLowerCase().includes(q) ||
        item.lesionLocation.toLowerCase().includes(q) ||
        item.mrn.toLowerCase().includes(q)
    );
  }

  return result.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
