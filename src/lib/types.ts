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
  avatarUrl?: string;
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
  /** Custom cases wait for Run AI Review before ABCDE is populated */
  analysisPending?: boolean;
  isCustom?: boolean;
}

export interface DashboardStats {
  totalCases: number;
  highRisk: number;
  waitingReview: number;
  followUpToday: number;
}

export type ActivityEventType =
  | "case_opened"
  | "ai_scan_run"
  | "case_approved"
  | "new_scan_requested"
  | "doctor_note_added"
  | "report_generated"
  | "case_created";

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  caseId: string;
  patientName: string;
  performedBy: string;
  timestamp: string;
  detail?: string;
}

export type NotificationLevel = "high" | "info" | "reminder";

export interface AppNotification {
  id: string;
  level: NotificationLevel;
  title: string;
  body: string;
  caseId?: string;
  patientName?: string;
  timestamp: string;
  read: boolean;
}

export interface CalendarEvent {
  id: string;
  caseId: string;
  patientName: string;
  avatarUrl?: string;
  priority: RiskLevel;
  date: string;
  time: string;
  durationMin: number;
  type: "follow_up" | "new_scan_requested";
  lesionLocation: string;
  mrn: string;
}
