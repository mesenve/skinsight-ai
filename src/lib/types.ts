export type RiskLevel = "high" | "medium" | "low";

export type CaseStatus =
  | "waiting_review"
  | "follow_up"
  | "approved"
  | "new_scan_requested";

export type QueueFilter = "all" | "high_risk" | "follow_up" | "doctor_review";

export type ABCDStatus = "concerning" | "moderate" | "normal";

export type BodyMapRegion =
  | "head"
  | "chest"
  | "back"
  | "left_shoulder"
  | "right_shoulder"
  | "left_forearm"
  | "right_forearm"
  | "left_thigh"
  | "right_thigh"
  | "abdomen";

export interface ABCDDimension {
  status: ABCDStatus;
  score: number;
  explanation: string;
}

export interface ABCDAnalysis {
  asymmetry: ABCDDimension;
  border: ABCDDimension;
  color: ABCDDimension;
  diameter: ABCDDimension;
  evolution: ABCDDimension;
}

export interface ScanEvent {
  id: string;
  date: string;
  imageUrl: string;
  note: string;
}

export interface PatientCase {
  id: string;
  patientName: string;
  avatarUrl: string;
  age: number;
  mrn: string;
  lesionLocation: string;
  bodyMapRegion: BodyMapRegion;
  lastScanDate: string;
  priority: RiskLevel;
  status: CaseStatus;
  aiRiskScore: number;
  abcd: ABCDAnalysis;
  timeline: ScanEvent[];
  doctorNotes: string;
  aiObservations: string[];
  clinicianAssessment: string;
}

export interface DashboardStats {
  totalCases: number;
  highRisk: number;
  waitingReview: number;
  followUpToday: number;
}
