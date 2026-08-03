export type ClinicianRole = "attending" | "resident" | "fellow";
export type SpecialtyFocus =
  | "general_derm"
  | "dermato_oncology"
  | "pediatric_derm"
  | "cosmetic";
export type TriageThreshold = "conservative" | "balanced" | "expedited";

export interface ClinicianProfile {
  fullName: string;
  email: string;
  clinicName: string;
  specialty: SpecialtyFocus;
  role: ClinicianRole;
  triageThreshold: TriageThreshold;
  notifyHighRisk: boolean;
  notifyFollowUps: boolean;
  completedAt: string;
}

export const CLINICIAN_PROFILE_KEY = "skinsight-clinician-profile";

export const specialtyOptions: {
  value: SpecialtyFocus;
  label: string;
  description: string;
}[] = [
  {
    value: "general_derm",
    label: "General dermatology",
    description: "Broad lesion and rash triage",
  },
  {
    value: "dermato_oncology",
    label: "Dermato-oncology",
    description: "Melanoma and high-risk focus",
  },
  {
    value: "pediatric_derm",
    label: "Pediatric dermatology",
    description: "Children and adolescent cases",
  },
  {
    value: "cosmetic",
    label: "Cosmetic dermatology",
    description: "Elective and aesthetic follow-up",
  },
];

export const roleOptions: {
  value: ClinicianRole;
  label: string;
  description: string;
}[] = [
  {
    value: "attending",
    label: "Attending",
    description: "Independent sign-off authority",
  },
  {
    value: "fellow",
    label: "Fellow",
    description: "Advanced specialty training",
  },
  {
    value: "resident",
    label: "Resident",
    description: "Supervised review workflow",
  },
];

export const thresholdOptions: {
  value: TriageThreshold;
  label: string;
  description: string;
}[] = [
  {
    value: "conservative",
    label: "Conservative",
    description: "Surface more medium-risk cases early",
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Default clinic triage sensitivity",
  },
  {
    value: "expedited",
    label: "Expedited",
    description: "Prioritize only highest risk signals",
  },
];

export function loadClinicianProfile(): ClinicianProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CLINICIAN_PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ClinicianProfile;
  } catch {
    return null;
  }
}

export function saveClinicianProfile(profile: ClinicianProfile) {
  window.localStorage.setItem(CLINICIAN_PROFILE_KEY, JSON.stringify(profile));
}

export function specialtyLabel(value: SpecialtyFocus) {
  return specialtyOptions.find((option) => option.value === value)?.label ?? value;
}

export function roleLabel(value: ClinicianRole) {
  return roleOptions.find((option) => option.value === value)?.label ?? value;
}
