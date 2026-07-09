"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import {
  Calendar,
  Hash,
  Layers,
  MapPin,
  User,
} from "lucide-react";
import type { BodyMapRegion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { regionMeta } from "./body-map-regions";

const BodyMapViewer = dynamic(
  () => import("./BodyMapViewer").then((mod) => mod.BodyMapViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-cyan-accent/20" />
      </div>
    ),
  }
);

function formatScanDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

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

export function BodyMap({
  region,
  lesionLocation,
  caseId,
  scanCount,
  lastScanDate,
  className,
}: BodyMapProps) {
  const meta = useMemo(() => regionMeta[region], [region]);

  const detailRows = useMemo(
    () => [
      { icon: User, label: "Side", value: meta.side },
      { icon: MapPin, label: "Region", value: meta.regionGroup },
      { icon: Hash, label: "Lesion ID", value: lesionIdFromCase(caseId) },
      { icon: Layers, label: "Total scans", value: String(scanCount) },
      { icon: Calendar, label: "Last scan", value: formatScanDate(lastScanDate) },
    ],
    [meta, caseId, scanCount, lastScanDate]
  );

  return (
    <div className={cn("smooth-card overflow-hidden rounded-2xl", className)}>
      <div className="border-b border-border-subtle/80 px-5 pb-4 pt-5">
        <p className="section-label">Location Details</p>

        <div className="mt-3 rounded-xl bg-gradient-to-r from-cyan-accent/8 to-medical-blue/6 p-3.5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-accent/15">
              <User className="h-5 w-5 text-cyan-accent" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-base font-bold text-navy">
                {lesionLocation}
              </h3>
              <p className="mt-0.5 text-xs text-muted">{meta.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 divide-y divide-border-subtle/80 rounded-xl bg-background/60">
          {detailRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <row.icon className="h-3.5 w-3.5 text-muted-light" />
                <span className="text-xs text-muted">{row.label}</span>
              </div>
              <span className="text-xs font-semibold text-navy">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="section-label mb-3">Region Preview</p>

        <div className="relative mx-auto h-[320px] w-full max-w-[280px] sm:h-[360px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_72%,rgba(26,75,140,0.07),transparent_62%)]" />
          <div className="absolute inset-0">
            <BodyMapViewer region={region} />
          </div>
        </div>

        <p className="mt-2 text-center text-[10px] text-muted-light">
          Drag to spin · Auto-rotating anatomy view
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[10px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-accent" />
            Lesion location
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full border border-dashed border-cyan-accent/50" />
            {meta.label} region
          </span>
        </div>
      </div>
    </div>
  );
}
