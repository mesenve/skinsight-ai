"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { preload } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LogoMark } from "@/components/shared/LogoMark";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import media from "@/lib/landing-media.json";
import { ProgressiveVideo } from "@/components/landing/ProgressiveVideo";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

const faqItems = [
  {
    question: "Does SkinSight make a diagnosis?",
    answer:
      "No. SkinSight is designed as decision support. It surfaces risk signals and helps prioritize cases, while the clinician reviews the evidence and makes the final decision.",
  },
  {
    question: "How does the AI analysis work?",
    answer:
      "The workflow reviews a lesion image alongside case context and presents explainable ABCDE observations, a risk signal, and a concise summary for clinician verification.",
  },
  {
    question: "Can clinicians change the AI assessment?",
    answer:
      "Yes. Clinicians can verify or override findings, add notes, and record their own assessment before approving the report.",
  },
  {
    question: "Is patient data used in this demo?",
    answer:
      "No real patient data is required. The current portfolio demo uses fictional cases and representative clinical content to demonstrate the product workflow.",
  },
  {
    question: "Can I explore a sample clinical case?",
    answer:
      "Yes. The live demo includes a fictional sample case where you can review the lesion image, inspect ABCDE signals, add clinical notes, and preview the report workflow.",
  },
  {
    question: "Is SkinSight a medical device?",
    answer:
      "No. This version is a portfolio concept prototype and has not been validated, certified, or approved for clinical use.",
  },
] as const;


const clinicianNetwork = [
  {
    name: "Dr. James Miller",
    role: "Clinical Dermatologist",
    testimonial: "I start with the patient's history. The image is only part of the picture.",
    flag: "/flags/us.svg",
    avatar: media.sophie,
  },
  {
    name: "Dr. Sophie Laurent",
    role: "Consultant Dermatologist",
    testimonial: "I look at the reasoning behind each finding. Then I decide what needs attention.",
    flag: "/flags/fr.svg",
    avatar: media.james,
  },
  {
    name: "Dr. Aiko Tanaka",
    role: "Skin Health Specialist",
    testimonial: "A clear image makes a difference. If it's unclear, I ask for another.",
    flag: "/flags/jp.svg",
    avatar: media.aiko,
  },
  {
    name: "Dr. Leila Haddad",
    role: "Aesthetic Dermatologist",
    testimonial: "I ask about symptoms and changes over time. They help me put the image in context.",
    flag: "/flags/ae.svg",
    avatar: media.leila,
  },
  {
    name: "Dr. Levent Atahanlı",
    role: "Dermatology Advisor",
    testimonial: "I review the findings myself. Then I consider the next step for that patient.",
    flag: "/flags/tr.svg",
    avatar: media.levent,
  },
] as const;


function QuoteSlider() {
  const initialRevealDuration = 0.68 / 0.7;
  const initialRevealStagger = 0.08 / 0.7;
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneEntered = useInView(sceneRef, { once: true, amount: 0.25 });
  const sceneVisible = useInView(sceneRef, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  // An unbounded occurrence index keeps clone keys stable across the loop seam.
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [openingComplete, setOpeningComplete] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [keyboardInside, setKeyboardInside] = useState(false);
  const [resumePending, setResumePending] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [pinnedCard, setPinnedCard] = useState<number | null>(null);
  // The opening's completion starts the first slide with no additional dwell.
  // Later cards retain the existing 2s dwell and 0.68s slide.
  const remainingHold = useRef(0);

  useEffect(() => {
    if (pinnedCard !== null && Math.abs(pinnedCard - activeIndex) >= 3) setPinnedCard(null);
  }, [pinnedCard, activeIndex]);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!resumePending || pointerInside || !sceneVisible || !pageVisible) return;
    const timer = window.setTimeout(() => setResumePending(false), 1000);
    return () => window.clearTimeout(timer);
  }, [resumePending, pointerInside, sceneVisible, pageVisible]);

  useEffect(() => {
    if (!sceneEntered || !sceneVisible || !pageVisible || reducedMotion !== false ||
        (activeIndex === 0 && !openingComplete) ||
        (pointerInside && (activeIndex > 0 || hoveredCard !== null)) ||
        keyboardInside || pinnedCard !== null || (resumePending && activeIndex > 0) || transitioning) return;
    const startedAt = performance.now();
    let fired = false;
    const timer = window.setTimeout(() => {
      fired = true;
      setTransitioning(true);
      setActiveIndex((index) => index + 1);
    }, remainingHold.current);
    return () => {
      window.clearTimeout(timer);
      if (!fired) remainingHold.current = Math.max(0, remainingHold.current - (performance.now() - startedAt));
    };
  }, [sceneEntered, sceneVisible, pageVisible, reducedMotion, pointerInside, hoveredCard, keyboardInside, pinnedCard, resumePending, transitioning, activeIndex, openingComplete]);
  const [sceneWidth, setSceneWidth] = useState(1152);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const observer = new ResizeObserver(([entry]) => setSceneWidth(entry.contentRect.width));
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  const cardWidth = Math.min(240, Math.max(130, sceneWidth / 4.5)) * 1.15;
  const gap = sceneWidth < 640 ? 16 : 24;
  const perspective = 1000;
  // Project the edges of the rotated rectangles, rather than their untransformed widths.
  const poses = [{ x: 0, y: 0, z: 0, scale: 0.85, angle: 0, opacity: 1, layer: 10 }];
  let rightEdge = cardWidth * poses[0].scale / 2;
  for (let depth = 1; depth <= 4; depth++) {
    const scale = depth === 1 ? 0.83 : depth === 2 ? 0.72 : depth === 3 ? 0.62 : 0.55;
    // Off-axis perspective reduces the apparent yaw; compensate so neighbours
    // remain visibly turned toward the center from the viewer's position.
    const angle = depth === 1 ? -40 : depth === 2 ? -58 : depth === 3 ? -68 : -75;
    const z = depth === 1 ? -55 : depth === 2 ? -110 : depth === 3 ? -180 : -260;
    const radians = angle * Math.PI / 180;
    const half = cardWidth * scale / 2;
    const x = (rightEdge + gap) * (perspective - z - half * Math.sin(radians)) / perspective + half * Math.cos(radians);
    rightEdge = (x + half * Math.cos(radians)) * perspective / (perspective - z + half * Math.sin(radians));
    poses.push({ x, y: depth === 1 ? 8 : depth === 2 ? 12 : 16, z, scale, angle, opacity: depth === 4 ? 0 : depth === 3 ? 0.22 : 1, layer: depth === 1 ? 8 : depth === 2 ? 5 : 2 });
  }
  const doctorOrder = [4, 1, 2, 0, 3];
  const cards = Array.from({ length: 9 }, (_, index) => {
    const slot = index - 4;
    const occurrence = activeIndex + slot;
    const doctorIndex = ((occurrence % doctorOrder.length) + doctorOrder.length) % doctorOrder.length;
    return { doctor: clinicianNetwork[doctorOrder[doctorIndex]], slot, occurrence };
  });
  return (
    <section className="relative overflow-hidden bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl pt-10 text-center sm:pt-12">
          <p className="section-label text-medical-blue">Clinician perspective</p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Built with doctors,
            <br />
            <span className="text-medical-blue">trusted worldwide.</span>
          </h2>
        </div>

        <div ref={sceneRef}
          onPointerEnter={(event) => { if (event.pointerType === "mouse") { setPointerInside(true); setResumePending(false); } }}
          onPointerLeave={(event) => { if (event.pointerType === "mouse") { setPointerInside(false); setHoveredCard(null); setResumePending(true); } }}
          onFocusCapture={(event) => { if (event.target.matches(":focus-visible")) setKeyboardInside(true); }}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardInside(false); }}
          data-active-index={activeIndex}
          data-opening-complete={openingComplete}
          data-transitioning={transitioning}
          aria-label="Doctor showcase"
          className="doctor-carousel relative isolate mt-6 flex min-h-[28rem] items-center justify-center overflow-visible sm:min-h-[30rem]">
          <div className="globe-float relative h-[25rem] w-[25rem] sm:h-[30rem] sm:w-[30rem]" aria-hidden="true">
            <span className="globe-halo absolute inset-[7%] z-0 rounded-full" />
            <span className="globe-holo-aura globe-holo-aura-outer absolute z-0" />
            <span className="globe-holo-aura globe-holo-aura-inner absolute z-0" />
            <span className="globe-holo-orb absolute z-0" />
            <Image
              src={media.globe}
              alt=""
              width={1024}
              height={1024}
              unoptimized
              loading="eager"
              sizes="(max-width: 640px) 78vw, 30rem"
              className="globe-image absolute inset-0 z-10 h-full w-full object-contain"
            />
            <span className="globe-brand-veil absolute z-20" />
            <span className="globe-glass-reflection absolute z-20" />
            <span className="globe-pole-glow globe-pole-glow-top absolute z-20" />
            <span className="globe-pole-glow globe-pole-glow-bottom absolute z-20" />
            <span className="globe-surface-flow absolute z-20" />
            <span className="globe-rotation-light absolute z-20" />
            <span className="globe-aurora absolute z-20" />
            <span className="globe-orbit globe-orbit-one absolute z-20"><span className="globe-orbit-spark" /></span>
            <span className="globe-orbit globe-orbit-two absolute z-20"><span className="globe-orbit-spark" /></span>
            <span className="globe-orbit globe-orbit-three absolute z-20"><span className="globe-orbit-spark" /></span>
            <span className="globe-bloom absolute inset-[12%] z-20 rounded-full" />
            <span className="globe-specular absolute z-20" />
            <span className="globe-edge-glow absolute inset-[7%] z-20 rounded-full" />
            <span className="globe-glint globe-glint-one absolute z-20" />
            <span className="globe-glint globe-glint-two absolute z-20" />
            <span className="globe-glint globe-glint-three absolute z-20" />
            <span className="globe-holo-particle globe-holo-particle-one absolute z-30" />
            <span className="globe-holo-particle globe-holo-particle-two absolute z-30" />
            <span className="globe-holo-particle globe-holo-particle-three absolute z-30" />
            <span className="globe-holo-particle globe-holo-particle-four absolute z-30" />
          </div>

          <div className="doctor-cards-layer absolute inset-0">
            {cards.map(({ doctor, slot, occurrence }) => {
              const pose = poses[Math.abs(slot)];
              const direction = slot < 0 ? -1 : 1;
              const depth = Math.abs(slot);
              const cardTransform = (entering: boolean) =>
                `translate(-50%, -50%) translate3d(${pose.x * direction}px, ${pose.y}px, ${pose.z}px) rotateY(${pose.angle * direction + (entering && depth > 0 ? -direction * 22 : 0)}deg) scale(${pose.scale})`;
              const style = {
                width: cardWidth,
                zIndex: pose.layer,
                "--card-x": `${pose.x * direction}px`,
                "--card-y": `${pose.y}px`,
                "--card-z": `${pose.z}px`,
                "--card-angle": `${pose.angle * direction}deg`,
                "--card-scale": pose.scale,
                pointerEvents: depth >= 3 ? "none" : "auto",
              } as CSSProperties;
              const testimonialOpen = depth < 3 && (hoveredCard === occurrence || pinnedCard === occurrence);
              const maskAlphas = slot <= -3 ? [0, 0, 1 / 3, 1, 1, 1] : slot >= 3 ? [1, 1, 1, 1 / 3, 0, 0] : [1, 1, 1, 1, 1, 1];
              const mask = `linear-gradient(to right, ${maskAlphas.map((alpha, index) => `rgba(0,0,0,${alpha}) ${[0, 10, 30, 70, 90, 100][index]}%`).join(", ")})`;
              // A gradient-to-none mask tween can leave a fully transparent mask
              // on recycled cards. Only the invisible/ghost edge slots need a mask.
              style.maskImage = depth >= 3 ? mask : "none";
              return (
              <motion.article
                key={occurrence}
                aria-hidden={depth >= 3 ? true : undefined}
                role={depth < 3 ? "button" : undefined}
                tabIndex={depth < 3 ? 0 : -1}
                aria-label={depth < 3 ? `${doctor.name}: show demo testimonial` : undefined}
                aria-expanded={depth < 3 ? testimonialOpen : undefined}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") setHoveredCard(occurrence); }}
                onPointerLeave={() => setHoveredCard(null)}
                onPointerUp={(event) => { if (event.pointerType === "touch") { setHoveredCard(null); setPinnedCard((current) => current === occurrence ? null : occurrence); } }}
                onClick={(event) => { if (event.detail === 0) setPinnedCard((current) => current === occurrence ? null : occurrence); }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setPinnedCard((current) => current === occurrence ? null : occurrence); }
                  if (event.key === "Escape") { setPinnedCard(null); setHoveredCard(null); }
                }}
                onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) setHoveredCard(occurrence); }}
                onBlur={() => { setHoveredCard(null); setPinnedCard(null); }}
                data-arc-index={slot}
                data-occurrence={occurrence}
                style={style}
                initial={depth === 0 || reducedMotion || activeIndex > 0 ? false : { opacity: 0, transform: cardTransform(true) }}
                animate={{
                  opacity: depth === 0 || sceneEntered || reducedMotion ? pose.opacity : 0,
                  transform: cardTransform(!sceneEntered && !reducedMotion),
                  filter: `blur(${depth >= 3 ? 3 : 0}px)`,
                }}
                onAnimationComplete={() => {
                  if (activeIndex === 0 && sceneEntered && depth === 2) setOpeningComplete(true);
                  if (slot === 0 && transitioning) { remainingHold.current = 2000; setTransitioning(false); }
                }}
                transition={{ duration: reducedMotion ? 0 : activeIndex > 0 ? 0.68 : initialRevealDuration, delay: reducedMotion || activeIndex > 0 ? 0 : depth * initialRevealStagger, ease: [0.22, 1, 0.36, 1] }}
                className="doctor-card absolute overflow-hidden rounded-[1.1rem] border border-white/90 bg-white/80 p-2 sm:p-2.5 shadow-[0_14px_34px_rgba(26,75,140,0.17),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl"
              >
              <div className="relative aspect-[1.12] overflow-hidden rounded-[0.9rem] border border-white/70 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                <Image
                  src={doctor.avatar}
                  alt=""
                  fill
                  unoptimized
                  loading="eager"
                  sizes="(max-width: 640px) 130px, 240px"
                  className="object-cover"
                />
                <span className="flag-glass absolute left-2 top-2 z-10 overflow-hidden rounded-md p-1">
                  <Image src={doctor.flag} alt="Country flag" width={22} height={15} loading="eager" className="block h-3.5 w-5 rounded-[3px] object-cover" />
                </span>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/15 via-transparent to-white/10" />
                <div className="clinical-glass doctor-testimonial" data-open={testimonialOpen} aria-hidden={!testimonialOpen}>
                  <p>{doctor.testimonial}</p>
                </div>
              </div>
              <div className="px-1 pb-0.5 pt-1.5">
                <div className="flex items-center gap-1">
                  <p className="text-[15.18px] font-semibold leading-tight text-navy">{doctor.name}</p>
                  <Image
                    src={media.badge}
                    unoptimized
                    loading="eager"
                    alt="Official clinician"
                    width={18}
                    height={18}
                    className="h-3.5 w-3.5 shrink-0 object-contain"
                  />
                </div>
                <p className="mt-0.5 text-[12.42px] font-medium text-muted">{doctor.role}</p>
              </div>
              </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqBlock() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:items-start lg:gap-8">
      <motion.aside
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4 }}
        className="relative aspect-[3/4] min-h-[22rem] w-full max-w-[18rem] overflow-hidden rounded-[1.75rem] border border-white/90 bg-[#eceff3] shadow-[0_18px_50px_rgba(26,75,140,0.14)] lg:sticky lg:top-24"
      >
        <ProgressiveVideo
          src="/faq/clinician-story-clean.mp4"
          poster={media.faqPoster}
          aria-label="Clinician reviewing a dermatology workflow"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />

        <div
          className="clinical-glass absolute bottom-4 left-1/2 w-[calc(100%-2.25rem)] -translate-x-1/2 px-3 py-2.5 sm:bottom-5 sm:w-[calc(100%-2.75rem)]"
        >
          <p className="font-display text-[13px] font-bold tracking-tight text-navy">
            Dr. Maya Laurent
          </p>
          <p className="mt-1 whitespace-nowrap text-[11px] leading-snug text-navy/70">
            Need help exploring the clinical workflow?
          </p>
          <Link
            href="/calendar"
            className="mt-2 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-full border border-white/90 bg-white/95 px-3 text-[11px] font-semibold text-navy shadow-[0_4px_14px_rgba(26,75,140,0.1)] transition-all hover:border-medical-blue/20 hover:text-medical-blue"
          >
            <CalendarDays className="h-3.5 w-3.5 text-medical-blue" />
            Book a meeting
            <ArrowRight className="h-3.5 w-3.5 text-medical-blue" />
          </Link>
        </div>
      </motion.aside>

      <div className="space-y-2.5">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className={cn(
                "overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/85 shadow-[0_8px_28px_rgba(26,75,140,0.06)] backdrop-blur-md transition-shadow",
                isOpen && "shadow-[0_12px_36px_rgba(26,75,140,0.1)]"
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center px-4 py-4 text-left text-sm font-semibold text-navy sm:px-5 sm:text-base"
              >
                <span className="flex min-w-0 flex-1 items-baseline gap-2">
                  <span className="font-display w-5 shrink-0 -translate-y-[2px] text-xs font-semibold tracking-wide text-medical-blue/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 leading-snug">{item.question}</span>
                </span>
                <ChevronDown
                  className={cn(
                    "ml-2 h-5 w-5 shrink-0 text-navy/70 transition-transform duration-300",
                    isOpen && "rotate-180 text-medical-blue"
                  )}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.28,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl px-4 pb-5 pl-[2.75rem] pr-12 text-sm leading-relaxed text-muted sm:px-5 sm:pl-12">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const howItWorksSteps = [
  {
    step: "01",
    title: "Intake",
    body: "Patient information, history, and images are securely collected and organized.",
    image: media.intake,
    scale: "scale-[0.935]",
  },
  {
    step: "02",
    title: "AI Review",
    body: "SkinSight AI analyzes clinical data and images to identify patterns and surface insights.",
    image: media.review,
    scale: "scale-[0.935]",
  },
  {
    step: "03",
    title: "Clinician Review",
    body: "A licensed clinician reviews the AI findings, adds expertise, and confirms next steps.",
    image: media.clinician,
    scale: "scale-[0.935]",
  },
  {
    step: "04",
    title: "Report",
    body: "A clear, patient-ready report is generated with findings and recommendations.",
    image: media.reportPoster,
    scale: "scale-[0.935]",
  },
] as const;

export function LandingPage() {
  preload(media.heroPoster, { as: "image", fetchPriority: "high" });
  preload(media.globe, { as: "image" });
  clinicianNetwork.forEach((doctor) => preload(doctor.avatar, { as: "image" }));

  return (
    <div className="min-h-screen text-foreground">
      <LandingHeader />

      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#f7fbff]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 right-0 w-[55%]">
            <ProgressiveVideo
              immediate
              src="/hero/cellular-signal-forward-loop.mp4"
              poster={media.heroPoster}
              aria-hidden="true"
              className="h-full w-full object-cover object-[67%_50%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#f7fbff_0%,rgba(247,251,255,0.7)_18%,rgba(247,251,255,0.08)_42%,transparent_62%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-b from-transparent via-[#f7fbff]/70 to-[#f7fbff]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
          <div className="flex w-full max-w-xl flex-col items-center text-center lg:max-w-[48%] lg:items-start lg:text-left">
            <motion.p
              className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]"
              {...fadeUp}
              transition={{ duration: 0.55 }}
            >
              SkinSight AI
            </motion.p>

            <motion.h1
              className="mt-5 max-w-xl text-xl font-semibold tracking-tight text-navy sm:text-2xl lg:text-[1.65rem] lg:leading-snug"
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              AI-assisted dermatology triage for clinicians who need speed
              without losing judgment.
            </motion.h1>

            <motion.p
              className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base"
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.14 }}
            >
              Prioritize lesion cases, review explainable ABCDE signals, and keep
              final decisions in the clinician&apos;s hands.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <Link
                href="/onboarding"
                className={buttonStyles({
                  variant: "ai",
                  size: "lg",
                  className: "min-w-[11rem] px-6",
                })}
              >
                Start as clinician
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/app"
                className={buttonStyles({
                  variant: "secondary",
                  size: "lg",
                  className:
                    "min-w-[11rem] border-border bg-white text-navy shadow-[var(--shadow-soft)] hover:border-medical-blue/25 hover:bg-medical-blue/[0.04] hover:text-medical-blue",
                })}
              >
                Open live demo
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem — one job */}
      <section
        id="challenge"
        className="relative scroll-mt-28 overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 12% 8%, rgba(45,108,181,0.1) 0%, transparent 55%), radial-gradient(ellipse 55% 45% at 88% 12%, rgba(6,182,212,0.08) 0%, transparent 50%), linear-gradient(180deg, #f7fbff 0%, #ffffff 48%, #f4f8fc 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(26,75,140,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 75% 60% at 50% 30%, black 15%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl text-left">
            <p className="section-label">The challenge</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Too many lesion images. Too little clarity on what comes first.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Dermatology teams review case after case under time pressure. AI can
              help — but only if risk signals are explainable and the clinician
              stays in control.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative scroll-mt-28 overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 12% 8%, rgba(45,108,181,0.1) 0%, transparent 55%), radial-gradient(ellipse 55% 45% at 88% 12%, rgba(6,182,212,0.08) 0%, transparent 50%), linear-gradient(180deg, #f7fbff 0%, #ffffff 48%, #f4f8fc 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(26,75,140,0.08) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 75% 60% at 50% 30%, black 15%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl text-left">
            <p className="section-label text-medical-blue">How it works</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              One clinical workflow.
              <br className="hidden sm:block" /> Four clear steps.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              SkinSight AI streamlines skin assessment from intake to report,
              combining intelligent analysis with clinician expertise.
            </p>
          </div>

          <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
            {howItWorksSteps.map((item, index) => (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative rounded-[1.35rem] border border-white/80 bg-white/70 px-5 pb-5 pt-2.5 text-center shadow-[0_10px_36px_rgba(26,75,140,0.08)] backdrop-blur-xl sm:px-6 sm:pb-6 sm:pt-3"
              >
                <div className="mx-auto -my-2 flex h-[10.5rem] w-[13.5rem] items-center justify-center sm:-my-3 sm:h-48 sm:w-60">
                  {item.step === "04" ? (
                    <ProgressiveVideo
                      src="/how-it-works/step-04-report.mp4"
                      poster={item.image}
                      aria-label="Report layers assembling inside a secure container"
                      className={cn("h-full w-full object-contain", item.scale)}
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt=""
                      width={1024}
                      height={1024}
                      unoptimized
                      loading="eager"
                      sizes="(max-width: 640px) 216px, 240px"
                      className={cn("h-full w-full object-contain", item.scale)}
                    />
                  )}
                </div>

                <p className="mt-2 text-[11px] font-semibold tracking-[0.14em] text-medical-blue">
                  {item.step}
                </p>
                <h3 className="font-display mt-1.5 text-lg font-bold tracking-tight text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <QuoteSlider />

      {/* Product promise */}
      <section
        id="product"
        className="scroll-mt-28 mesh-bg border-y border-border-subtle/60 px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="section-label">Built for clinicians</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              A triage workspace, not a black-box score
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              SkinSight organizes the queue, surfaces explainable AI
              observations, and guides review without replacing clinical
              judgment.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Priority queue that lifts high-risk cases first",
                "ABCDE signals with clinician-facing explanations",
                "Human-in-the-loop verification before report approval",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-medical-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-medical-blue/15 bg-white px-6 py-8 shadow-[var(--shadow-elevated)] sm:px-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 70% 80% at 90% 10%, rgba(6,182,212,0.12) 0%, transparent 55%)",
              }}
            />
            <div className="relative">
              <Sparkles className="h-5 w-5 text-cyan-accent" />
              <p className="mt-4 font-display text-xl font-bold tracking-tight text-navy sm:text-2xl">
                AI accelerates review.
                <br />
                <span className="text-muted">You keep the final call.</span>
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                Every analysis is framed as decision support — with clear
                disclaimers and an explicit clinician verification step.
              </p>
              <Link
                href="/cases/case-001"
                className={cn(
                  buttonStyles({ variant: "primary", size: "md" }),
                  "mt-6"
                )}
              >
                Walk a demo case
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="relative scroll-mt-28 overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 65% 50% at 8% 20%, rgba(45,108,181,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 92% 80%, rgba(6,182,212,0.07) 0%, transparent 50%), linear-gradient(180deg, #f7fbff 0%, #ffffff 55%, #f4f8fc 100%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="section-label text-medical-blue">FAQ</p>
            <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Everything you need to know about SkinSight
            </h2>
          </div>

          <FaqBlock />
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#06152b] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12">
        <ProgressiveVideo
          src={media.footerVideo}
          playbackRate={0.32}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom"
          poster={media.footerPoster}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,40,0.16)_0%,rgba(4,18,40,0.32)_45%,rgba(4,18,40,0.58)_100%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to modernize lesion triage?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-blue-100/70 sm:text-base">
              Join clinics and health systems using SkinSight AI to detect sooner,
              work smarter, and deliver confident care.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/onboarding"
                className="inline-flex h-11 min-w-[11.5rem] items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-navy shadow-[0_10px_28px_rgba(103,189,255,0.24)]"
              >
                Start onboarding
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/calendar"
                className="inline-flex h-11 min-w-[11.5rem] items-center justify-center rounded-full border border-blue-200/60 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Request a demo
              </Link>
            </div>
          </div>

          <div className="h-12 sm:h-14" aria-hidden="true" />

          <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_repeat(4,1fr)] lg:gap-8">
            <div className="max-w-[15rem]">
              <div className="flex items-center gap-3">
                <LogoMark size={42} className="rounded-full" />
                <span className="font-display text-2xl font-semibold tracking-tight text-white">
                  SkinSight <span className="font-normal text-white">AI</span>
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-blue-100/65">
                AI-powered skin health insights for earlier action and healthier tomorrows.
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200/65">Product</h3>
              <div className="mt-4 space-y-3 text-sm text-blue-50/90">
                <Link href="/#how-it-works" className="block transition-colors hover:text-cyan-accent">How it works</Link>
                <Link href="/app" className="block transition-colors hover:text-cyan-accent">Live demo</Link>
                <Link href="/onboarding" className="block transition-colors hover:text-cyan-accent">Onboarding</Link>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200/65">Company</h3>
              <div className="mt-4 space-y-3 text-sm text-blue-50/90">
                <Link href="/about" className="block transition-colors hover:text-cyan-accent">About us</Link>
                <Link href="/about" className="block transition-colors hover:text-cyan-accent">Case study</Link>
                <Link href="/calendar" className="block transition-colors hover:text-cyan-accent">Contact</Link>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200/65">Resources</h3>
              <div className="mt-4 space-y-3 text-sm text-blue-50/90">
                <Link href="/#faq" className="block transition-colors hover:text-cyan-accent">Documentation</Link>
                <Link href="/#faq" className="block transition-colors hover:text-cyan-accent">Support</Link>
                <Link href="/#faq" className="block transition-colors hover:text-cyan-accent">Trust center</Link>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200/65">Legal</h3>
              <div className="mt-4 space-y-3 text-sm text-blue-50/90">
                <Link href="/about" className="block transition-colors hover:text-cyan-accent">Privacy policy</Link>
                <Link href="/about" className="block transition-colors hover:text-cyan-accent">Terms of service</Link>
                <Link href="/about" className="block transition-colors hover:text-cyan-accent">Accessibility</Link>
              </div>
            </div>
          </div>

          <p className="mt-12 text-xs text-blue-100/45">
            © 2026 SkinSight AI · Portfolio concept prototype
          </p>
        </div>
      </footer>
    </div>
  );
}
