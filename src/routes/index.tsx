import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Download,
  Menu,
  X,
} from "lucide-react";
import {
  PROFILE,
  ABOUT_PARAGRAPHS,
  STATS,
  TECH_SKILLS,
  SOFT_SKILLS,
  PROJECTS,
  EDUCATION,
  CERTIFICATIONS,
  EXPERIENCE,
  JOURNEY,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thato Modiba — Aspiring Technologist & Computer Engineering Student" },
      {
        name: "description",
        content:
          "Thato Modiba is a 19-year-old aspiring technologist studying computer engineering — Google AI, Anthropic Claude, Microsoft 365, FNB App Academy, MTN Academy and CAPACITI.",
      },
      { property: "og:title", content: "Thato Modiba — Aspiring Technologist" },
      {
        property: "og:description",
        content:
          "Computer engineering student (2031) building with AI. Black, white and yellow pixel portfolio.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});

/* ---------------- page registry ---------------- */

const PAGES = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

/* ---------------- live code bits ---------------- */

const CODE_LINES = [
  "const thato = { age: 19, role: 'aspiring technologist' };",
  "build(idea) => ship(idea, { with: ['python', 'ai', 'react'] });",
  "skills.push('Microsoft 365', 'leadership', 'communication');",
  "while (curious) { learn(); build(); repeat(); }",
  "matric: { pass: 'Bachelor degree', nqf: 4 }",
  "team.lead({ years: 4, role: ['treasurer', 'secretary'] });",
  "ai.prompt('solve complex problems').then(deliver);",
];

function LiveCode({ tone }: { tone: "light" | "dark" }) {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const full = CODE_LINES[line]!;
    if (chars < full.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setChars(0);
      setLine((l) => (l + 1) % CODE_LINES.length);
    }, 1800);
    return () => clearTimeout(t);
  }, [chars, line]);

  return (
    <div
      className={`pixel-box inline-flex max-w-full items-center gap-2 px-3 py-2 font-mono text-[11px] sm:text-xs ${
        tone === "dark" ? "text-yellow" : "text-foreground"
      }`}
    >
      <span className="text-yellow">&gt;</span>
      <span className="truncate">{CODE_LINES[line]!.slice(0, chars)}</span>
      <span className="animate-caret text-yellow">█</span>
    </div>
  );
}

/* ---------------- floating minecraft-ish blocks ---------------- */

type Block = { left: number; size: number; delay: number; dur: number; kind: number };

function BlockField({ tone, count = 14 }: { tone: "light" | "dark"; count?: number }) {
  const blocks = useMemo<Block[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 97) % 100,
        size: 14 + ((i * 13) % 26),
        delay: -(i * 1.7) % 14,
        dur: 11 + ((i * 5) % 9),
        kind: i % 3,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blocks.map((b, i) => (
        <span
          key={i}
          className="animate-block-fall absolute top-0"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
          }}
        >
          <PixelCube kind={b.kind} tone={tone} />
        </span>
      ))}
    </div>
  );
}

function PixelCube({ kind, tone }: { kind: number; tone: "light" | "dark" }) {
  const stroke = tone === "dark" ? "#ffffff" : "#000000";
  const fill = kind === 0 ? "#FFD400" : kind === 1 ? "transparent" : stroke;
  return (
    <svg viewBox="0 0 12 12" className="h-full w-full opacity-70" shapeRendering="crispEdges">
      <rect x="0.5" y="0.5" width="11" height="11" fill={fill} stroke={stroke} strokeWidth="1" />
      {kind === 2 && (
        <>
          <rect x="2" y="2" width="3" height="3" fill="#FFD400" />
          <rect x="7" y="6" width="3" height="3" fill="#FFD400" />
        </>
      )}
    </svg>
  );
}

/* ---------------- reveal ---------------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${shown ? "reveal-in" : "reveal-up"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- page shell ---------------- */

function Page({
  id,
  index,
  active,
  children,
}: {
  id: string;
  index: number;
  active: boolean;
  children: ReactNode;
}) {
  const dark = index % 2 === 1;
  return (
    <section
      id={id}
      data-page={id}
      className={`relative flex min-h-screen snap-start flex-col justify-center overflow-hidden px-5 py-24 sm:px-10 ${
        dark ? "page-black" : "page-white"
      }`}
    >
      <BlockField tone={dark ? "dark" : "light"} count={dark ? 16 : 12} />
      <div
        key={active ? `${id}-on` : `${id}-off`}
        className={`relative z-10 mx-auto w-full max-w-5xl ${active ? "animate-page-in" : ""}`}
      >
        <div className="mb-8 flex items-center gap-3">
          <span className="display-font bg-yellow px-2 py-1 text-[10px] text-black">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="page-rule h-px flex-1 border-t" />
          <LiveCode tone={dark ? "dark" : "light"} />
        </div>
        {children}
      </div>
    </section>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="display-font text-2xl leading-tight sm:text-4xl">
      {children}
      <span className="text-yellow">_</span>
    </h2>
  );
}

/* ---------------- nav ---------------- */

function Nav({
  activeIndex,
  onJump,
}: {
  activeIndex: number;
  onJump: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const dark = activeIndex % 2 === 1;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        dark
          ? "border-white/20 bg-black/85 text-white"
          : "border-black/20 bg-white/85 text-black"
      } backdrop-blur`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-10">
        <button
          onClick={() => onJump(0)}
          className="display-font text-xs sm:text-sm"
          aria-label="Go to home page"
        >
          THATO<span className="text-yellow">.</span>MODIBA
        </button>

        <nav className="hidden items-center gap-5 text-xs md:flex">
          {PAGES.slice(1).map((p, i) => (
            <button
              key={p.id}
              onClick={() => onJump(i + 1)}
              className={`uppercase tracking-widest transition-colors hover:text-yellow ${
                activeIndex === i + 1 ? "text-yellow" : ""
              }`}
            >
              {p.label}
            </button>
          ))}
          <a
            href="/Thato-Modiba-CV.pdf"
            download
            className="pixel-box flex items-center gap-2 px-3 py-1.5 text-[11px] uppercase tracking-widest"
          >
            <Download className="h-3.5 w-3.5" /> CV
          </a>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className={`grid gap-1 border-t px-5 pb-4 text-xs md:hidden ${
            dark ? "border-white/20" : "border-black/20"
          }`}
        >
          {PAGES.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                onJump(i);
                setOpen(false);
              }}
              className="py-2 text-left uppercase tracking-widest"
            >
              {p.label}
            </button>
          ))}
          <a href="/Thato-Modiba-CV.pdf" download className="py-2 uppercase tracking-widest text-yellow">
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------------- page controls ---------------- */

function PageControls({
  activeIndex,
  onJump,
}: {
  activeIndex: number;
  onJump: (i: number) => void;
}) {
  const dark = activeIndex % 2 === 1;
  const dot = dark ? "border-white" : "border-black";
  return (
    <>
      <div className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 sm:flex">
        {PAGES.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onJump(i)}
            aria-label={`Go to ${p.label} page`}
            className={`h-3 w-3 border-2 transition-all ${dot} ${
              activeIndex === i ? "scale-125 bg-yellow" : "bg-transparent"
            }`}
          />
        ))}
      </div>

      <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
        <button
          onClick={() => onJump(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          aria-label="Previous page"
          className={`pixel-box flex h-9 w-9 items-center justify-center disabled:opacity-30 ${
            dark ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
        <span
          className={`display-font px-2 py-1 text-[10px] ${
            dark ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(PAGES.length).padStart(2, "0")}
        </span>
        <button
          onClick={() => onJump(Math.min(PAGES.length - 1, activeIndex + 1))}
          disabled={activeIndex === PAGES.length - 1}
          aria-label="Next page"
          className={`pixel-box flex h-9 w-9 items-center justify-center disabled:opacity-30 ${
            dark ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

/* ---------------- main ---------------- */

function Portfolio() {
  const [active, setActive] = useState(0);

  const jump = useCallback((i: number) => {
    const el = document.getElementById(PAGES[i]!.id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset["page"];
            const idx = PAGES.findIndex((p) => p.id === id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: 0.55 },
    );
    document.querySelectorAll("[data-page]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        jump(Math.min(PAGES.length - 1, active + 1));
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        jump(Math.max(0, active - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, jump]);

  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-auto">
      <Nav activeIndex={active} onJump={jump} />
      <PageControls activeIndex={active} onJump={jump} />

      {/* 01 — HOME (white) */}
      <Page id="home" index={0} active={active === 0}>
        <p className="display-font text-[10px] uppercase tracking-[0.35em] text-black/60">
          Portfolio · {PROFILE.location}
        </p>
        <h1 className="display-font mt-5 text-4xl leading-[1.15] sm:text-6xl">
          Hi, I&apos;m Thato
          <br />
          Modiba<span className="text-yellow">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed sm:text-base">
          {PROFILE.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => jump(3)}
            className="pixel-box bg-yellow px-5 py-3 text-xs uppercase tracking-widest text-black"
          >
            View my work
          </button>
          <a
            href="/Thato-Modiba-CV.pdf"
            download
            className="pixel-box px-5 py-3 text-xs uppercase tracking-widest"
          >
            Download CV
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-px border page-rule bg-black/10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white p-4">
              <div className="display-font text-xl sm:text-2xl">{s.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-widest text-black/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Page>

      {/* 02 — ABOUT (black) */}
      <Page id="about" index={1} active={active === 1}>
        <Heading>About me</Heading>
        <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-sm leading-relaxed text-white/85">
            {ABOUT_PARAGRAPHS.map((p) => (
              <Reveal key={p.slice(0, 20)}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <div className="pixel-box-invert bg-black p-5">
            <p className="display-font text-[10px] uppercase tracking-[0.3em] text-yellow">
              Journey
            </p>
            <ul className="mt-4 space-y-4">
              {JOURNEY.map((j) => (
                <li key={j.title} className="border-l-2 border-yellow pl-3">
                  <div className="display-font text-[11px] text-yellow">{j.year}</div>
                  <div className="text-sm font-bold">{j.title}</div>
                  <div className="text-xs text-white/70">{j.desc}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Page>

      {/* 03 — SKILLS (white) */}
      <Page id="skills" index={2} active={active === 2}>
        <Heading>Skills</Heading>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className="display-font text-[10px] uppercase tracking-[0.3em] text-black/60">
              Technical
            </p>
            {TECH_SKILLS.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <div>
                  <div className="flex justify-between text-xs">
                    <span>{s.name}</span>
                    <span className="text-black/50">{s.level}%</span>
                  </div>
                  <div className="mt-1.5 flex gap-0.5">
                    {Array.from({ length: 20 }, (_, k) => (
                      <span
                        key={k}
                        className={`h-3 flex-1 border border-black/40 ${
                          k < Math.round(s.level / 5) ? "bg-yellow" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div>
            <p className="display-font text-[10px] uppercase tracking-[0.3em] text-black/60">
              Soft skills & experience
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s) => (
                <span
                  key={s}
                  className="border-2 border-black px-3 py-1.5 text-xs transition-colors hover:bg-yellow"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="pixel-box mt-6 p-4 text-xs leading-relaxed">
              Communication, leadership and management practised in the field — four years on a
              church executive committee, team delivery at CAPACITI, and daily documentation and
              reporting across Microsoft 365 (Word, Excel, PowerPoint, Teams, Outlook).
            </div>
          </div>
        </div>
      </Page>

      {/* 04 — PROJECTS (black) */}
      <Page id="projects" index={3} active={active === 3}>
        <Heading>Projects</Heading>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="pixel-box-invert flex h-full flex-col bg-black p-5">
                <div className="display-font text-[10px] text-yellow">
                  {p.year} · {p.tag}
                </div>
                <h3 className="mt-2 text-base font-bold">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/75">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="border border-white/40 px-2 py-0.5 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Page>

      {/* 05 — EDUCATION (white) */}
      <Page id="education" index={4} active={active === 4}>
        <Heading>Education & certifications</Heading>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            {EDUCATION.map((e, i) => (
              <Reveal key={e.school} delay={i * 60}>
                <div className="pixel-box p-4">
                  <div className="display-font text-[10px] uppercase tracking-widest text-black/60">
                    {e.period}
                  </div>
                  <div className="mt-1 text-sm font-bold">{e.school}</div>
                  <div className="mt-1 text-xs text-black/70">{e.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {CERTIFICATIONS.map((c) => (
              <div key={c.name} className="border-2 border-black p-3 hover:bg-yellow">
                <div className="text-xs font-bold">{c.name}</div>
                <div className="text-[11px] text-black/60">{c.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* 06 — EXPERIENCE (black) */}
      <Page id="experience" index={5} active={active === 5}>
        <Heading>Work & leadership experience</Heading>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {EXPERIENCE.map((x, i) => (
            <Reveal key={x.role} delay={i * 80}>
              <div className="border-2 border-white/40 p-5">
                <div className="display-font text-[10px] text-yellow">{x.period}</div>
                <div className="mt-2 text-sm font-bold">{x.role}</div>
                <div className="text-xs text-white/60">{x.org}</div>
                <p className="mt-3 text-xs leading-relaxed text-white/75">{x.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-white/70">
          Four years of continuous service built practical management, financial stewardship,
          minute-taking and public communication skills that carry directly into technical teams.
        </p>
      </Page>

      {/* 07 — CONTACT (white) */}
      <Page id="contact" index={6} active={active === 6}>
        <Heading>Contact</Heading>
        <p className="mt-4 max-w-xl text-sm">
          Open to internships, junior roles and collaboration on AI and software projects.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="pixel-box flex flex-col gap-2 p-4 text-xs break-all hover:bg-yellow"
          >
            <Mail className="h-4 w-4" />
            <span className="display-font text-[10px] uppercase tracking-widest">Email</span>
            {PROFILE.email}
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="pixel-box flex flex-col gap-2 p-4 text-xs break-all hover:bg-yellow"
          >
            <Github className="h-4 w-4" />
            <span className="display-font text-[10px] uppercase tracking-widest">GitHub</span>
            {PROFILE.github.replace("https://", "")}
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="pixel-box flex flex-col gap-2 p-4 text-xs break-all hover:bg-yellow"
          >
            <Linkedin className="h-4 w-4" />
            <span className="display-font text-[10px] uppercase tracking-widest">LinkedIn</span>
            Thato Modiba
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-[11px] text-black/60">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {PROFILE.location}
          </span>
          <a href="/Thato-Modiba-CV.pdf" download className="underline">
            Download CV (PDF)
          </a>
          <span>© {new Date().getFullYear()} Thato Modiba</span>
        </div>
      </Page>
    </main>
  );
}
