---
title: "Shipping production apps with AI agents — what nobody tells you"
slug: "shipping-production-apps-with-ai-agents"
description: "Hard-won, honest lessons on shipping real production apps with AI agents — including the failures — from a fullstack engineer shipping every day."
keywords: ["AI agent", "shipping with AI agents", "AI agent workflow", "Hermes agent", "Hermes AI agent"]
reading_time: "7 min read"
category: "Engineering"
---

There's a version of this post that starts "AI agents shipped my app in a weekend and it was flawless." Nobody's life is that. Mine isn't. I've shipped real production apps where an AI agent did a huge chunk of the work — and I've also watched agents confidently break things that the tests didn't catch. Here's what actually happens, including the failures, so you don't have to learn them the expensive way.

## Nobody tells you the agent is a junior you can't fire

Here's the uncomfortable truth nobody puts in the marketing: a production-grade agent is not an oracle. It's a brilliant, tireless, occasionally reckless junior engineer who has read every Stack Overflow answer ever and remembers none of your specific context unless you make it stick.

That reframing fixes almost everything. You wouldn't hand a junior engineer your production repo and get coffee. Why would you do it with an agent? The agent is a force multiplier, not a replacement for engineering judgment. The moment you stop treating it as a peer who's expendable and start treating it as a junior who needs guardrails, review, and tests — your shipping velocity actually goes up instead of being a constant fire-fighting exercise.

## The failures (yes, plural)

Let me be honest about the things that went wrong, because the useful lessons live there.

**The confident, wrong refactor.** I had an agent "fix" an authentication flow and it did exactly what I asked — a very technical, very confident line-by-line edit — and blew a session-handling edge case that only surfaced in production under real load. The code was valid. The tests passed. The assumption underneath the task was wrong, and the agent didn't know it, so it didn't push back.

The lesson: an agent will happily execute a subtly wrong instruction at full speed. That's not a bug in the agent — that's a feature of delegation. If the *intent* is wrong, the agent's speed just makes the mistake bigger.

**The context gap.** In another project, the agent wrote "clean, idiomatic" code that beautifully violated an implicit constraint of the legacy system I hadn't told it about — because I didn't think to. It's not that the agent is dumb; it's that the agent only knows what's in context, and my under-specified prompt was the real bug.

**Success that smelled wrong.** The most dangerous failure of all: sometimes the agent produces something that *works*, and because it works and the tests pass, you ship it fast — and you didn't look hard at the parts where the agent made judgment calls you'd never make. Shipping an agent's work without review isn't speed. It's accumulating unknown debt.

## What actually makes it work

After enough of both wins and burn marks, I've landed on a few rules I don't break.

**1. The agent owns the mechanical 80%; I own the decision 20%.**
Code generation, refactors, scaffolding, boilerplate — the agent is unreal at this, and it's where the time savings really live. Design decisions, architectural tradeoffs, security boundaries, anything with a human or policy consequence — those stay with a person. Dividing it this way means the agent does the work it's genuinely good at, and I review where missteps actually cost.

**2. Tests are the contract, and they come first.**
With an agent in the loop, tests aren't a nice-to-have; they're the *only* way the agent knows it's done. I write the test as the spec *before* the agent writes the code, so "done" is a measurable thing rather than a vibe. A task without a test is an invitation to confident, unchecked behavior.

**3. Review gates are non-negotiable — including mine.**
No production merge happens without a human reading the diff, and no "it worked in staging" is a substitute for knowing *how* it worked. This slows down the happy path and it's worth it. The stakes aren't the agent's pride; they're my production.

**4. Scope the agent's power by default.**
Least privilege works for agents the way it works for people. I'd rather start with the agent able to do a narrow job well, then widen it, than hand over broad powers and rely on vigilance.

**5. Context is a responsibility, not an option.**
The single highest-leverage move is making sure the agent actually has the context it needs — your project, your conventions, your constraints. Layers of clever prompting can't fix an under-informed agent. Feed it well and it acts like a senior; starve it and it acts like an overconfident junior.

## What "shipping with AI agents" actually means

Real talk: shipping production apps with AI agents is not a hack, not a party trick, and often not even dramatically easier in the moment. It is a different way of working — one where delegation, review discipline, and explicit context replace the assumption that you personally wrote every line you're responsible for.

The reward isn't my weekend. The reward is that I now ship things I would previously have been too exhausted to attempt. I'm not manufacturing a demo; I'm telling you the trade. Hand the mechanical 80% to the agent, keep the decisions with a human, write the tests first, and review everything. Do that honestly, and the agent becomes the best hire you've ever made. Skip it, and it becomes the fastest way to break production you've ever had.

I know which one I've experienced more of. And I still chose the agent — I just learned to choose it without the blindfold.