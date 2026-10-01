---
title: "Why I build with Hermes agents"
slug: why-i-build-with-hermes-agents
description: "A working engineer's honest case for building with Hermes agents by Nous Research — and what makes them win for real day-to-day work."
keywords: ["Hermes agent", "Hermes AI agent", "Nous Research Hermes", "AI agent workflow", "AI agent"]
reading_time: "6 min read"
category: "Voice & POV"
---

There's a moment that happens in every AI-native workflow: you ask the agent to do something, it does it, and you realise the tool has quietly become the default way you think about changing your own systems. That happened to me with Hermes — the agent framework by Nous Research.

I'm a fullstack engineer in Lagos. I build React Native apps, ship backends, and automate as much of my own grind as I can get away with. I've run every big-name coding agent you can name. Some of them are genuinely good. But over the last few quarters, everything I build on top of an agent runs on Hermes. This is the (probably too personal) argument for why.

## It treats the agent's life as config, not lock-in

The thing most agent tools sell you is a *product*. Hermes sells you a *workflow.* That sounds like marketing. It isn't.

With Hermes, your agent's entire operating model is files you can read, version, and diff. The system prompt, the tools, the skills, the scheduled routines, even the memories it keeps — they're all staring at you from a folder on disk. When something misbehaves, I don't open a settings panel and hope for a toggle. I open a markdown file, read what the agent is *actually* told to do, and change a sentence.

That's the entire difference. Most agent platforms treat behaviour as a black box you configure with sliders. Hermes treats behaviour as code. And I'm an engineer — I trust code I can read more than a widget I can't.

The practical consequence: I can hand a colleague a folder and say "run this agent," and they get the identical behaviour I have, because the identity of the agent lives in that folder, not in a cloud account.

## The conversation is my config layer

Here's the part that sold me. Hermes is built around a long-running conversation. My agent wakes up on a cron schedule, runs a standup, and posts the summary to my team's channel. During that session it builds context over time. It remembers the shape of my projects, the way I like error messages written, the things I told it not to do three weeks ago.

That means I don't re-explain myself every session. The agent carries the working relationship forward, and I get to *talk* to it — in plain English — to shape it. "From now on, when you finish a task, give me a diff-scoped summary." Done. That instruction persists. That's the personalization layer, and it's the one that actually matters for real work.

Most tools make you write that intent into a prompt template and pray. Hermes makes it a continuous edit of a living system.

## Open weights, local-friendly, honest about access

Hermes is built by Nous Research, and it ships on open models you can run yourself. I'm not going to fake a benchmark comparison I haven't run on a clean rig — I'll just say that for the work I do, the frontier-class models available through Hermes are more than adequate, and the ability to point the agent at a local model when I want privacy on client work is a real card to hold.

There's a professionalism angle too. When I'm building an agent for a client, "the AI runs on open weights and you control where the data goes" is a dramatically easier thing to sell than "mail your source code to a third-party cloud every day." In an African market where data-sovereignty questions are becoming sharper by the month, that matters.

## The tools actually get out of the way

Half of agent life is fighting the harness: the agent can't reach your repo, the terminal's busted, files "magically" can't be edited. Hermes ships with the tools a working engineer actually needs — filesystem, terminal, web, search — wired up and composable, and it lets me drop in connectors (Slack, Discord, email, and friends) without writing glue.

The result is that I spend my time on the *problem* again. The agent is genuinely autonomous enough to run unattended tasks and report back, and I trust it enough to leave it running. That is the real bar for an agent tool — not how smart it is in a demo, but whether you'd let it touch production while you sleep.

## What this means for the way I work

I use Hermes for three categories of things, and the categories have stayed stable:

1. **Automation that runs on schedule** — standups, reports, price checks, inbox triage. Things that used to consume my mornings.
2. **Heavy engineering loops** — battery of edits, refactors, scaffolding. The agent does the mechanical 80%, I review the critical 20%.
3. **Custom agents for clients** — teams I build who each get an agent molded to their workflow. This is now a real line of work for me.

Hermes didn't make me a faster typist. It changed what I attempt, because the cost of trying something — a new automation, a new tool, a new delivery — dropped to nearly zero. That's what I mean when I say I build *with* it. Not on it. With.

If you've been running a big-name agent and felt like you're fighting the product instead of building with it, try treating the agent as something you can open up and change. That's the whole bet Hermes makes, and I keep taking it.
