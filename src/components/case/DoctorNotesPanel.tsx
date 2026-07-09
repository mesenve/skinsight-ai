"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, StickyNote } from "lucide-react";

interface DoctorNotesPanelProps {
  initialNotes: string;
}

export function DoctorNotesPanel({ initialNotes }: DoctorNotesPanelProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="smooth-card rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-medical-blue/8 text-medical-blue">
            <StickyNote className="h-4 w-4" />
          </div>
          <div>
            <p className="section-label">Private Notes</p>
            <h3 className="font-display text-sm font-bold text-navy">
              Clinician Notes
            </h3>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-semibold text-muted transition-all hover:bg-medical-blue/8 hover:text-medical-blue"
        >
          <Save className="h-3.5 w-3.5" />
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
        </button>
      </div>

      <textarea
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          setSaved(false);
        }}
        rows={4}
        className="smooth-inset mt-4 w-full resize-none rounded-xl px-4 py-3 text-sm leading-relaxed text-navy outline-none transition-all focus:bg-white focus:shadow-[var(--shadow-soft)]"
        placeholder="Clinical observations, follow-up plans, verification notes..."
      />
    </div>
  );
}
