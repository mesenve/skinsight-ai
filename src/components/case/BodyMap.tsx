"use client";

import { useMemo } from "react";
import type { BodyMapRegion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { regionMeta } from "./body-map-regions";

function lesionIdFromCase(caseId: string) {
  return `L-${caseId.replace("case-", "").padStart(3, "0")}`;
}

interface BodyMapProps {
  region: BodyMapRegion;
  lesionLocation: string;
  caseId: string;
  scanCount: number;
  lastScanDate: string;
  className?: string;
}

function BodyFigure({ markerTop, markerLeft }: { markerTop: string; markerLeft: string }) {
  return (
    <div className="relative shrink-0" aria-hidden>
      <svg
        viewBox="0 0 60 120"
        width="56"
        height="112"
        className="text-navy/20"
        fill="currentColor"
      >
        <ellipse cx="30" cy="10" rx="9" ry="10" />
        <rect x="26" y="18" width="8" height="7" rx="2" />
        <path d="M18 25 Q15 26 14 36 L13 60 Q13 62 15 62 L45 62 Q47 62 47 60 L46 36 Q45 26 42 25 Z" />
        <path d="M18 27 Q10 30 9 55 Q9 58 12 58 Q15 58 15 55 L16 40 Q18 34 20 30 Z" />
        <path d="M42 27 Q50 30 51 55 Q51 58 48 58 Q45 58 45 55 L44 40 Q42 34 40 30 Z" />
        <path d="M15 62 L14 100 Q14 103 17 103 Q20 103 21 100 L22 74 L25 62 Z" />
        <path d="M45 62 L46 100 Q46 103 43 103 Q40 103 39 100 L38 74 L35 62 Z" />
        <ellipse cx="17" cy="105" rx="5" ry="3" />
        <ellipse cx="43" cy="105" rx="5" ry="3" />
      </svg>
      <div
        className="absolute h-2.5 w-2.5 rounded-full bg-cyan-accent ring-2 ring-white shadow-sm shadow-cyan-accent/30"
        style={{
          top: markerTop,
          left: markerLeft,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute h-5 w-5 rounded-full bg-cyan-accent/15"
        style={{
          top: markerTop,
          left: markerLeft,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

export function BodyMap({
  region,
  lesionLocation,
  caseId,
  scanCount,
  className,
}: BodyMapProps) {
  const meta = useMemo(() => regionMeta[region], [region]);
  const lesionId = lesionIdFromCase(caseId);

  const fields = [
    { label: "Side", value: meta.side },
    { label: "Region", value: meta.regionGroup },
    { label: "Lesion ID", value: lesionId },
    { label: "Total scans", value: String(scanCount) },
  ];

  return (
    <div
      className={cn("smooth-card rounded-[18px] p-5", className)}
      aria-label={`Location: ${lesionLocation}`}
    >
      <div className="mb-4">
        <p className="section-label">Location</p>
        <h3 className="font-display mt-1 text-sm font-bold text-navy">{meta.label}</h3>
        <p className="mt-0.5 text-xs text-muted">{meta.subtitle}</p>
      </div>

      <div className="flex items-center gap-5">
        <BodyFigure markerTop={meta.markerTop} markerLeft={meta.markerLeft} />

        <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-4 gap-y-3">
          {fields.map((field) => (
            <div key={field.label}>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-light">
                {field.label}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-navy">{field.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
