import type {
  DashboardStats,
  PatientCase,
  QueueFilter,
} from "./types";
import { PATIENT_ID_PHOTOS } from "./patient-photos";

const cases: PatientCase[] = [
  {
    id: "case-001",
    patientName: "Elena Vasquez",
    avatarUrl: PATIENT_ID_PHOTOS.elena,
    age: 54,
    mrn: "MRN-28471",
    lesionLocation: "Left forearm",
    bodyMapRegion: "left_forearm",
    lastScanDate: "2026-07-08",
    priority: "high",
    status: "waiting_review",
    aiRiskScore: 82,
    abcd: {
      asymmetry: {
        status: "concerning",
        score: 78,
        explanation:
          "Lesion shows notable asymmetry across both axes — one half does not mirror the other.",
      },
      border: {
        status: "concerning",
        score: 72,
        explanation:
          "Irregular, notched border with areas of indistinct demarcation at the periphery.",
      },
      color: {
        status: "moderate",
        score: 65,
        explanation:
          "Multiple shades detected including tan, dark brown, and focal reddish areas.",
      },
      diameter: {
        status: "moderate",
        score: 58,
        explanation:
          "Estimated diameter 7.2 mm — above the 6 mm follow-up threshold.",
      },
      evolution: {
        status: "concerning",
        score: 85,
        explanation:
          "Visible enlargement and color darkening compared to scan from 3 months ago.",
      },
    },
    timeline: [
      {
        id: "scan-001a",
        date: "2026-07-08",
        imageUrl: "/lesions/lesion-a.jpg",
        note: "Current scan — priority review flagged",
      },
      {
        id: "scan-001b",
        date: "2026-04-02",
        imageUrl: "/lesions/lesion-e.jpg",
        note: "Follow-up scan — mild changes noted",
      },
      {
        id: "scan-001c",
        date: "2025-11-15",
        imageUrl: "/lesions/lesion-f.jpg",
        note: "Baseline scan on file",
      },
    ],
    doctorNotes:
      "Patient reports the lesion has grown over the past 6 weeks. No family history of melanoma. Recommend dermoscopy and possible biopsy pending clinician review.",
    aiObservations: [
      "Elevated composite risk signal based on ABCDE pattern analysis.",
      "Border irregularity score exceeds clinic threshold for expedited review.",
      "Evolution signal indicates measurable change over 90-day interval.",
      "Image quality sufficient for AI-assisted boundary detection.",
    ],
    clinicianAssessment:
      "Pending clinician verification. AI-assisted review suggests expedited in-person evaluation. Dermoscopic examination recommended before final disposition.",
  },
  {
    id: "case-002",
    patientName: "James Okonkwo",
    avatarUrl: PATIENT_ID_PHOTOS.james,
    age: 61,
    mrn: "MRN-31904",
    lesionLocation: "Right shoulder",
    bodyMapRegion: "right_shoulder",
    lastScanDate: "2026-07-07",
    priority: "high",
    status: "follow_up",
    aiRiskScore: 76,
    abcd: {
      asymmetry: {
        status: "moderate",
        score: 62,
        explanation: "Mild asymmetry observed; not fully symmetric but within moderate range.",
      },
      border: {
        status: "concerning",
        score: 74,
        explanation: "Scalloped border with focal areas of blurring.",
      },
      color: {
        status: "concerning",
        score: 70,
        explanation: "Variegated pigmentation with at least three distinct color zones.",
      },
      diameter: {
        status: "moderate",
        score: 55,
        explanation: "Estimated 5.8 mm — approaching follow-up threshold.",
      },
      evolution: {
        status: "moderate",
        score: 60,
        explanation: "Subtle shape change since last scan; color relatively stable.",
      },
    },
    timeline: [
      {
        id: "scan-002a",
        date: "2026-07-07",
        imageUrl: "/lesions/lesion-b.jpg",
        note: "Scheduled follow-up scan",
      },
      {
        id: "scan-002b",
        date: "2026-01-20",
        imageUrl: "/lesions/lesion-d.jpg",
        note: "Initial referral scan",
      },
    ],
    doctorNotes:
      "Returning patient for 6-month follow-up. Previous scan flagged for border irregularity. Patient is asymptomatic.",
    aiObservations: [
      "Risk signal elevated due to color variegation and border pattern.",
      "Comparison with prior scan shows subtle peripheral expansion.",
      "Recommend clinician correlation with patient history.",
    ],
    clinicianAssessment:
      "Follow-up recommended within 4 weeks. AI signals support continued monitoring; biopsy decision deferred to clinician judgment.",
  },
  {
    id: "case-003",
    patientName: "Sarah Chen",
    avatarUrl: PATIENT_ID_PHOTOS.sarah,
    age: 38,
    mrn: "MRN-44210",
    lesionLocation: "Upper back",
    bodyMapRegion: "back",
    lastScanDate: "2026-07-09",
    priority: "high",
    status: "waiting_review",
    aiRiskScore: 71,
    abcd: {
      asymmetry: {
        status: "concerning",
        score: 68,
        explanation: "Asymmetric shape with uneven distribution of pigment.",
      },
      border: {
        status: "moderate",
        score: 58,
        explanation: "Mostly defined border with one irregular segment.",
      },
      color: {
        status: "moderate",
        score: 52,
        explanation: "Two-tone pigmentation — light brown center, darker rim.",
      },
      diameter: {
        status: "concerning",
        score: 76,
        explanation: "Estimated 9.1 mm — exceeds standard monitoring threshold.",
      },
      evolution: {
        status: "moderate",
        score: 55,
        explanation: "First scan in system; no prior comparison available.",
      },
    },
    timeline: [
      {
        id: "scan-003a",
        date: "2026-07-09",
        imageUrl: "/lesions/lesion-a.jpg",
        note: "New patient intake scan",
      },
    ],
    doctorNotes: "New referral from primary care. Patient noticed lesion 2 months ago.",
    aiObservations: [
      "Diameter signal is the primary elevated factor in this case.",
      "No prior scans for evolution comparison — baseline established.",
      "Image quality check passed with high confidence.",
    ],
    clinicianAssessment:
      "Awaiting initial clinician review. Size and asymmetry warrant in-person assessment.",
  },
  {
    id: "case-004",
    patientName: "Michael Torres",
    avatarUrl: PATIENT_ID_PHOTOS.michael,
    age: 45,
    mrn: "MRN-55182",
    lesionLocation: "Chest",
    bodyMapRegion: "chest",
    lastScanDate: "2026-07-06",
    priority: "medium",
    status: "waiting_review",
    aiRiskScore: 48,
    abcd: {
      asymmetry: {
        status: "normal",
        score: 30,
        explanation: "Lesion appears largely symmetric.",
      },
      border: {
        status: "moderate",
        score: 45,
        explanation: "Slightly fuzzy border in one quadrant.",
      },
      color: {
        status: "moderate",
        score: 50,
        explanation: "Uniform light brown with minor variation.",
      },
      diameter: {
        status: "normal",
        score: 28,
        explanation: "Estimated 4.2 mm — within routine monitoring range.",
      },
      evolution: {
        status: "normal",
        score: 25,
        explanation: "Stable appearance compared to scan 12 months ago.",
      },
    },
    timeline: [
      {
        id: "scan-004a",
        date: "2026-07-06",
        imageUrl: "/lesions/lesion-c.jpg",
        note: "Annual skin check scan",
      },
      {
        id: "scan-004b",
        date: "2025-07-10",
        imageUrl: "/lesions/lesion-c.jpg",
        note: "Prior annual scan — stable",
      },
    ],
    doctorNotes: "Routine annual screening. Patient has history of atypical nevi.",
    aiObservations: [
      "Moderate risk signal driven by border and color scores.",
      "Evolution signal stable — no significant change detected.",
      "Suitable for standard review queue.",
    ],
    clinicianAssessment:
      "Likely benign appearance; routine clinician verification recommended.",
  },
  {
    id: "case-005",
    patientName: "Amara Diallo",
    avatarUrl: PATIENT_ID_PHOTOS.amara,
    age: 29,
    mrn: "MRN-66703",
    lesionLocation: "Left thigh",
    bodyMapRegion: "left_thigh",
    lastScanDate: "2026-07-08",
    priority: "medium",
    status: "follow_up",
    aiRiskScore: 42,
    abcd: {
      asymmetry: {
        status: "normal",
        score: 22,
        explanation: "Round, symmetric lesion.",
      },
      border: {
        status: "normal",
        score: 20,
        explanation: "Smooth, well-defined circular border.",
      },
      color: {
        status: "moderate",
        score: 48,
        explanation: "Uniform medium brown; slight central lightening.",
      },
      diameter: {
        status: "normal",
        score: 32,
        explanation: "Estimated 3.8 mm.",
      },
      evolution: {
        status: "normal",
        score: 18,
        explanation: "No change from prior scan 6 months ago.",
      },
    },
    timeline: [
      {
        id: "scan-005a",
        date: "2026-07-08",
        imageUrl: "/lesions/lesion-d.jpg",
        note: "6-month follow-up",
      },
      {
        id: "scan-005b",
        date: "2026-01-05",
        imageUrl: "/lesions/lesion-d.jpg",
        note: "Baseline scan",
      },
    ],
    doctorNotes: "Cosmetic concern. Patient requests monitoring rather than removal.",
    aiObservations: [
      "Low-to-moderate risk signal overall.",
      "Stable evolution pattern supports continued watchful waiting.",
    ],
    clinicianAssessment:
      "Schedule routine 6-month follow-up. No urgent action indicated by AI-assisted review.",
  },
  {
    id: "case-006",
    patientName: "Robert Kim",
    avatarUrl: PATIENT_ID_PHOTOS.robert,
    age: 67,
    mrn: "MRN-77891",
    lesionLocation: "Scalp",
    bodyMapRegion: "head",
    lastScanDate: "2026-07-05",
    priority: "medium",
    status: "waiting_review",
    aiRiskScore: 55,
    abcd: {
      asymmetry: {
        status: "moderate",
        score: 50,
        explanation: "Oval shape with mild asymmetry.",
      },
      border: {
        status: "moderate",
        score: 52,
        explanation: "Partially defined border; hair interference noted.",
      },
      color: {
        status: "moderate",
        score: 55,
        explanation: "Mixed pink and brown tones.",
      },
      diameter: {
        status: "moderate",
        score: 48,
        explanation: "Estimated 5.5 mm.",
      },
      evolution: {
        status: "moderate",
        score: 58,
        explanation: "Slight increase in size over 8 months.",
      },
    },
    timeline: [
      {
        id: "scan-006a",
        date: "2026-07-05",
        imageUrl: "/lesions/lesion-b.jpg",
        note: "Scalp lesion scan — hair parted",
      },
      {
        id: "scan-006b",
        date: "2025-11-01",
        imageUrl: "/lesions/lesion-c.jpg",
        note: "Prior scan",
      },
    ],
    doctorNotes:
      "Scalp location makes imaging challenging. Patient reports occasional bleeding when brushing hair.",
    aiObservations: [
      "Image quality moderate due to hair interference — clinician should verify.",
      "Evolution signal suggests monitoring interval may need shortening.",
    ],
    clinicianAssessment:
      "In-person examination recommended. AI signals are supportive, not definitive.",
  },
  {
    id: "case-007",
    patientName: "Lisa Bergström",
    avatarUrl: PATIENT_ID_PHOTOS.lisa,
    age: 42,
    mrn: "MRN-88012",
    lesionLocation: "Right forearm",
    bodyMapRegion: "right_forearm",
    lastScanDate: "2026-07-09",
    priority: "low",
    status: "approved",
    aiRiskScore: 22,
    abcd: {
      asymmetry: {
        status: "normal",
        score: 15,
        explanation: "Symmetric round lesion.",
      },
      border: {
        status: "normal",
        score: 12,
        explanation: "Smooth, regular border.",
      },
      color: {
        status: "normal",
        score: 18,
        explanation: "Uniform light tan coloration.",
      },
      diameter: {
        status: "normal",
        score: 20,
        explanation: "Estimated 2.9 mm.",
      },
      evolution: {
        status: "normal",
        score: 10,
        explanation: "Stable over 2 years of monitoring.",
      },
    },
    timeline: [
      {
        id: "scan-007a",
        date: "2026-07-09",
        imageUrl: "/lesions/lesion-c.jpg",
        note: "Routine check — approved",
      },
      {
        id: "scan-007b",
        date: "2024-07-01",
        imageUrl: "/lesions/lesion-c.jpg",
        note: "Prior stable scan",
      },
    ],
    doctorNotes: "Benign-appearing nevus. Continue annual screening.",
    aiObservations: [
      "Low risk signal across all ABCDE dimensions.",
      "Suitable for routine monitoring cadence.",
    ],
    clinicianAssessment:
      "Clinician verified — benign nevus. Return in 12 months for routine screening.",
  },
  {
    id: "case-008",
    patientName: "David Nakamura",
    avatarUrl: PATIENT_ID_PHOTOS.david,
    age: 55,
    mrn: "MRN-99134",
    lesionLocation: "Abdomen",
    bodyMapRegion: "abdomen",
    lastScanDate: "2026-07-07",
    priority: "low",
    status: "waiting_review",
    aiRiskScore: 31,
    abcd: {
      asymmetry: {
        status: "normal",
        score: 25,
        explanation: "Mild oval asymmetry within normal range.",
      },
      border: {
        status: "normal",
        score: 22,
        explanation: "Regular, well-circumscribed border.",
      },
      color: {
        status: "normal",
        score: 28,
        explanation: "Single shade of light brown.",
      },
      diameter: {
        status: "normal",
        score: 30,
        explanation: "Estimated 4.0 mm.",
      },
      evolution: {
        status: "normal",
        score: 20,
        explanation: "No significant change detected.",
      },
    },
    timeline: [
      {
        id: "scan-008a",
        date: "2026-07-07",
        imageUrl: "/lesions/lesion-d.jpg",
        note: "New patient scan",
      },
    ],
    doctorNotes: "Referred for peace of mind. No symptoms.",
    aiObservations: [
      "Low risk signal — all ABCDE scores within normal range.",
      "Standard review queue appropriate.",
    ],
    clinicianAssessment: "Pending review. AI-assisted analysis suggests low concern.",
  },
  {
    id: "case-009",
    patientName: "Priya Sharma",
    avatarUrl: PATIENT_ID_PHOTOS.priya,
    age: 33,
    mrn: "MRN-10245",
    lesionLocation: "Left shoulder",
    bodyMapRegion: "left_shoulder",
    lastScanDate: "2026-07-09",
    priority: "medium",
    status: "new_scan_requested",
    aiRiskScore: 52,
    abcd: {
      asymmetry: {
        status: "moderate",
        score: 45,
        explanation: "Slight asymmetry; image partially out of focus.",
      },
      border: {
        status: "moderate",
        score: 40,
        explanation: "Border assessment limited by image quality.",
      },
      color: {
        status: "moderate",
        score: 50,
        explanation: "Appears two-toned but confidence reduced.",
      },
      diameter: {
        status: "normal",
        score: 35,
        explanation: "Estimated 4.5 mm — measurement uncertain.",
      },
      evolution: {
        status: "moderate",
        score: 42,
        explanation: "Insufficient prior data for comparison.",
      },
    },
    timeline: [
      {
        id: "scan-009a",
        date: "2026-07-09",
        imageUrl: "/lesions/lesion-b.jpg",
        note: "Initial scan — quality flag raised",
      },
    ],
    doctorNotes: "AI flagged image quality. New photo requested with better lighting.",
    aiObservations: [
      "Image quality check: below optimal threshold.",
      "Boundary detection confidence reduced to 62%.",
      "Recommend new scan before final risk signal generation.",
    ],
    clinicianAssessment:
      "New photo requested. Prior AI signals are preliminary pending re-scan.",
  },
  {
    id: "case-010",
    patientName: "Thomas Wright",
    avatarUrl: PATIENT_ID_PHOTOS.thomas,
    age: 58,
    mrn: "MRN-11356",
    lesionLocation: "Right thigh",
    bodyMapRegion: "right_thigh",
    lastScanDate: "2026-07-08",
    priority: "low",
    status: "follow_up",
    aiRiskScore: 28,
    abcd: {
      asymmetry: {
        status: "normal",
        score: 18,
        explanation: "Symmetric appearance.",
      },
      border: {
        status: "normal",
        score: 15,
        explanation: "Regular border.",
      },
      color: {
        status: "normal",
        score: 22,
        explanation: "Uniform pigmentation.",
      },
      diameter: {
        status: "normal",
        score: 25,
        explanation: "Estimated 3.5 mm.",
      },
      evolution: {
        status: "normal",
        score: 12,
        explanation: "Stable over monitoring period.",
      },
    },
    timeline: [
      {
        id: "scan-010a",
        date: "2026-07-08",
        imageUrl: "/lesions/lesion-c.jpg",
        note: "Follow-up today",
      },
      {
        id: "scan-010b",
        date: "2026-01-12",
        imageUrl: "/lesions/lesion-c.jpg",
        note: "Prior scan",
      },
    ],
    doctorNotes: "Scheduled follow-up for today. Patient reports no changes.",
    aiObservations: [
      "Low risk signal maintained.",
      "Suitable for routine follow-up confirmation.",
    ],
    clinicianAssessment:
      "Continue annual monitoring. Follow-up today for clinician sign-off.",
  },
];

export function getCases(): PatientCase[] {
  return cases;
}

export function getCaseById(id: string): PatientCase | undefined {
  return cases.find((c) => c.id === id);
}

export function getDashboardStats(): DashboardStats {
  const today = "2026-07-09";
  return {
    totalCases: cases.length,
    highRisk: cases.filter((c) => c.priority === "high").length,
    waitingReview: cases.filter((c) => c.status === "waiting_review").length,
    followUpToday: cases.filter(
      (c) => c.status === "follow_up" && c.lastScanDate === today
    ).length,
  };
}

export function filterCases(
  query: string,
  filter: QueueFilter
): PatientCase[] {
  let result = [...cases];

  if (filter === "high_risk") {
    result = result.filter((c) => c.priority === "high");
  } else if (filter === "follow_up") {
    result = result.filter((c) => c.status === "follow_up");
  } else if (filter === "doctor_review") {
    result = result.filter((c) => c.status === "waiting_review");
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      (c) =>
        c.patientName.toLowerCase().includes(q) ||
        c.lesionLocation.toLowerCase().includes(q) ||
        c.mrn.toLowerCase().includes(q)
    );
  }

  return result.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
