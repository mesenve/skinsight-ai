"use client";

import { Search } from "lucide-react";

interface QueueSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function QueueSearch({ value, onChange }: QueueSearchProps) {
  return (
    <div className="relative w-full sm:w-80">
      <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-light" />
      <input
        type="search"
        placeholder="Search patients, location, MRN..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="smooth-card w-full rounded-xl bg-white py-2.5 pl-10 pr-4 text-sm text-navy outline-none transition-all placeholder:text-muted-light focus:shadow-[var(--shadow-hover)]"
      />
    </div>
  );
}
