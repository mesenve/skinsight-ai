import { Building2, Stethoscope } from "lucide-react";
import { SectionHeader } from "@/components/about/SectionHeader";
import { userInsight, userPersonas } from "@/lib/case-study-data";

const personaIcons = [Stethoscope, Building2];

export function UserPersonas() {
  return (
    <section className="rounded-2xl bg-background/50 px-5 py-8 sm:px-8 sm:py-10">
      <SectionHeader title="Understanding the users" className="mb-8" />
      <div className="grid gap-5 lg:grid-cols-2">
        {userPersonas.map((persona, index) => {
          const Icon = personaIcons[index] ?? Stethoscope;
          return (
            <article key={persona.title} className="smooth-card rounded-2xl p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-medical-blue/8 text-medical-blue">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-4 text-lg font-bold text-navy">
                {persona.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {persona.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-medical-blue/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <p className="mt-6 rounded-xl border border-medical-blue/15 bg-medical-blue/[0.04] px-4 py-3 text-sm leading-relaxed text-navy">
        {userInsight}
      </p>
    </section>
  );
}
