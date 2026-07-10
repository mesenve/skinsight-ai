import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  ClipboardCheck,
  Eye,
  Layers,
  ListOrdered,
  Scan,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

export interface CaseStudyMetaItem {
  label: string;
  value: string;
}

export interface CaseStudyBenefit {
  title: string;
  description: string;
}

export interface CaseStudyPersona {
  title: string;
  items: string[];
}

export interface CaseStudyPrinciple {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface CaseStudyFlowStep {
  step: number;
  title: string;
  description: string;
}

export interface CaseStudyDecision {
  id: string;
  title: string;
  body: string;
}

export interface CaseStudyIteration {
  before: string;
  after: string;
}

export interface CaseStudyColorRole {
  color: string;
  label: string;
  usage: string;
}

export const caseStudyHero = {
  eyebrow: "Product Design Case Study",
  title: "Designing a safer AI-assisted dermatology review experience",
  description:
    "SkinSight AI is an independent product concept exploring how artificial intelligence can support dermatology professionals in reviewing, prioritizing and monitoring skin cases—without replacing clinical judgment.",
  disclaimer:
    "Created using fictional patient data and publicly available industry context. SkinSight AI is not affiliated with or intended to replace any existing clinical product.",
};

export const caseStudyMeta: CaseStudyMetaItem[] = [
  { label: "Role", value: "Product Designer" },
  { label: "Scope", value: "Product Strategy, UX, UI Design, Prototyping" },
  { label: "Platform", value: "Responsive Web Application" },
  { label: "Industry", value: "Healthcare & Artificial Intelligence" },
  { label: "Project Type", value: "Independent Portfolio Concept" },
];

export const projectOverview = {
  challenge: {
    title: "The challenge",
    body: "Dermatology professionals may need to review a high number of patient images while identifying cases that require faster attention. AI can support this process, but unclear scores, excessive automation and poorly structured interfaces can create new risks instead of reducing them.",
    question:
      "How might we help clinicians identify priority cases faster while keeping medical judgment, transparency and patient safety at the center of the experience?",
  },
  product: {
    title: "The product",
    body: "SkinSight AI is a clinician-facing dermatology review platform designed to organize patient cases, surface visual changes, present AI-supported observations and guide clinicians through a structured review and report approval process.",
    benefits: [
      {
        title: "Prioritize urgent cases",
        description: "Surface cases that need faster review based on signals and queue context.",
      },
      {
        title: "Compare scans over time",
        description: "Make visual evolution visible before clinical conclusions are recorded.",
      },
      {
        title: "Review AI signals with clinical context",
        description: "Pair model observations with patient history and clinician notes.",
      },
    ] satisfies CaseStudyBenefit[],
  },
};

export const userPersonas: CaseStudyPersona[] = [
  {
    title: "Dermatology Professionals",
    items: [
      "Review incoming patient cases",
      "Compare current and previous scans",
      "Evaluate AI-supported observations",
      "Record clinical assessments",
      "Approve or request changes to reports",
    ],
  },
  {
    title: "Clinical Operations Teams",
    items: [
      "Monitor case status",
      "Track incomplete reviews",
      "Manage patient queues",
      "Identify workflow bottlenecks",
      "Ensure cases reach the correct specialist",
    ],
  },
];

export const userInsight =
  "The interface should reduce scanning time without encouraging clinicians to trust an AI output without reviewing the underlying evidence.";

export const designPrinciples: CaseStudyPrinciple[] = [
  {
    icon: ShieldCheck,
    title: "Human judgment first",
    body: "AI findings are presented as decision-support signals, not final diagnoses.",
  },
  {
    icon: Eye,
    title: "Explain, don’t only score",
    body: "Every priority level should be supported by visible observations and contextual evidence.",
  },
  {
    icon: ClipboardCheck,
    title: "Safety before speed",
    body: "Critical actions require completed clinical checks and clear confirmation states.",
  },
  {
    icon: Layers,
    title: "Progressive disclosure",
    body: "Clinicians see the most important information first while secondary patient details remain accessible when needed.",
  },
];

export const clinicalUserFlow: CaseStudyFlowStep[] = [
  {
    step: 1,
    title: "Patient Intake",
    description: "A new case enters the queue with scan metadata and patient context.",
  },
  {
    step: 2,
    title: "Image Quality Check",
    description: "The interface flags retake needs before AI analysis proceeds.",
  },
  {
    step: 3,
    title: "AI-Assisted Review",
    description: "Pattern signals and evolution changes are surfaced for clinician review.",
  },
  {
    step: 4,
    title: "Clinician Assessment",
    description: "The dermatologist records findings and contextual clinical judgment.",
  },
  {
    step: 5,
    title: "Report Approval",
    description: "A structured checklist gates final report approval.",
  },
  {
    step: 6,
    title: "Follow-up Monitoring",
    description: "Scheduled follow-ups remain visible in the queue and case timeline.",
  },
];

export const flowNote =
  "AI review is intentionally positioned before clinician assessment but cannot complete or approve the medical report independently.";

export const designDecisions: CaseStudyDecision[] = [
  {
    id: "01",
    title: "A priority queue instead of a generic patient list",
    body: "The dashboard prioritizes cases through urgency, waiting time and detected visual changes. This helps clinicians decide where to begin without presenting the AI output as a confirmed diagnosis.",
  },
  {
    id: "02",
    title: "Separating priority, confidence and evidence",
    body: "A single AI score can easily be misunderstood as a diagnosis probability. The interface separates review priority, model confidence and the visual signals contributing to the result.",
  },
  {
    id: "03",
    title: "Making AI observations explainable",
    body: "ABCDE observations include short explanations so clinicians can understand why a signal was surfaced instead of only seeing a progress bar or numeric score.",
  },
  {
    id: "04",
    title: "Keeping clinical approval human-controlled",
    body: "The report approval action remains unavailable until the required clinical checks are completed. This transforms safety from a disclaimer into a product behavior.",
  },
];

export const queuePreviewFields = [
  "High, medium and low priority",
  "Waiting time",
  "Case status",
  "Recent change indicator",
  "Assigned clinician",
];

export const riskSignalPreview = {
  priority: "High",
  confidence: "82%",
  signals: ["Asymmetry", "Border irregularity", "Recent evolution"],
};

export const abcdePreview = [
  { label: "Asymmetry", note: "Uneven distribution detected" },
  { label: "Border", note: "Irregular boundary in upper-right region" },
  { label: "Color", note: "Multiple dominant color variations" },
  { label: "Diameter", note: "Estimated measurement above reference range" },
  { label: "Evolution", note: "Visible change compared with previous scan" },
];

export const approvalChecklist = [
  "Image quality reviewed",
  "Patient details verified",
  "AI findings reviewed",
  "Clinical assessment entered",
  "No unresolved warnings",
];

export const designIterations: CaseStudyIteration[] = [
  {
    before: "A single AI score dominated the case card.",
    after: "Priority, confidence and supporting observations were separated to reduce misinterpretation.",
  },
  {
    before: "Patient metadata and clinical actions competed for attention.",
    after: "The review screen was reorganized around image comparison, AI signals and clinician decisions.",
  },
  {
    before: "Report approval relied mainly on a warning message.",
    after: "A completion checklist and disabled action state were introduced before approval.",
  },
];

export const colorRoles: CaseStudyColorRole[] = [
  { color: "bg-medical-blue", label: "Blue", usage: "Primary actions and navigation" },
  { color: "bg-risk-high", label: "Red", usage: "High-priority attention" },
  { color: "bg-risk-medium", label: "Orange", usage: "Pending review" },
  { color: "bg-risk-low", label: "Green", usage: "Completed and verified" },
  { color: "bg-muted-light", label: "Neutral", usage: "Clinical content and secondary information" },
];

export const accessibilityPoints = [
  "Accessible text contrast",
  "Color-independent status labels",
  "Visible keyboard focus states",
  "Clear disabled button explanations",
  "Responsive layouts",
  "Minimum readable typography sizes",
];

export const validationHypotheses = [
  "Can clinicians identify the next priority case quickly?",
  "Do users understand the difference between AI confidence and clinical risk?",
  "Can clinicians locate the evidence behind an AI observation?",
  "Are incomplete approval requirements easy to understand?",
  "Does the interface reduce unnecessary navigation during review?",
];

export const validationMetrics = [
  "Average case review time",
  "High-priority response time",
  "Photo retake rate",
  "Clinician override rate",
  "Report completion time",
  "Unresolved warnings before approval",
];

export const projectOutcome = {
  title: "The outcome",
  body: "SkinSight AI demonstrates how an AI-powered healthcare interface can balance speed, explainability and clinical responsibility. The final experience focuses on helping professionals review cases more efficiently while keeping critical medical decisions under human control.",
  results: [
    "Clearer case prioritization",
    "More explainable AI signals",
    "Safer report approval workflow",
  ],
};

export const caseStudyCta = {
  title: "Explore the SkinSight AI experience",
  body: "View the interactive product concept and follow the complete clinical review flow.",
  primary: { label: "Open Dashboard", href: "/" },
  secondary: { label: "View Patient Case", href: "/cases/case-001" },
};

export const designSystemComponents = [
  { label: "Primary and secondary buttons", icon: Workflow },
  { label: "Priority badges", icon: ListOrdered },
  { label: "Status badges", icon: ClipboardCheck },
  { label: "Patient cards", icon: Users },
  { label: "Information cards", icon: Layers },
  { label: "Form inputs", icon: Scan },
  { label: "Progress indicators", icon: ArrowRightLeft },
  { label: "Empty states", icon: Eye },
  { label: "Warning and success messages", icon: ShieldCheck },
];
