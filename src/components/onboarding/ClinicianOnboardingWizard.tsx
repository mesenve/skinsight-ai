"use client";

import { useState } from "react";
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
  Eye,
  EyeOff,
  UserRound,
} from "lucide-react";
import { LogoMark } from "@/components/shared/LogoMark";
import { Button } from "@/components/ui/Button";
import { OnboardingVisualPanel } from "@/components/onboarding/OnboardingVisualPanel";
import {
  roleOptions,
  saveClinicianProfile,
  specialtyOptions,
  thresholdOptions,
  type ClinicianProfile,
  type ClinicianRole,
  type SpecialtyFocus,
  type TriageThreshold,
} from "@/lib/clinician-profile";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "account", label: "Account", icon: UserRound },
  { id: "practice", label: "Practice", icon: Building2 },
  { id: "preferences", label: "Preferences", icon: Bell },
] as const;

const inputClass =
  "w-full rounded-xl border border-border-subtle/80 bg-white px-3.5 py-2 text-sm text-navy outline-none transition-all placeholder:text-[#a8b3c2] shadow-[0_1px_2px_rgba(11,18,32,0.04)] focus:border-medical-blue/35 focus:shadow-[0_0_0_3px_rgba(26,75,140,0.12)] focus:ring-0";

const passwordRules = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    id: "upper",
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "lower",
    label: "One lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    id: "number",
    label: "One number",
    test: (value: string) => /\d/.test(value),
  },
] as const;

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  visible,
  onToggleVisible,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
  visible: boolean;
  onToggleVisible: () => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-navy">{label}</span>
      <div className="relative p-0.5 -m-0.5">
        <input
          type={visible ? "text" : "password"}
          className={cn(inputClass, "pr-11")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={onToggleVisible}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted transition-colors hover:text-navy"
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </label>
  );
}

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
        "rounded-xl border px-3 py-2.5 text-left transition-all duration-200",
        selected
          ? "border-medical-blue bg-medical-blue/[0.05]"
          : "border-border-subtle/80 bg-white hover:border-medical-blue/25 hover:bg-medical-blue/[0.03]"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-navy sm:text-sm">{title}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-muted">{description}</p>
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

function PreferenceOption({
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
        "flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-all duration-200",
        selected
          ? "border-medical-blue bg-medical-blue/[0.05]"
          : "border-border-subtle/80 bg-white hover:border-medical-blue/25 hover:bg-medical-blue/[0.03]"
      )}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-navy">{title}</span>
        <span className="mt-0.5 block text-[11px] leading-snug text-muted">
          {description}
        </span>
      </span>
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
          selected
            ? "border-medical-blue bg-medical-blue text-white"
            : "border-border-subtle bg-white text-transparent"
        )}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
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
      className="flex w-full items-center gap-3 rounded-xl border border-border-subtle/80 bg-white px-3 py-2.5 text-left transition-all hover:border-medical-blue/20"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-medical-blue/[0.08] text-medical-blue">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold text-navy sm:text-sm">{title}</span>
        <span className="mt-0.5 block text-[11px] leading-snug text-muted">{description}</span>
      </span>
      <span
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors",
          checked ? "bg-medical-blue" : "bg-border"
        )}
        aria-hidden
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-4" : "translate-x-0.5"
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [clinicName, setClinicName] = useState("");
  const [specialty, setSpecialty] = useState<SpecialtyFocus[]>(["general_derm"]);
  const [role, setRole] = useState<ClinicianRole>("attending");
  const [triageThreshold, setTriageThreshold] =
    useState<TriageThreshold>("balanced");
  const [notifyHighRisk, setNotifyHighRisk] = useState(true);
  const [notifyFollowUps, setNotifyFollowUps] = useState(true);

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const step = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;
  const isLastStep = stepIndex === STEPS.length - 1;

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
    <div className="flex h-dvh items-center justify-center overflow-hidden px-3 py-3 sm:px-5 sm:py-4">
      <div className="grid h-full w-full max-w-6xl overflow-hidden rounded-[1.5rem] border border-border-subtle/80 bg-white shadow-[var(--shadow-elevated)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        {/* Left — form */}
        <div className="flex min-h-0 min-w-0 flex-col p-4 sm:p-5 lg:p-6">
          <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark size={32} />
              <div>
                <p className="font-display text-sm font-bold tracking-tight text-navy">
                  SkinSight AI
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                  Clinician
                </p>
              </div>
            </Link>
          </div>

          <div className="mb-3 shrink-0">
            <div className="mb-2">
              <p className="section-label">
                Step {stepIndex + 1} of {STEPS.length}
              </p>
              <h1 className="font-display mt-0.5 text-xl font-bold tracking-tight text-navy sm:text-2xl">
                {step.label}
              </h1>
            </div>

            <div className="h-1 overflow-hidden rounded-full bg-background shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-medical-blue via-medical-blue-light to-cyan-accent"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto px-1.5 py-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -16 }}
                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
            {step.id === "account" && (
              <div className="space-y-4">
                <p className="text-xs leading-relaxed text-muted sm:text-sm">
                  Create your clinician account.
                </p>
                <label className="block space-y-1.5 px-0.5">
                  <span className="text-xs font-semibold text-navy">Full name</span>
                  <input
                    className={inputClass}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Maya Laurent"
                    autoComplete="name"
                  />
                </label>
                <label className="block space-y-1.5 px-0.5">
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

                <div className="space-y-2">
                  <PasswordField
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    visible={showPassword}
                    onToggleVisible={() => setShowPassword((v) => !v)}
                  />

                  <div className="rounded-xl border border-border-subtle/70 bg-background/60 px-3 py-2">
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                      {passwordRules.map((rule) => {
                        const passed = rule.test(password);
                        return (
                          <li
                            key={rule.id}
                            className={cn(
                              "flex items-center gap-1.5 text-[11px]",
                              passed ? "text-risk-low" : "text-muted"
                            )}
                          >
                            <Check
                              className={cn(
                                "h-3 w-3 shrink-0",
                                passed ? "opacity-100" : "opacity-30"
                              )}
                              strokeWidth={3}
                            />
                            {rule.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <PasswordField
                  label="Confirm password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  visible={showConfirmPassword}
                  onToggleVisible={() => setShowConfirmPassword((v) => !v)}
                />

                {passwordsMatch && (
                  <p className="text-xs font-medium text-risk-low">
                    Passwords match
                  </p>
                )}
                {passwordsMismatch && (
                  <p className="text-xs font-medium text-risk-high">
                    Passwords don&apos;t match
                  </p>
                )}
              </div>
            )}

            {step.id === "practice" && (
              <div className="space-y-4">
                <p className="text-xs leading-relaxed text-muted sm:text-sm">
                  Tell us where you practice so triage defaults fit your clinic.
                </p>
                <label className="block space-y-1.5 px-0.5">
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
                  <p className="mb-2.5 text-xs font-semibold text-navy">Specialty focus</p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {specialtyOptions.map((option) => {
                      const selected = specialty.includes(option.value);
                      return (
                        <OptionCard
                          key={option.value}
                          selected={selected}
                          title={option.label}
                          description={option.description}
                          onClick={() =>
                            setSpecialty((prev) =>
                              prev.includes(option.value)
                                ? prev.filter((item) => item !== option.value)
                                : [...prev, option.value]
                            )
                          }
                        />
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-2.5 text-xs font-semibold text-navy">Role</p>
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
              <div className="space-y-4">
                <p className="text-xs leading-relaxed text-muted">
                  Set how aggressively SkinSight surfaces cases in your queue.
                </p>

                <div>
                  <p className="mb-2.5 text-xs font-semibold text-navy">
                    Triage sensitivity
                  </p>
                  <div className="grid gap-2.5">
                    {thresholdOptions.map((option) => (
                      <PreferenceOption
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
                    description="Notify when elevated-risk lesions enter the queue"
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
              </motion.div>
            </AnimatePresence>
            </div>

            {error && (
              <p className="mt-2 shrink-0 rounded-xl border border-risk-high/20 bg-risk-high/5 px-3 py-2 text-sm text-risk-high">
                {error}
              </p>
            )}

            <div className="mt-3 flex shrink-0 items-center justify-between gap-3 border-t border-border-subtle/80 pt-3">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={stepIndex === 0}
                className={cn(stepIndex === 0 && "invisible")}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {isLastStep ? (
                <Button variant="ai" onClick={handleFinish} disabled={saving}>
                  {saving ? "Opening…" : "Enter dashboard"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="primary" onClick={handleNext}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right — visual panel inside container */}
        <div className="relative hidden min-h-0 h-full overflow-hidden lg:block">
          <OnboardingVisualPanel stepId={step.id} stepIndex={stepIndex} />
        </div>
      </div>
    </div>
  );
}
