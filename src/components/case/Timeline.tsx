"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ScanEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TimelineProps {
  events: ScanEvent[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export function Timeline({ events, activeId, onSelect, className }: TimelineProps) {
  return (
    <div className={cn("smooth-card rounded-2xl p-5", className)}>
      <p className="section-label">History</p>
      <h3 className="font-display mt-0.5 text-base font-bold text-navy">
        Scan Timeline
      </h3>
      <p className="mt-1 text-xs text-muted">
        Select a scan to update the lesion viewer
      </p>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
        {events.map((event, index) => {
          const isActive = activeId === event.id || (!activeId && index === 0);

          return (
            <motion.button
              key={event.id}
              type="button"
              onClick={() => onSelect?.(event.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className={cn(
                "flex w-[148px] shrink-0 flex-col rounded-xl p-2 text-left transition-all duration-200",
                isActive
                  ? "bg-medical-blue/[0.06] shadow-[var(--shadow-soft)]"
                  : "bg-background/60 hover:bg-background hover:shadow-[var(--shadow-soft)]"
              )}
            >
              <div className="relative h-[132px] w-full overflow-hidden rounded-lg bg-background shadow-inner">
                <Image
                  src={event.imageUrl}
                  alt={`Scan from ${event.date}`}
                  fill
                  className="object-cover object-center"
                  sizes="148px"
                />
                {index === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-md bg-navy/70 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                    Latest
                  </span>
                )}
              </div>
              <p className="mt-2.5 text-xs font-semibold text-navy">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted">
                {event.note}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
