"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface DoctorNotesPanelProps {
  initialNotes: string;
  /** Embedded in patient header — no outer card */
  compact?: boolean;
}

export function DoctorNotesPanel({
  initialNotes,
  compact = false,
}: DoctorNotesPanelProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const content = (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {!compact && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-medical-blue/8 text-medical-blue">
              <StickyNote className="h-4 w-4" />
            </div>
          )}
          <div className="min-w-0">
            <p className="section-label">Private Notes</p>
            <h3 className="font-display text-sm font-bold text-navy">
              Clinician Notes
            </h3>
          </div>
        </div>
        <Button variant="secondary" size="md" onClick={handleSave} className="shrink-0">
          <Save className="h-4 w-4" />
          <AnimatePresence mode="wait">
            <motion.span
              key={saved ? "saved" : "save"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {saved ? "Saved" : "Save"}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>

      <textarea
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          setSaved(false);
        }}
        rows={compact ? 3 : 4}
        className={cn(
          "smooth-inset w-full resize-none rounded-xl px-4 py-3 text-sm leading-relaxed text-navy outline-none transition-all focus:bg-white focus:shadow-[var(--shadow-soft)]",
          compact ? "mt-3" : "mt-4"
        )}
        placeholder="Clinical observations, follow-up plans, verification notes..."
      />
    </>
  );

  if (compact) return <div className="h-full">{content}</div>;

  return <div className="smooth-card rounded-2xl p-5">{content}</div>;
}
