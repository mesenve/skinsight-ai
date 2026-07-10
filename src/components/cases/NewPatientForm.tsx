"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, UserRound } from "lucide-react";
import { regionMeta } from "@/components/case/body-map-regions";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useCases } from "@/context/CasesContext";
import { buildCustomPatientCase } from "@/lib/create-patient-case";
import type { BodyMapRegion } from "@/lib/types";
import { cn } from "@/lib/utils";

const regionOptions = Object.entries(regionMeta).map(([value, meta]) => ({
  value: value as BodyMapRegion,
  label: meta.label,
  subtitle: meta.subtitle,
}));

const inputClass =
  "smooth-card w-full rounded-xl border border-border-subtle/80 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-all placeholder:text-muted-light focus:shadow-[var(--shadow-soft)]";

export function NewPatientForm() {
  const router = useRouter();
  const { addCase } = useCases();
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [mrn, setMrn] = useState("");
  const [bodyMapRegion, setBodyMapRegion] = useState<BodyMapRegion>("left_forearm");
  const [doctorNotes, setDoctorNotes] = useState("");
  const [lesionPreview, setLesionPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const lesionLocation = useMemo(
    () => regionMeta[bodyMapRegion].label,
    [bodyMapRegion]
  );

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setLesionPreview(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError("Image must be smaller than 4 MB for this demo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLesionPreview(typeof reader.result === "string" ? reader.result : null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const parsedAge = Number(age);
    if (!patientName.trim()) {
      setError("Patient name is required.");
      return;
    }
    if (!parsedAge || parsedAge < 1 || parsedAge > 120) {
      setError("Enter a valid patient age.");
      return;
    }
    if (!lesionPreview) {
      setError("Upload a lesion image to continue.");
      return;
    }

    setSubmitting(true);

    try {
      const patientCase = buildCustomPatientCase({
        patientName,
        age: parsedAge,
        mrn: mrn.trim() || undefined,
        bodyMapRegion,
        lesionLocation,
        lesionImageUrl: lesionPreview,
        doctorNotes,
      });

      addCase(patientCase);
      router.push(`/cases/${patientCase.id}?analyzing=1`);
    } catch {
      setError("Could not save this case. Try a smaller image.");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-medical-blue"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to queue
      </Link>

      <div className="smooth-card rounded-2xl p-6 sm:p-8">
        <p className="section-label">Patient Intake</p>
        <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-navy">
          Add new case
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Register a new patient scan for AI-assisted triage review. Uploaded
          images stay in this browser for the portfolio demo.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-navy">Patient details</h3>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted">Full name</span>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Elena Vasquez"
                  className={inputClass}
                  required
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-muted">Age</span>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="54"
                    className={inputClass}
                    required
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-muted">
                    MRN <span className="text-muted-light">(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={mrn}
                    onChange={(e) => setMrn(e.target.value)}
                    placeholder="Auto-generated if empty"
                    className={inputClass}
                  />
                </label>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted">Lesion location</span>
                <Select
                  value={bodyMapRegion}
                  onChange={setBodyMapRegion}
                  options={regionOptions.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                  aria-label="Lesion location"
                />
                <p className="text-[11px] text-muted-light">
                  {regionMeta[bodyMapRegion].subtitle}
                </p>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted">
                  Intake notes <span className="text-muted-light">(optional)</span>
                </span>
                <textarea
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  rows={4}
                  placeholder="Reason for referral, patient-reported changes..."
                  className={cn(inputClass, "resize-none")}
                />
              </label>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-navy">Lesion capture</h3>

              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                />
                <div
                  className={cn(
                    "smooth-inset flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border-subtle/80 p-6 text-center transition-colors hover:border-medical-blue/30 hover:bg-white/70",
                    lesionPreview && "border-solid p-3"
                  )}
                >
                  {lesionPreview ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy/5">
                      <Image
                        src={lesionPreview}
                        alt="Lesion preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-medical-blue/8 text-medical-blue">
                        <ImagePlus className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-navy">
                        Upload dermoscopic image
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        PNG or JPG · max 4 MB
                      </p>
                    </>
                  )}
                </div>
              </label>

              <div className="smooth-inset rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-medical-blue/8 text-medical-blue">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">After intake</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      The case opens in review mode. Run AI Review to generate
                      ABCDE signals before clinician verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {error && (
            <p className="rounded-xl border border-risk-high/20 bg-risk-high/5 px-4 py-3 text-sm text-risk-high">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-border-subtle/70 pt-6 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={submitting}>
              {submitting ? "Creating case..." : "Create case & run review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
