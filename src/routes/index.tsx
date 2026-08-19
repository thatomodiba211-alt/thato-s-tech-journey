import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  GraduationCap,
  Award,
  Briefcase,
  Code2,
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
  type Project,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thato Modiba — Aspiring Technologist & Computer Engineering Student" },
      {
        name: "description",
        content:
          "Thato Modiba is a 19-year-old aspiring technologist studying computer engineering, with experience across Google AI, Anthropic Claude, FNB App Academy, MTN Academy and CAPACITI.",
      },
      { property: "og:title", content: "Thato Modiba — Aspiring Technologist" },
      {
        property: "og:description",
        content:
          "Computer engineering student (2031) building with AI. Google AI, Claude, FNB & MTN Academy alum.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

/* ---------- Reveal-on-scroll wrapper ---------- */
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
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

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "cream-surface/90 border-b hairline backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          className="display-font text-lg font-semibold tracking-tight text-ink"
          style={{ color: "var(--color-ink)" }}
        >
          Thato<span style={{ color: "var(--color-cream)" }}>.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
              style={{ color: "color-mix(in oklab, var(--color-ink) 72%, transparent)" }}
            >
              {n.label}
            </a>
          ))}
          <a
            href="/Thato-Modiba-CV.pdf"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--color-ink)", color: "var(--color-cream)" }}
          >
            <Download className="h-4 w-4" /> CV
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label="Toggle menu"
          style={{ color: "var(--color-ink)" }}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="cream-surface border-b hairline px-5 pb-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-ink hover:bg-ink/5"
              >
                {n.label}
              </a>
            ))}
            <a
              href="/Thato-Modiba-CV.pdf"
              className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-cream"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-screen items-center overflow-hidden ink-surface"
    >
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -right-32 top-20 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, var(--color-cream), transparent 70%)" }} />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[24rem] w-[24rem] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-cream), transparent 70%)" }} />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-16 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] ink-hairline"
                style={{ borderColor: "color-mix(in oklab, var(--color-cream) 30%, transparent)", color: "var(--color-cream)" }}>
                <Sparkles className="h-3.5 w-3.5" /> Aspiring in tech
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display-font mt-6 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
                style={{ color: "var(--color-cream)" }}>
                Hi, I'm <span style={{ color: "var(--color-cream)" }}>Thato</span>
                <br />
                Modiba<span style={{ color: "var(--color-ink-muted)" }}>.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--color-ink-muted)" }}>
                {PROFILE.intro}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: "var(--color-cream)", color: "var(--color-ink)" }}>
                  View my work <ArrowDown className="h-4 w-4" />
                </a>
                <a href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-cream/10 ink-hairline"
                  style={{ borderColor: "color-mix(in oklab, var(--color-cream) 35%, transparent)", color: "var(--color-cream)" }}>
                  Get in touch
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex items-center gap-5 text-sm" style={{ color: "var(--color-ink-muted)" }}>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {PROFILE.location}</span>
                <span className="h-4 w-px" style={{ background: "color-mix(in oklab, var(--color-cream) 25%, transparent)" }} />
                <span>{PROFILE.age} years young</span>
              </div>
            </Reveal>
          </div>

          {/* portrait card */}
          <Reveal delay={200} className="hidden lg:block">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-3 rounded-[2rem] opacity-30 blur-2xl"
                style={{ background: "var(--color-cream)" }} />
              <div className="relative overflow-hidden rounded-[2rem] border ink-hairline"
                style={{ borderColor: "color-mix(in oklab, var(--color-cream) 25%, transparent)", background: "color-mix(in oklab, var(--color-cream) 12%, transparent)" }}>
                <div className="aspect-[4/5] w-full p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="display-font text-5xl font-semibold" style={{ color: "var(--color-cream)" }}>TM</span>
                    <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--color-ink-muted)" }}>Est. 2031</span>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl ink-hairline"
                      style={{ borderColor: "color-mix(in oklab, var(--color-cream) 22%, transparent)" }}>
                      {STATS.map((s) => (
                        <div key={s.label} className="p-4" style={{ background: "color-mix(in oklab, var(--color-cream) 8%, transparent)" }}>
                          <div className="display-font text-2xl font-semibold" style={{ color: "var(--color-cream)" }}>{s.value}</div>
                          <div className="mt-1 text-[11px] uppercase tracking-wider" style={{ color: "var(--color-ink-muted)" }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const words = ["AI", "Computer Engineering", "Claude", "Google AI", "FNB Academy", "MTN Academy", "Innovation", "Problem-solving", "CAPACITI", "UJ Business School"];
  const row = [...words, ...words];
  return (
    <div className="border-y hairline overflow-hidden py-4" style={{ background: "var(--color-cream-soft)", borderColor: "color-mix(in oklab, var(--color-ink) 14%, transparent)" }}>
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="display-font text-lg font-medium text-ink/70"
            style={{ color: "color-mix(in oklab, var(--color-ink) 68%, transparent)" }}>
            {w} <span style={{ color: "var(--color-cream)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section heading ---------- */
function SectionHead({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal>
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "color-mix(in oklab, var(--color-ink) 55%, transparent)" }}>
          {kicker}
        </span>
        <h2 className="display-font mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "var(--color-ink)" }}>
          {title}
        </h2>
        {sub && <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="About me" title={<>Curiosity, engineered into <span style={{ color: "var(--color-cream)", background: "var(--color-ink)", padding: "0 0.3em", borderRadius: "0.2em" }}>capability</span>.</>} />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-5">
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="text-lg leading-relaxed" style={{ color: "color-mix(in oklab, var(--color-ink) 82%, transparent)" }}>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border hairline p-5" style={{ borderColor: "color-mix(in oklab, var(--color-ink) 14%, transparent)", background: "var(--color-cream-soft)" }}>
                  <div className="display-font text-3xl font-semibold" style={{ color: "var(--color-ink)" }}>{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider" style={{ color: "var(--color-muted-foreground)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Journey timeline */}
        <div className="mt-20">
          <Reveal>
            <h3 className="display-font text-2xl font-semibold" style={{ color: "var(--color-ink)" }}>The journey so far</h3>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {JOURNEY.map((j, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="group h-full rounded-2xl border hairline p-6 transition-all hover:-translate-y-1"
                  style={{ borderColor: "color-mix(in oklab, var(--color-ink) 12%, transparent)", background: "var(--color-card)" }}>
                  <span className="display-font text-sm font-semibold" style={{ color: "color-mix(in oklab, var(--color-ink) 55%, transparent)" }}>{j.year}</span>
                  <div className="mt-2 font-semibold" style={{ color: "var(--color-ink)" }}>{j.title}</div>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>{j.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  return (
    <section id="skills" className="px-5 py-24 sm:px-8" style={{ background: "var(--color-cream-soft)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="Skills" title="Technical depth & human skills." sub="A blend of AI fluency, engineering fundamentals and the leadership instincts forged in executive roles." />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border hairline p-7 sm:p-9" style={{ borderColor: "color-mix(in oklab, var(--color-ink) 12%, transparent)", background: "var(--color-card)" }}>
              <div className="flex items-center gap-2" style={{ color: "var(--color-ink)" }}>
                <Code2 className="h-5 w-5" /> <h3 className="display-font text-xl font-semibold">Technical</h3>
              </div>
              <div className="mt-7 space-y-6">
                {TECH_SKILLS.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                      <span>{s.name}</span>
                      <span style={{ color: "var(--color-muted-foreground)" }}>{s.level}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full" style={{ background: "color-mix(in oklab, var(--color-ink) 12%, transparent)" }}>
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${s.level}%`, background: "var(--color-ink)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl p-7 sm:p-9 ink-surface h-full">
              <div className="flex items-center gap-2" style={{ color: "var(--color-cream)" }}>
                <Sparkles className="h-5 w-5" /> <h3 className="display-font text-xl font-semibold">Soft skills</h3>
              </div>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {SOFT_SKILLS.map((s) => (
                  <span key={s} className="rounded-full border px-4 py-2 text-sm font-medium ink-hairline"
                    style={{ borderColor: "color-mix(in oklab, var(--color-cream) 30%, transparent)", color: "var(--color-cream)" }}>
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-7 text-sm leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                Leadership, stewardship and communication honed over four years on a church executive — as additional member, treasurer and secretary.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ink = i % 2 === 1;
  return (
    <Reveal delay={i * 80}>
      <article className={`group relative h-full overflow-hidden rounded-3xl border p-7 transition-all hover:-translate-y-1.5 ${ink ? "ink-surface ink-hairline" : "hairline"}`}
        style={{
          borderColor: ink ? "color-mix(in oklab, var(--color-cream) 22%, transparent)" : "color-mix(in oklab, var(--color-ink) 12%, transparent)",
          background: ink ? undefined : "var(--color-card)",
        }}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: ink ? "var(--color-cream)" : "color-mix(in oklab, var(--color-ink) 55%, transparent)" }}>
            {p.tag}
          </span>
          <span className="display-font text-sm" style={{ color: ink ? "var(--color-ink-muted)" : "var(--color-muted-foreground)" }}>{p.year}</span>
        </div>

        <h3 className="display-font mt-4 text-2xl font-semibold" style={{ color: ink ? "var(--color-cream)" : "var(--color-ink)" }}>
          {p.title}
        </h3>
        <p className="mt-2 font-medium" style={{ color: ink ? "var(--color-cream)" : "var(--color-ink)" }}>{p.blurb}</p>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: ink ? "var(--color-ink-muted)" : "var(--color-muted-foreground)" }}>
          {p.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: ink ? "color-mix(in oklab, var(--color-cream) 14%, transparent)" : "color-mix(in oklab, var(--color-ink) 8%, transparent)",
                color: ink ? "var(--color-cream)" : "var(--color-ink)",
              }}>
              {t}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="Selected work" title="Projects I've built & shipped." sub="Three representative builds spanning AI assistants, fintech and campus services." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Education + Certifications ---------- */
function Education() {
  return (
    <section id="education" className="px-5 py-24 sm:px-8" style={{ background: "var(--color-cream-soft)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="Education & credentials" title="Where I'm learning." />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-5" style={{ color: "var(--color-ink)" }}>
              <GraduationCap className="h-5 w-5" />
              <h3 className="display-font text-xl font-semibold">Education</h3>
            </div>
            <div className="space-y-4">
              {EDUCATION.map((e, i) => (
                <Reveal key={e.school} delay={i * 70}>
                  <div className="rounded-2xl border hairline p-5" style={{ borderColor: "color-mix(in oklab, var(--color-ink) 12%, transparent)", background: "var(--color-card)" }}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="font-semibold" style={{ color: "var(--color-ink)" }}>{e.school}</h4>
                      <span className="shrink-0 text-xs font-medium" style={{ color: "var(--color-muted-foreground)" }}>{e.period}</span>
                    </div>
                    <p className="mt-1.5 text-sm" style={{ color: "var(--color-muted-foreground)" }}>{e.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-5" style={{ color: "var(--color-ink)" }}>
              <Award className="h-5 w-5" />
              <h3 className="display-font text-xl font-semibold">Certifications</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {CERTIFICATIONS.map((c, i) => (
                <Reveal key={c.name} delay={i * 70}>
                  <div className="h-full rounded-2xl border hairline p-5 ink-surface">
                    <Award className="h-5 w-5" style={{ color: "var(--color-cream)" }} />
                    <h4 className="mt-3 font-semibold" style={{ color: "var(--color-cream)" }}>{c.name}</h4>
                    <p className="mt-1 text-sm" style={{ color: "var(--color-ink-muted)" }}>{c.issuer}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Work experience ---------- */
function Experience() {
  return (
    <section id="experience" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="Work & leadership" title="Four years of executive service." sub="Leadership built outside the classroom — stewarding people, money and communications." />

        <div className="mt-12 relative">
          <div className="absolute left-4 top-2 bottom-2 w-px sm:left-1/2" style={{ background: "color-mix(in oklab, var(--color-ink) 16%, transparent)" }} />
          <div className="space-y-8">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role} delay={i * 80}>
                <div className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${i % 2 ? "sm:flex-row-reverse" : ""}`}>
                  <div className="sm:w-1/2 sm:px-8">
                    <div className="rounded-2xl border hairline p-6" style={{ borderColor: "color-mix(in oklab, var(--color-ink) 12%, transparent)", background: "var(--color-card)" }}>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" style={{ color: "var(--color-muted-foreground)" }} />
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted-foreground)" }}>{e.period}</span>
                      </div>
                      <h4 className="mt-2 display-font text-lg font-semibold" style={{ color: "var(--color-ink)" }}>{e.role}</h4>
                      <p className="text-sm font-medium" style={{ color: "var(--color-muted-foreground)" }}>{e.org}</p>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>{e.detail}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full ring-4 sm:left-1/2"
                    style={{ background: "var(--color-ink)", boxShadow: "0 0 0 4px var(--color-cream-soft)" }} />
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const items = [
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "Thato Modiba", href: PROFILE.linkedin },
    { icon: Github, label: "GitHub", value: "View profile", href: PROFILE.github },
  ];
  return (
    <section id="contact" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] ink-surface p-8 sm:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-cream), transparent 70%)" }} />
          <div className="relative">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--color-cream)" }}>Contact</span>
              <h2 className="display-font mt-3 text-3xl font-semibold tracking-tight sm:text-5xl" style={{ color: "var(--color-cream)" }}>
                Let's build something.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>
                Open to opportunities, collaborations and good conversations about AI and engineering. Reach out — I'd love to hear from you.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {items.map((it, i) => (
                <Reveal key={it.label} delay={i * 90}>
                  <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="group flex h-full items-center gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-1 ink-hairline"
                    style={{ borderColor: "color-mix(in oklab, var(--color-cream) 24%, transparent)" }}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: "color-mix(in oklab, var(--color-cream) 14%, transparent)" }}>
                      <it.icon className="h-5 w-5" style={{ color: "var(--color-cream)" }} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider" style={{ color: "var(--color-ink-muted)" }}>{it.label}</span>
                      <span className="block truncate font-medium" style={{ color: "var(--color-cream)" }}>{it.value}</span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "var(--color-ink-muted)" }} />
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={280}>
              <a href={`mailto:${PROFILE.email}`}
                className="mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--color-cream)", color: "var(--color-ink)" }}>
                <Mail className="h-4 w-4" /> Say hello
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="px-5 py-10 sm:px-8" style={{ background: "var(--color-ink)" }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="display-font text-lg font-semibold" style={{ color: "var(--color-cream)" }}>
          Thato Modiba<span style={{ color: "var(--color-ink-muted)" }}>.</span>
        </span>
        <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
          © {new Date().getFullYear()} · Designed & built with intent.
        </p>
        <div className="flex items-center gap-3">
          <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full transition-colors ink-hairline"
            style={{ borderColor: "color-mix(in oklab, var(--color-cream) 24%, transparent)", color: "var(--color-cream)" }}>
            <Mail className="h-4 w-4" />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full transition-colors ink-hairline"
            style={{ borderColor: "color-mix(in oklab, var(--color-cream) 24%, transparent)", color: "var(--color-cream)" }}>
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-full transition-colors ink-hairline"
            style={{ borderColor: "color-mix(in oklab, var(--color-cream) 24%, transparent)", color: "var(--color-cream)" }}>
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
