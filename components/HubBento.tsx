"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import { useLayoutEffect, useRef, type CSSProperties } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 30 },
  },
};

const staticItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

type CloudChip = { label: string; style: CSSProperties; rotate: number };

const cloudChips: CloudChip[] = [
  { label: "HDSI", style: { top: "8%", left: "4%" }, rotate: -8 },
  { label: "UC San Diego", style: { top: "4%", right: "6%" }, rotate: 5 },
  { label: "Data science", style: { bottom: "18%", left: "8%" }, rotate: 3 },
  { label: "Lab", style: { bottom: "10%", right: "10%" }, rotate: -4 },
  { label: "Halıcıoğlu", style: { top: "38%", right: "4%" }, rotate: 7 },
];

function WordCloudChips({ animate }: { animate: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-90"
      aria-hidden
    >
      {cloudChips.map((chip, i) => (
        <motion.span
          key={chip.label}
          className="font-display absolute text-[clamp(0.58rem,1.35vw,0.82rem)] font-semibold tracking-wide text-ucsd-navy/25"
          style={{ ...chip.style, rotate: chip.rotate }}
          initial={false}
          animate={
            animate
              ? {
                  y: [0, -5, 0],
                  rotate: [chip.rotate, chip.rotate + 2, chip.rotate],
                }
              : undefined
          }
          transition={
            animate
              ? {
                  duration: 4.2 + i * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }
              : undefined
          }
        >
          {chip.label}
        </motion.span>
      ))}
    </div>
  );
}

function OpenButton({ href, children, className, ...props }: HTMLMotionProps<"a"> & { href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      whileHover={props.whileHover}
      whileTap={props.whileTap}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function CardShell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={[
        "relative flex h-full min-h-0 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface-raised p-[length:var(--bento-pad,1rem)] shadow-[0_1px_0_color-mix(in_oklch,var(--ucsd-navy)_8%,transparent)]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </article>
  );
}

function HeroCard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <CardShell className="border-2 border-ucsd-navy p-[length:var(--hero-pad,var(--bento-pad,1rem))] shadow-[0_12px_40px_-16px_color-mix(in_oklch,var(--ucsd-navy)_35%,transparent)]">
      <WordCloudChips animate={!reduceMotion} />
      <div className="relative z-[1]">
        <p className="text-[clamp(0.7rem,1.1vw,0.9rem)] font-semibold text-accent">Main site</p>
        <h2 className="font-display mt-1 text-[clamp(1.45rem,3.2vw+0.7rem,2.65rem)] font-bold leading-[1.05] tracking-tight text-ink">
          lab3.ucsd.edu
        </h2>
        <p className="mt-2 max-w-md text-[clamp(0.76rem,0.45vw+0.66rem,0.98rem)] leading-snug text-ink-muted max-[380px]:hidden max-h-[620px]:hidden">
          Front door for the lab - news, people, and what we&apos;re building.
        </p>
      </div>
      <OpenButton
        href="https://lab3.ucsd.edu"
        className="relative z-[1] mt-3 inline-flex min-h-10 w-fit items-center gap-2 rounded-full bg-ucsd-navy px-4 py-2 text-sm font-bold text-surface-raised transition-transform hover:scale-[1.02] sm:px-5 sm:py-2.5"
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      >
        Visit the lab site
        <span aria-hidden>↗</span>
      </OpenButton>
    </CardShell>
  );
}

function PresenceCard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <CardShell>
      <div>
        <h2 className="font-display text-[clamp(1rem,1vw+0.8rem,1.42rem)] font-bold leading-tight tracking-tight text-ink">
          Presence tracking
        </h2>
        <p className="mt-1.5 text-[clamp(0.74rem,0.42vw+0.66rem,0.94rem)] leading-snug text-ink-muted max-h-[620px]:hidden">
          Who&apos;s in the lab - web app and installable PWA.
        </p>
      </div>
      <div className="mt-3 flex flex-row flex-wrap gap-2">
        <OpenButton
          href="https://pt.hdsilab3.com"
          className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl bg-accent-soft px-3 py-2 text-center text-sm font-bold text-ink transition-colors hover:bg-accent hover:text-ucsd-navy sm:flex-none sm:px-4 sm:py-2.5"
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          Open web app
        </OpenButton>
        <OpenButton
          href="https://pt.hdsilab3.com/pwa"
          className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border border-ucsd-navy/20 bg-surface px-3 py-2 text-center text-sm font-semibold text-ink transition-colors hover:border-ucsd-navy/40 sm:flex-none sm:px-4 sm:py-2.5"
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          Open PWA
        </OpenButton>
      </div>
    </CardShell>
  );
}

function CodeSharingCard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <CardShell>
      <div>
        <h2 className="font-display text-[clamp(1rem,1vw+0.78rem,1.32rem)] font-bold leading-tight tracking-tight text-ink">
          Code sharing
        </h2>
        <p className="mt-1.5 text-[clamp(0.72rem,0.38vw+0.64rem,0.9rem)] leading-snug text-ink-muted max-[380px]:hidden max-h-[620px]:hidden">
          Paste snippets and share them with the room - no account required.
        </p>
      </div>
      <OpenButton
        href="https://share.hdsilab3.com"
        className="mt-3 inline-flex min-h-10 w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-accent hover:text-ucsd-navy"
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      >
        Open
        <span aria-hidden>↗</span>
      </OpenButton>
    </CardShell>
  );
}

function SoonCard() {
  return (
    <CardShell
      className="border-dashed bg-surface-raised/80 text-ink-muted"
      aria-label="Baseball card project - website coming soon"
    >
      <div>
        <h2 className="font-display text-[clamp(0.98rem,0.9vw+0.78rem,1.24rem)] font-bold leading-tight tracking-tight text-ink-muted">
          Baseball cards
        </h2>
        <p className="mt-1.5 text-[clamp(0.7rem,0.35vw+0.63rem,0.86rem)] leading-snug max-[420px]:hidden max-h-[620px]:hidden">
          Project site isn&apos;t live yet - check back later.
        </p>
      </div>
      <p className="mt-3 text-sm font-medium leading-none text-ink-muted">Coming soon</p>
    </CardShell>
  );
}

export function HubBento() {
  const reduceMotion = useReducedMotion() ?? false;
  const iv = reduceMotion ? staticItemVariants : itemVariants;
  const playRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = playRef.current;
    if (!el) return;

    const apply = () => {
      const rect = el.getBoundingClientRect();
      const base = Math.min(rect.width, rect.height);
      const gap = Math.max(8, Math.min(18, base * 0.018));
      const pad = Math.max(12, Math.min(24, base * 0.026));
      const heroPad = Math.max(16, Math.min(32, base * 0.036));
      el.style.setProperty("--bento-gap", `${gap}px`);
      el.style.setProperty("--bento-pad", `${pad}px`);
      el.style.setProperty("--hero-pad", `${heroPad}px`);
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.main
      ref={playRef}
      className="@container mx-auto grid h-dvh max-h-dvh w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)_auto] gap-[length:var(--bento-gap,0.75rem)] overflow-hidden px-3 py-3 sm:px-5 sm:py-4 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header className="max-w-3xl" variants={iv}>
        <p className="text-[clamp(0.68rem,0.45vw+0.58rem,0.82rem)] font-semibold uppercase tracking-[0.2em] text-accent">
          Lab 3 hub
        </p>
        <h1 className="font-display mt-1 text-[clamp(1.55rem,3.2vw,2.55rem)] font-bold leading-[1.05] tracking-tight text-ink">
          HDSI Lab 3
        </h1>
        <p className="mt-1.5 max-w-2xl text-[clamp(0.76rem,0.48vw+0.66rem,1rem)] leading-snug text-ink-muted max-h-[620px]:hidden">
          A lab in the Halıcıoğlu Data Science Institute at UC San Diego - quick access to our sites and tools.
        </p>
      </motion.header>

      <section className="grid min-h-0 grid-cols-2 grid-rows-[1.16fr_0.9fr_0.74fr] gap-[length:var(--bento-gap,0.75rem)] md:grid-cols-12 md:grid-rows-2">
        <motion.div className="col-span-2 min-h-0 md:col-span-7 md:row-span-2" variants={iv}>
          <HeroCard reduceMotion={reduceMotion} />
        </motion.div>
        <motion.div className="col-span-2 min-h-0 md:col-span-5" variants={iv}>
          <PresenceCard reduceMotion={reduceMotion} />
        </motion.div>
        <motion.div className="min-h-0 md:col-span-3" variants={iv}>
          <CodeSharingCard reduceMotion={reduceMotion} />
        </motion.div>
        <motion.div className="min-h-0 md:col-span-2" variants={iv}>
          <SoonCard />
        </motion.div>
      </section>

      <motion.footer
        className="text-center text-[clamp(0.62rem,0.32vw+0.56rem,0.78rem)] leading-none text-ink-muted md:text-left"
        variants={iv}
      >
        UC San Diego · Halıcıoğlu Data Science Institute
      </motion.footer>
    </motion.main>
  );
}
