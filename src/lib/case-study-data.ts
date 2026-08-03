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
  title: "AI-assisted dermatology triage for clinicians",
  description:
    "A portfolio concept showing how AI can help prioritize and review skin cases—without replacing clinical judgment.",
  disclaimer:
    "Fictional patient data. Not affiliated with any clinical product.",
};

export const caseStudyMeta: CaseStudyMetaItem[] = [
  { label: "Role", value: "Product Designer" },
  { label: "Platform", value: "Responsive Web App" },
  { label: "Type", value: "Independent Portfolio Concept" },
];

export const projectOverview = {
  challenge: {
    title: "The challenge",
    body: "Clinicians review many lesion images daily. AI can help triage, but unclear scores and noisy interfaces create new risks.",
    question:
      "How might we speed up priority review while keeping human judgment and transparency central?",
  },
  product: {
    title: "The product",
    body: "SkinSight AI organizes cases, surfaces AI observations, and guides review through intake → AI review → clinician sign-off.",
    benefits: [
      {
        title: "Priority queue",
        description: "High-risk cases rise to the top with clear status.",
      },
      {
        title: "Scan timeline",
        description: "Compare captures over time before signing off.",
      },
      {
        title: "Explainable AI",
        description: "ABCDE signals with short clinician-facing notes.",
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
    body: "AI output is decision support, not diagnosis.",
  },
  {
    icon: Eye,
    title: "Explain, don’t only score",
    body: "Priority links to visible evidence and notes.",
  },
  {
    icon: ClipboardCheck,
    title: "Safety before speed",
    body: "Critical actions need completed clinical checks.",
  },
  {
    icon: Layers,
    title: "Progressive disclosure",
    body: "Essentials first; details on demand.",
  },
];

export const clinicalUserFlow: CaseStudyFlowStep[] = [
  {
    step: 1,
    title: "Intake",
    description: "Case enters the queue with scan and patient context.",
  },
  {
    step: 2,
    title: "AI Review",
    description: "GPT-assisted ABCDE signals for clinician review.",
  },
  {
    step: 3,
    title: "Assessment",
    description: "Clinician records findings and overrides if needed.",
  },
  {
    step: 4,
    title: "Report",
    description: "Checklist-gated approval and follow-up scheduling.",
  },
];

export const flowNote =
  "AI review runs before assessment but cannot approve reports on its own.";

export const designDecisions: CaseStudyDecision[] = [
  {
    id: "01",
    title: "Priority queue over flat lists",
    body: "Urgency, wait time and status help clinicians start with the right case.",
  },
  {
    id: "02",
    title: "Separate score, confidence and evidence",
    body: "Risk signal, model output and ABCDE notes stay distinct to avoid misreads.",
  },
  {
    id: "03",
    title: "Human-controlled approval",
    body: "Report sign-off stays disabled until the clinical checklist is complete.",
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
  body: "A faster review flow with explainable AI signals and approval steps that keep clinicians in control.",
  results: [
    "Clearer case prioritization",
    "Explainable ABCDE review",
    "Safer report approval",
  ],
};

export const caseStudyCta = {
  title: "Try the prototype",
  body: "Register as a clinician, then open the triage dashboard.",
  primary: { label: "Clinician onboarding", href: "/onboarding" },
  secondary: { label: "Open Dashboard", href: "/app" },
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
