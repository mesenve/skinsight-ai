"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Building2,
  CalendarClock,
  Check,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { LogoMark } from "@/components/shared/LogoMark";
import { Button } from "@/components/ui/Button";
import {
  roleOptions,
  saveClinicianProfile,
  specialtyLabel,
  specialtyOptions,
  thresholdOptions,
  type ClinicianProfile,
  type ClinicianRole,
  type SpecialtyFocus,
  type TriageThreshold,
  roleLabel,
} from "@/lib/clinician-profile";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "account", label: "Account", icon: UserRound },
  { id: "practice", label: "Practice", icon: Building2 },
  { id: "preferences", label: "Preferences", icon: Bell },
  { id: "ready", label: "Ready", icon: ShieldCheck },
] as const;

const inputClass =
  "smooth-card w-full rounded-xl border border-border-subtle/80 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-all placeholder:text-muted-light focus:border-medical-blue/30 focus:shadow-[var(--shadow-soft)] focus:ring-2 focus:ring-medical-blue/15";

function OptionCard({
  selected,
  title,
  description,
  onClick,
}: {
  selected: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-3 text-left transition-all duration-200",
        selected
          ? "border-medical-blue/35 bg-medical-blue/[0.06] shadow-[var(--shadow-soft)] ring-1 ring-medical-blue/20"
          : "border-border-subtle/80 bg-white hover:border-medical-blue/25 hover:bg-medical-blue/[0.03]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-navy">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
        </div>
        <span
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
            selected
              ? "border-medical-blue bg-medical-blue text-white"
              : "border-border-subtle bg-white text-transparent"
          )}
        >
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      </div>
    </button>
  );
}

function ToggleRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: typeof Bell;
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-4 rounded-xl border border-border-subtle/80 bg-white px-4 py-3 text-left transition-all hover:border-medical-blue/20"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-medical-blue/[0.08] text-medical-blue">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-navy">{title}</span>
        <span className="mt-0.5 block text-xs text-muted">{description}</span>
      </span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-medical-blue" : "bg-border"
        )}
        aria-hidden
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}

export function ClinicianOnboardingWizard() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [specialty, setSpecialty] = useState<SpecialtyFocus>("general_derm");
  const [role, setRole] = useState<ClinicianRole>("attending");
  const [triageThreshold, setTriageThreshold] =
    useState<TriageThreshold>("balanced");
  const [notifyHighRisk, setNotifyHighRisk] = useState(true);
  const [notifyFollowUps, setNotifyFollowUps] = useState(true);

  const step = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const summary = useMemo(
    () => ({
      fullName: fullName.trim() || "Your profile",
      clinicName: clinicName.trim() || "Your clinic",
      specialty: specialtyLabel(specialty),
      role: roleLabel(role),
    }),
    [clinicName, fullName, role, specialty]
  );

  const goTo = (nextIndex: number) => {
    setDirection(nextIndex > stepIndex ? 1 : -1);
    setError(null);
    setStepIndex(nextIndex);
  };

  const handleNext = () => {
    // Demo: allow advancing without filling fields
    setError(null);
    if (stepIndex < STEPS.length - 1) goTo(stepIndex + 1);
  };

  const handleBack = () => {
    if (stepIndex === 0) return;
    goTo(stepIndex - 1);
  };

  const handleFinish = () => {
    setSaving(true);
    const profile: ClinicianProfile = {
      fullName: fullName.trim() || "Dr. Maya Laurent",
      email: email.trim() || "maya.laurent@clinic.com",
      clinicName: clinicName.trim() || "Aurora Dermatology Center",
      specialty,
      role,
      triageThreshold,
      notifyHighRisk,
      notifyFollowUps,
      completedAt: new Date().toISOString(),
    };

    try {
      saveClinicianProfile(profile);
      router.push("/app");
    } catch {
      setError("Could not save your profile. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark size={40} />
          <div>
            <p className="font-display text-sm font-bold tracking-tight text-navy">
              SkinSight AI
            </p>
            <p className="text-[11px] font-medium text-muted">
              Clinician onboarding
            </p>
          </div>
        </Link>
        <Link
          href="/app"
          className="text-sm font-medium text-muted transition-colors hover:text-medical-blue"
        >
          Skip for now
        </Link>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="section-label">Step {stepIndex + 1} of {STEPS.length}</p>
            <h1 className="font-display mt-1 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {step.label}
            </h1>
          </div>
          <p className="text-xs font-semibold text-medical-blue">
            {Math.round(progress)}%
          </p>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/80 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-medical-blue via-medical-blue-light to-cyan-accent"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            const complete = index < stepIndex;
            const current = index === stepIndex;
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-2.5 py-2 text-[11px] font-semibold sm:text-xs",
                  current && "bg-white text-navy shadow-[var(--shadow-soft)]",
                  complete && "text-medical-blue",
                  !current && !complete && "text-muted-light"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    current && "bg-medical-blue text-white",
                    complete && "bg-medical-blue/10 text-medical-blue",
                    !current && !complete && "bg-white/70 text-muted-light"
                  )}
                >
                  {complete ? (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  ) : (
                    <Icon className="h-3 w-3" />
                  )}
                </span>
                <span className="hidden truncate sm:inline">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="smooth-card flex-1 rounded-2xl p-5 sm:p-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {step.id === "account" && (
              <div className="space-y-5">
                <div>
                  <p className="text-sm leading-relaxed text-muted">
                    Create your clinician account to access the triage workspace.
                    Demo only — no real authentication.
                  </p>
                </div>
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-navy">Full name</span>
                  <input
                    className={inputClass}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Maya Laurent"
                    autoComplete="name"
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-navy">Work email</span>
                  <input
                    type="email"
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya.laurent@clinic.com"
                    autoComplete="email"
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-navy">Password</span>
                  <input
                    type="password"
                    className={inputClass}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                  />
                </label>
              </div>
            )}

            {step.id === "practice" && (
              <div className="space-y-6">
                <p className="text-sm leading-relaxed text-muted">
                  Tell us where you practice so triage defaults fit your clinic.
                </p>
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold text-navy">
                    Clinic or hospital
                  </span>
                  <input
                    className={inputClass}
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    placeholder="Aurora Dermatology Center"
                  />
                </label>

                <div>
                  <p className="mb-2 text-xs font-semibold text-navy">Specialty focus</p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {specialtyOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={specialty === option.value}
                        title={option.label}
                        description={option.description}
                        onClick={() => setSpecialty(option.value)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold text-navy">Role</p>
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {roleOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={role === option.value}
                        title={option.label}
                        description={option.description}
                        onClick={() => setRole(option.value)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step.id === "preferences" && (
              <div className="space-y-6">
                <p className="text-sm leading-relaxed text-muted">
                  Set how aggressively SkinSight should surface cases in your queue.
                </p>

                <div>
                  <p className="mb-2 text-xs font-semibold text-navy">
                    Triage sensitivity
                  </p>
                  <div className="grid gap-2.5">
                    {thresholdOptions.map((option) => (
                      <OptionCard
                        key={option.value}
                        selected={triageThreshold === option.value}
                        title={option.label}
                        description={option.description}
                        onClick={() => setTriageThreshold(option.value)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-navy">Alerts</p>
                  <ToggleRow
                    icon={Bell}
                    title="High-risk case alerts"
                    description="Notify when a new elevated-risk lesion enters the queue"
                    checked={notifyHighRisk}
                    onChange={setNotifyHighRisk}
                  />
                  <ToggleRow
                    icon={CalendarClock}
                    title="Follow-up reminders"
                    description="Surface scheduled check-ins for the day"
                    checked={notifyFollowUps}
                    onChange={setNotifyFollowUps}
                  />
                </div>
              </div>
            )}

            {step.id === "ready" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-gradient-to-br from-medical-blue to-navy px-5 py-6 text-white">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <Sparkles className="h-5 w-5 text-cyan-accent" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-white/55">
                        Profile ready
                      </p>
                      <h2 className="mt-1 font-display text-xl font-bold">
                        Welcome, {summary.fullName}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        Your triage workspace is configured. AI remains decision
                        support only — final judgment stays with you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Clinic", value: summary.clinicName },
                    { label: "Role", value: summary.role },
                    { label: "Specialty", value: summary.specialty },
                    {
                      label: "Triage mode",
                      value:
                        thresholdOptions.find((o) => o.value === triageThreshold)
                          ?.label ?? triageThreshold,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="smooth-inset rounded-xl px-4 py-3"
                    >
                      <p className="section-label text-[10px]">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-navy">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <p className="mt-5 rounded-xl border border-risk-high/20 bg-risk-high/5 px-4 py-3 text-sm text-risk-high">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-border-subtle/80 pt-5">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={stepIndex === 0}
            className={cn(stepIndex === 0 && "invisible")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {step.id !== "ready" ? (
            <Button variant="primary" onClick={handleNext}>
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ai" onClick={handleFinish} disabled={saving}>
              {saving ? "Opening workspace…" : "Enter triage dashboard"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-muted">
        Portfolio demo onboarding. No credentials are sent to a server.
      </p>
    </div>
  );
}
