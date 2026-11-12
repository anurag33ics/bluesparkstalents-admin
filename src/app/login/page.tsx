import type { CSSProperties, SVGProps } from "react";
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import {
  Briefcase,
  ChartNoAxesColumn,
  GraduationCap,
  Headset,
  Layers,
  ShieldCheck,
  Users,
  UsersRound,
} from "lucide-react";
import { cn } from "cn";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the Bluespark admin console.",
};

/* Body copy and headings */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

/* The serif "B" at the centre of the orbit, read through the --font-display token in globals.css */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

/* The three portals the console oversees, placed around the ring (x/y in % of the ring, chip centred there). */
const portals = [
  { label: "Institutions", detail: "Schools & colleges", icon: GraduationCap, x: 26, y: 4, delay: "0s" },
  { label: "Talent", detail: "Students & graduates", icon: UsersRound, x: -18, y: 70, delay: "-2s" },
  { label: "Employers", detail: "Hiring partners", icon: Briefcase, x: 120, y: 70, delay: "-4s", light: true },
];

const capabilities = [
  { label: "Approve institutions and employers", icon: Layers },
  { label: "Manage roles and permissions", icon: Users },
  { label: "Track assessments and reports", icon: ChartNoAxesColumn },
];

/* Curved, slanted left edge of the brand panel; the SVG stretches to whatever size the panel is. */
const panelShape: CSSProperties = {
  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M15 0H100V100H0C3 64 8 30 15 0Z'/%3E%3C/svg%3E")`,
  maskSize: "100% 100%",
  maskRepeat: "no-repeat",
};

export default function LoginPage() {
  return (
    <main
      className={cn(
        jakarta.className,
        fraunces.variable,
        "grid min-h-dvh bg-[linear-gradient(160deg,#f8faff_0%,#eef3ff_100%)] text-brand-950 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]",
      )}
    >
      <section className="relative isolate flex flex-col overflow-hidden px-6 py-7 sm:px-10 lg:px-12 xl:px-16">
        {/* Soft background shapes */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/4 size-[30rem] rounded-full bg-white blur-3xl" />
          <div className="absolute top-[12%] -left-80 size-[40rem] rounded-full border border-brand-100" />
          <div className="absolute top-[24%] -left-60 size-[30rem] rounded-full bg-linear-to-br from-brand-100/90 via-brand-50/60 to-transparent" />
          <div className="absolute -bottom-52 -left-28 size-[26rem] rounded-full bg-linear-to-tr from-brand-100/70 to-transparent" />
        </div>

        <header className="flex items-center justify-between gap-4">
          <BrandMark />
        </header>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[420px]">
            <div className="fill-mode-both duration-700 fade-in slide-in-from-bottom-4 motion-safe:animate-in">
              <h1 className="text-[2.6rem] leading-[1.1] font-extrabold tracking-tight sm:text-5xl">
                Welcome{" "}
                <span className="relative inline-block">
                  <em className="bg-linear-to-r from-brand-600 to-brand-800 bg-clip-text pr-1.5 text-transparent">
                    back.
                  </em>
                  <svg
                    aria-hidden
                    viewBox="0 0 120 12"
                    fill="none"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1.5 left-0 h-2.5 w-full text-brand-400"
                  >
                    <path d="M3 9C32 4 74 2 117 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Sign in to oversee institutions, employers and talent across Bluespark.
              </p>
            </div>

            <div className="mt-7 rounded-3xl border border-white bg-white/85 p-6 shadow-[0_30px_70px_-35px_rgb(30_64_175/0.45)] ring-1 ring-brand-100/70 backdrop-blur-xl delay-150 fill-mode-both duration-700 fade-in slide-in-from-bottom-4 motion-safe:animate-in sm:p-7">
              <LoginForm />
            </div>

            <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground delay-300 fill-mode-both duration-700 fade-in motion-safe:animate-in">
              <ShieldCheck className="size-3.5 shrink-0 text-brand-600" />
              Access is limited to authorised Bluespark staff.
            </p>
          </div>
        </div>

        <footer className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:[&>span]:whitespace-nowrap">
          <span>© 2026 Bluespark Talents. All rights reserved.</span>
          <span>Need access? Ask a workspace owner to invite you.</span>
        </footer>
      </section>

      <BrandPanel />
    </main>
  );
}

function BrandMark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-brand-500 to-brand-700 text-lg font-extrabold text-white shadow-[0_8px_20px_-8px_var(--brand-600)]">
        B
      </span>
      <span className="text-lg font-bold tracking-tight">
        Bluespark<span className="text-brand-600">Talents</span>
      </span>
      <span className="rounded-full bg-brand-900 px-2 py-0.5 text-[10px] font-bold tracking-[0.12em] text-white uppercase">
        Admin
      </span>
    </span>
  );
}


function BrandPanel() {
  return (
    <aside className="relative hidden lg:sticky lg:top-0 lg:block lg:h-dvh lg:self-start">
      {/* Panel surface */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden bg-[linear-gradient(160deg,#1d4ed8_0%,#1538c4_38%,#0e2aa0_70%,#0a1f7f_100%)]"
        style={panelShape}
      >
        <div className="absolute -top-24 left-[20%] size-[26rem] rounded-full bg-sky-400/25 blur-3xl motion-safe:animate-drift" />
        <div
          className="absolute -bottom-32 left-[30%] size-[30rem] rounded-full bg-cyan-400/30 blur-3xl motion-safe:animate-drift"
          style={{ animationDelay: "-9s" }}
        />
        <SilkWaves className="absolute -top-4 -right-4 w-[72%]" />
        <ParticleWave className="absolute inset-x-0 bottom-0 h-[36%] w-full" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center gap-[clamp(2rem,7vh,3.5rem)] pt-12 pr-10 pb-[14vh] pl-[16%] text-white xl:pr-14">
        <Constellation />

        <div className="w-full max-w-[40rem] text-center delay-300 fill-mode-both duration-1000 fade-in slide-in-from-bottom-4 motion-safe:animate-in">
          <h2 className="mx-auto max-w-[30rem] text-[clamp(1.75rem,2.5vw,2.4rem)] leading-[1.15] font-bold tracking-tight text-balance">
            Every institution, employer and candidate, <em className="text-sky-300">in one orbit.</em>
          </h2>
          <ul className="mt-8 grid grid-cols-3 gap-3 text-left xl:gap-4">
            {capabilities.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md transition-colors hover:bg-white/[0.13] xl:p-5"
              >
                <Icon className="size-5.5" />
                <p className="mt-3 text-[13px] leading-snug font-semibold text-white/90">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function Constellation() {
  return (
    <div aria-hidden className="relative aspect-square w-[clamp(10rem,30vh,15rem)] shrink-0">
      {/* Ring */}
      <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgb(56_189_248/0.3),inset_0_0_40px_rgb(56_189_248/0.18)]" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full motion-safe:animate-[spin_70s_linear_infinite]">
        <circle
          cx="50"
          cy="50"
          r="49.5"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="0.6"
          strokeDasharray="0.9 2.1"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 motion-safe:animate-[spin_24s_linear_infinite]">
        <span className="absolute top-0 left-1/2 size-1.5 -translate-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgb(186_230_253/0.8)]" />
      </div>

      {/* Glowing nodes on the ring */}
      {[0.5, 99.5].map((x) => (
        <span
          key={x}
          className="absolute size-2.5 -translate-1/2 rounded-full bg-sky-200 shadow-[0_0_14px_5px_rgb(56_189_248/0.8)]"
          style={{ left: `${x}%`, top: "43%" }}
        />
      ))}

      {/* Core */}
      <div className="absolute top-1/2 left-1/2 size-[42%] -translate-1/2">
        <div className="absolute top-1/2 left-1/2 size-[220%] -translate-1/2 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="relative grid size-full place-items-center rounded-[28%] bg-white shadow-[0_24px_60px_-12px_rgb(2_6_23/0.6),0_0_0_8px_rgb(255_255_255/0.08)]">
          <span className="font-display text-[clamp(2.25rem,5vh,3.25rem)] font-semibold text-brand-700">B</span>
        </div>
      </div>

      {/* Portals */}
      {portals.map(({ label, detail, icon: Icon, x, y, delay, light }, index) => (
        <div
          key={label}
          className="absolute -translate-1/2 fill-mode-both duration-700 fade-in zoom-in-90 motion-safe:animate-in"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${200 + index * 150}ms` }}
        >
          <div
            className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-brand-900/55 py-2 pr-4 pl-2 shadow-[0_16px_40px_-16px_rgb(2_6_23/0.7)] backdrop-blur-md motion-safe:animate-float"
            style={{ animationDelay: delay }}
          >
            <span
              className={cn(
                "grid size-9 place-items-center rounded-full",
                light
                  ? "bg-white text-brand-700"
                  : "bg-linear-to-br from-sky-300 to-brand-500 text-white shadow-[0_0_16px_rgb(56_189_248/0.55)]",
              )}
            >
              <Icon className="size-4" />
            </span>
            <span className="leading-tight whitespace-nowrap">
              <span className="block text-[13px] font-semibold">{label}</span>
              <span className="block text-[11px] text-white/65">{detail}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Layered silk ribbons in the panel's top-right corner. */
function SilkWaves({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 420" fill="none" preserveAspectRatio="xMaxYMin meet" className={className}>
      <defs>
        <linearGradient id="login-silk-a" x1="600" y1="0" x2="220" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93c5fd" stopOpacity="0.55" />
          <stop offset="1" stopColor="#93c5fd" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="login-silk-b" x1="600" y1="0" x2="320" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M600 0V310C505 340 425 262 356 178C296 104 218 42 120 0Z" fill="url(#login-silk-a)" />
      <path d="M600 0V205C540 226 482 182 428 120C388 72 344 30 292 0Z" fill="url(#login-silk-b)" />
      <path d="M600 262C516 282 444 220 380 146C318 76 244 24 150 -10" stroke="#ffffff" strokeOpacity="0.35" />
      <path d="M600 150C548 160 500 128 462 86C432 52 402 22 362 0" stroke="#ffffff" strokeOpacity="0.5" />
    </svg>
  );
}

/* A glowing dotted wave along the bottom of the panel. */
function ParticleWave({ className }: { className?: string }) {
  const crest = "M0 200C150 128 268 222 410 176C548 132 650 54 800 82";

  return (
    <svg viewBox="0 0 800 260" fill="none" preserveAspectRatio="xMidYMax slice" className={className}>
      <defs>
        <pattern id="login-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="#7dd3fc" />
        </pattern>
        <linearGradient id="login-dots-fade" x1="0" y1="60" x2="0" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <mask id="login-dots-mask">
          <rect width="800" height="260" fill="url(#login-dots-fade)" />
        </mask>
        <linearGradient id="login-crest" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" stopOpacity="0" />
          <stop offset="0.4" stopColor="#7dd3fc" />
          <stop offset="0.72" stopColor="#e0f2fe" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.4" />
        </linearGradient>
        <filter id="login-glow" x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <path d={`${crest}V260H0Z`} fill="url(#login-dots)" mask="url(#login-dots-mask)" opacity="0.75" />
      <path d={crest} stroke="url(#login-crest)" strokeWidth="12" filter="url(#login-glow)" opacity="0.8" />
      <path d={crest} stroke="url(#login-crest)" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M0 228C160 168 280 246 420 210C560 174 660 104 800 124"
        stroke="#7dd3fc"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path
        fill="#FFC107"
        d="M43.61 20.08H42V20H24v8h11.3c-1.65 4.66-6.08 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-3.92Z"
      />
      <path
        fill="#FF3D00"
        d="m6.31 14.69 6.57 4.82C14.66 15.11 18.96 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 16.32 4 9.66 8.34 6.31 14.69Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.17 0 9.86-1.98 13.41-5.19l-6.19-5.24A11.9 11.9 0 0 1 24 36c-5.2 0-9.62-3.32-11.28-7.95l-6.52 5.03C9.5 39.56 16.23 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.61 20.08H42V20H24v8h11.3a12.04 12.04 0 0 1-4.09 5.57l6.19 5.24C36.97 39.2 44 34 44 24c0-1.34-.14-2.65-.39-3.92Z"
      />
    </svg>
  );
}

function MicrosoftLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 23 23" {...props}>
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M12 1h10v10H12z" />
      <path fill="#00A4EF" d="M1 12h10v10H1z" />
      <path fill="#FFB900" d="M12 12h10v10H12z" />
    </svg>
  );
}

function GitHubLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="#181717" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
