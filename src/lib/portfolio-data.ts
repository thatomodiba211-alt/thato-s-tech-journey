export const PROFILE = {
  name: "Thato Modiba",
  age: 19,
  tagline: "Aspiring technologist",
  intro:
    "I'm Thato Modiba — a 19-year-old aspiring technologist turning curiosity into code. I build with AI, design with intent, and learn by solving real problems.",
  location: "Johannesburg, South Africa",
  email: "thatomodiba211@gmail.com",
  github: "https://github.com",
  linkedin:
    "https://www.linkedin.com/in/thato-modiba-9a7301421",
};

export const ABOUT_PARAGRAPHS = [
  "I am a 2031 tertiary student studying computer engineering, with a growing record of hands-on AI and software programmes. My foundation spans Coursera's Google AI courses and Anthropic's Claude AI course, giving me a working fluency with modern AI tooling.",
  "I matriculated from high school with a Bachelor's degree pass (NQF Level 4) — the highest school-leaving pass in South Africa — and went straight into building. In 2026 I participated in the FNB App Academy and MTN Academy, then furthered my studies at the University of Johannesburg Business School, bridging engineering depth with commercial thinking.",
  "Alongside the technical side I've built real communication, leadership and management experience: four years on a church executive committee, team delivery in the CAPACITI ASA learnship, and day-to-day work across the Microsoft 365 suite for documentation, reporting and collaboration.",
];

export const STATS = [
  { value: "4+", label: "AI & dev academies" },
  { value: "2031", label: "Engineering cohort" },
  { value: "4 yrs", label: "Leadership & management" },
  { value: "NQF 4", label: "Bachelor's pass" },
];

export type Skill = { name: string; level: number };

export const TECH_SKILLS: Skill[] = [
  { name: "Python", level: 80 },
  { name: "AI / LLM tooling (Claude, Google AI)", level: 85 },
  { name: "Microsoft 365 (Word, Excel, PowerPoint, Teams, Outlook)", level: 90 },
  { name: "Web & app development", level: 72 },
  { name: "TypeScript & React", level: 65 },
  { name: "Prompt engineering", level: 88 },
  { name: "Data & automation", level: 70 },
];

export const SOFT_SKILLS = [
  "Communication",
  "Leadership",
  "Management",
  "Problem-solving",
  "Teamwork",
  "Organisation",
  "Adaptability",
  "Financial stewardship",
  "Public speaking",
  "Time management",
];


export type Project = {
  title: string;
  blurb: string;
  description: string;
  tech: string[];
  tag: string;
  year: string;
};

export const PROJECTS: Project[] = [
  {
    title: "AI Study Companion",
    blurb: "An AI tutor that turns lecture notes into adaptive Q&A and summaries.",
    description:
      "Built during the CAPACITI ASA learnship, this assistant ingests study material and uses an LLM to generate practice questions, concise summaries and progress tracking for students revising dense coursework.",
    tech: ["Python", "Claude API", "Streamlit", "Prompt engineering"],
    tag: "AI · Education",
    year: "2026",
  },
  {
    title: "FNB App Academy Build",
    blurb: "A mobile-first financial literacy app for young South Africans.",
    description:
      "Shipped at the FNB App Academy, a community-focused app that teaches budgeting and saving through bite-sized lessons, quizzes and a simple savings tracker — designed for low-data environments.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Figma"],
    tag: "FinTech · Mobile",
    year: "2026",
  },
  {
    title: "Smart Campus Assistant",
    blurb: "A conversational bot answering student services questions instantly.",
    description:
      "A chatbot leveraging Google AI to answer common campus queries — registration, deadlines, facilities — reducing queue time and surfacing accurate, up-to-date information on demand.",
    tech: ["Python", "Google AI", "Dialogflow", "Flask"],
    tag: "AI · Services",
    year: "2026",
  },
];

export type EducationItem = {
  school: string;
  detail: string;
  period: string;
};

export const EDUCATION: EducationItem[] = [
  {
    school: "University of Johannesburg Business School",
    detail: "Furthered studies — bridging engineering with business strategy.",
    period: "2026 — present",
  },
  {
    school: "Computer Engineering (Tertiary)",
    detail: "Undergraduate programme, expected graduation 2031.",
    period: "Toward 2031",
  },
  {
    school: "CAPACITI ASA Learnship",
    detail: "Intensive technical learnship focused on real-world delivery.",
    period: "2026",
  },
];

export type Certification = {
  name: string;
  issuer: string;
};

export const CERTIFICATIONS: Certification[] = [
  { name: "Anthropic Claude", issuer: "Anthropic" },
  { name: "Google AI Essentials", issuer: "Google / Coursera" },
  { name: "FNB App Academy", issuer: "FNB" },
  { name: "MTN Academy", issuer: "MTN" },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  detail: string;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Additional Member",
    org: "Church Executive Committee",
    period: "Year 1",
    detail: "Supported committee operations and youth coordination across church activities.",
  },
  {
    role: "Treasurer",
    org: "Church Executive Committee",
    period: "Year 2",
    detail: "Managed finances, budgets and reporting — stewarding community funds with transparency.",
  },
  {
    role: "Secretary",
    org: "Church Executive Committee",
    period: "Years 3–4",
    detail: "Recorded minutes, coordinated communications and kept the committee running smoothly for 4 years total.",
  },
];

export type TimelineItem = {
  year: string;
  title: string;
  desc: string;
};

export const JOURNEY: TimelineItem[] = [
  { year: "2026", title: "Google AI Essentials & Claude AI", desc: "Completed Coursera Google AI courses and Anthropic's Claude AI course." },
  { year: "2026", title: "FNB App Academy & MTN Academy", desc: "Built and shipped apps in two flagship South African academies." },
  { year: "2026", title: "CAPACITI ASA Learnship", desc: "Intensive learnship sharpening delivery and collaboration." },
  { year: "2026", title: "UJ Business School", desc: "Furthered studies, bridging engineering with business." },
  { year: "→2031", title: "Computer Engineering", desc: "Tertiary programme in progress." },
];
