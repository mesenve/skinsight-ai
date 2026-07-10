"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import type { ScanEvent } from "@/lib/types";

import { cn } from "@/lib/utils";

interface BeforeAfterCompareProps {
  events: ScanEvent[];
  className?: string;
}

export function BeforeAfterCompare({ events, className }: BeforeAfterCompareProps) {
  const [sliderPos, setSliderPos] = useState(50);

  if (events.length < 2) {
    return (
      <div className="smooth-card rounded-2xl p-5">
        <p className="section-label">Comparison</p>
        <h3 className="font-display mt-0.5 text-base font-bold text-navy">
          Before / After
        </h3>
        <p className="mt-4 text-sm text-muted">
          At least two scans are needed for temporal comparison.
        </p>
      </div>
    );
  }

  const before = events[events.length - 1];
  const after = events[0];

  return (
    <div className={cn("smooth-card overflow-hidden rounded-2xl", className)}>
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="section-label">Evolution Tracking</p>
          <h3 className="font-display mt-0.5 text-base font-bold text-navy">
            Before / After
          </h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs text-muted">
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Drag to compare
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl shadow-inner">
          <Image
            src={before.imageUrl}
            alt="Before scan"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <Image
              src={after.imageUrl}
              alt="After scan"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div
            className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-lg"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy text-white shadow-xl">
              <ArrowLeftRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 z-20 w-full cursor-ew-resize opacity-0"
            aria-label="Compare before and after scans"
          />

          <span className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-navy/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {new Date(before.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-medical-blue/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {new Date(after.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
