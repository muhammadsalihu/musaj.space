import whyBuild from '../../content/why-i-build-with-hermes-agents.md?raw';
import customizing from '../../content/customizing-a-hermes-agent-to-your-workflow.md?raw';
import shipping from '../../content/shipping-production-apps-with-ai-agents.md?raw';
import tokenForensics from '../../content/agent-input-token-cost-forensics.md?raw';

// Lazy-hosted article records — body is pulled from the committed markdown files.
export const WRITING_POSTS = [
  {
    slug: 'why-i-build-with-hermes-agents',
    title: 'Why I build with Hermes agents',
    description: "A working engineer's honest case for building with Hermes agents by Nous Research — and what makes them win for real day-to-day work.",
    category: 'Voice & POV',
    readingTime: '6 min read',
    date: 'Oct 2026',
    tags: ['Hermes', 'AI Agents', 'Nous Research'],
    rawBody: whyBuild,
  },
  {
    slug: 'customizing-a-hermes-agent-to-your-workflow',
    title: 'Customizing a Hermes agent to your workflow: my method',
    description: 'A concrete, repeatable method for customizing a Hermes AI agent to your workflow — system prompt, skills, memories, and testing.',
    category: 'Tutorial',
    readingTime: '8 min read',
    date: 'Oct 2026',
    tags: ['Hermes', 'Customization', 'Workflow'],
    rawBody: customizing,
  },
  {
    slug: 'shipping-production-apps-with-ai-agents',
    title: 'Shipping production apps with AI agents — what nobody tells you',
    description: 'Hard-won lessons on shipping production apps with AI agents: guardrails, tests as contract, and the failures that taught me.',
    category: 'Engineering',
    readingTime: '7 min read',
    date: 'Oct 2026',
    tags: ['AI Agents', 'Production', 'Lessons'],
    rawBody: shipping,
  },
  {
    slug: 'agent-input-token-cost-forensics',
    title: "My agent burned $12 of input tokens on one feature. Here's the forensic breakdown.",
    description: "A real post-mortem: one agentic coding session, 82.59M input tokens, $12 on Nebius. Where the tokens actually went, why prompt caching didn't save us, and the routing changes that cut input cost 10x.",
    category: 'Engineering',
    readingTime: '9 min read',
    date: 'Oct 2026',
    tags: ['AI Agents', 'Cost Engineering', 'Prompt Caching'],
    rawBody: tokenForensics,
  },
];

// Strip YAML frontmatter (--- ... ---) from a raw markdown body, return just the article content.
export function stripFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  return m ? raw.slice(m[0].length) : raw;
}

export function getPostBySlug(slug) {
  return WRITING_POSTS.find((p) => p.slug === slug) || null;
}
