// Research & case-study index.
//
// Every entry here is a public, reproducible artifact documented on
// research.tupliq.com — the case-study hub for the Tupliq ecosystem.
// Keep this list in sync with the anchors on that site.

export const RESEARCH_SITE = 'https://research.tupliq.com';

export const researchUrl = (anchor) => (anchor ? `${RESEARCH_SITE}/#${anchor}` : RESEARCH_SITE);

export const RESEARCH_ITEMS = [
  {
    id: 'mecheval',
    anchor: 'mecheval',
    title: 'Tupliq MechEval',
    tag: 'AI Evaluation · Research',
    category: 'Benchmark',
    year: '2026',
    summary:
      'A code-graded benchmark that scores frontier AI models on real mechanical-engineering physics — deterministic graders, five professional tasks, published raw results.',
    bullets: [
      'Code-graded, not vibe-graded: every task scored against a reference solution methodology',
      'Reproducible by design — Python 3.11+, published repro commands, 33 tests passing',
      'Honest reporting: AI-assisted development disclosure plus known limitations',
    ],
    tech: ['Python', 'Eval Design', 'Mechanical Engineering'],
    metric: '33 tests passing',
    repo: 'https://github.com/muhammadsalihu/tupliq-mecheval',
    video: 'https://youtu.be/9wNIa13TxZU',
  },
  {
    id: 'tupliq-agent',
    anchor: 'tupliq-agent',
    title: 'Tupliq Agent',
    tag: 'Mobile · AI Agent · Monetized',
    category: 'Product Research',
    year: '2026',
    summary:
      'A mobile AI agent that turns a plain-language request into structured, reusable output — with a provider fallback chain and monetization designed in from the first commit.',
    bullets: [
      'Provider chain with fallback: Gemini ▸ OpenAI ▸ Anthropic, keys never leave the backend',
      'Server-enforced usage limits and RevenueCat-written entitlements (trust nothing client-side)',
      'Zod-validated structured outputs with one bounded repair pass on malformed model responses',
    ],
    tech: ['React Native', 'Expo', 'NestJS', 'Prisma', 'RevenueCat'],
    metric: 'Live on Google Play',
    repo: 'https://github.com/muhammadsalihu/tupliq-backend',
    play: 'https://play.google.com/store/apps/details?id=com.tupliq.agent',
  },
  {
    id: 'multiphysics',
    anchor: 'multiphysics',
    title: 'Tupliq Multiphysics',
    tag: 'Simulation · Desktop · Rust',
    category: 'Applied Research',
    year: '2026',
    summary:
      'A Tauri (Rust) + React workbench for co-simulation and virtual commissioning — Geometry → Mesh → Solve → Results as a real numbered pipeline, not decorative tabs.',
    bullets: [
      'Rust core with a React + TypeScript + Tailwind v4 frontend; JS ↔ Rust round trip proven end to end',
      'Solver sidecar seam for @agent-musaj/gmsh-generator and @agent-musaj/elmer-generator, streaming stdout to a live log panel',
      'Roadmap centres on FMI/FMU co-simulation and a virtual PLC loop — the least-served part of the problem',
    ],
    tech: ['Tauri', 'Rust', 'React', 'three.js', 'FMI/FMU'],
    metric: 'Active development',
    repo: 'https://github.com/muhammadsalihu/tupliq-multiphysics',
  },
  {
    id: 'launchpad',
    anchor: 'launchpad',
    title: 'Tupliq Launchpad',
    tag: 'Agent Tooling · Open Source',
    category: 'Developer Tooling',
    year: '2026',
    summary:
      'A Hermes Agent plugin that puts RevenueCat revenue metrics and git-driven Play Store changelogs inside the agent you already talk to.',
    bullets: [
      'Four tools in one plugin: overview, revenue, chart, and changelog drafting',
      'Zero dependencies — stdlib urllib only, so nothing to install or break',
      'Read-only, scoped API key stored through Hermes\u2019 credential route, never in config.yaml',
    ],
    tech: ['Hermes Agent', 'Python', 'RevenueCat'],
    metric: '4 tools, 0 deps',
    repo: 'https://github.com/muhammadsalihu/tupliq-launchpad',
  },
];

// How the research work is actually done — shown as a method strip on the homepage.
export const RESEARCH_METHOD = [
  {
    title: 'Code-graded, not vibe-graded',
    body: 'Claims are scored by deterministic graders against a reference solution, with the grading logic itself validated.',
  },
  {
    title: 'Reproducible by design',
    body: 'Pinned runtimes, published reproduction commands, and every quoted figure read from the run\u2019s own raw output files.',
  },
  {
    title: 'Raw results published',
    body: 'Failure modes are reported as recorded, including the cases where the models — and the tooling — fell short.',
  },
  {
    title: 'Shipped, not just written',
    body: 'Each study maps to a live artifact: a Play Store release, a public repo, or a running desktop app.',
  },
];
