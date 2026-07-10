"use client";

import { Scan, ZoomIn } from "lucide-react";
import { LesionPhoto } from "@/components/shared/LesionPhoto";
import { Button } from "@/components/ui/Button";
import { AIScanOverlay } from "./AIScanOverlay";

interface LesionImageViewerProps {
  imageUrl: string;
  alt: string;
  isScanning: boolean;
  scanKey: number;
  onScanComplete: () => void;
  onRunScan: () => void;
}

export function LesionImageViewer({
  imageUrl,
  alt,
  isScanning,
  scanKey,
  onScanComplete,
  onRunScan,
}: LesionImageViewerProps) {
  return (
    <div className="smooth-card overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="section-label">Dermoscopic Image</p>
          <h3 className="font-display mt-0.5 text-base font-bold text-navy">
            Lesion Capture
          </h3>
        </div>
        {!isScanning && (
          <Button variant="ai" size="md" onClick={onRunScan} disabled={isScanning} className="group">
            <Scan className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Run AI Review
          </Button>
        )}
      </div>

      <div className="p-4">
        <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-navy/5 shadow-inner">
          <LesionPhoto
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <AIScanOverlay
            key={scanKey}
            active={isScanning}
            onComplete={onScanComplete}
          />
          <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-navy/50 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-3.5 w-3.5" />
            Inspect
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] text-muted-light">
          ISIC Archive reference imagery · For portfolio demonstration only
        </p>
      </div>
    </div>
  );
}
