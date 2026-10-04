---
title: "My agent burned $12 of input tokens on one feature. Here's the forensic breakdown."
slug: agent-input-token-cost-forensics
description: "A real post-mortem: one agentic coding session, 82.59M input tokens, $12 on Nebius. Where the tokens actually went, why prompt caching didn't save us, and the provider/tooling changes that cut input cost 10x."
keywords: ["AI agent cost", "input tokens", "prompt caching", "Nebius Token Factory", "LLM pricing", "agentic workflow cost", "DeepSeek pricing", "agent engineering"]
reading_time: "9 min read"
category: "Engineering"
hackathon: "Nebius x NVIDIA Devpost Hackathon"
---

> This post is part of my build log for the **Nebius × NVIDIA Devpost Hackathon** — I'm building a cloud-agent product on Nebius infrastructure, and these cost post-mortems are straight from the trenches.

A feature shipped last week — a Pro-only Cloud Agent module for an Expo/React Native app, with a NestJS backend behind it: server-side entitlement gating, a push-notification endpoint that was silently dead, a plain-English cron parser, and a WebView host for an embedded agent dashboard. Real feature, real code, all deployed and verified.

The bill: **$12 of input tokens** on a $0.15/M model. Output was ~$0.40. The input line was 30x the output line, and that inversion is the whole story of agentic economics in 2026.

## The receipts

I pulled the per-session token accounting from local telemetry (`session_model_usage` in Hermes' state DB) and reconciled it against the provider's public price catalog. Two sessions tell the whole story:

| Session | Model | API calls | Input tokens | Cache reads reported | Model list price |
|---|---|---|---|---|---|
| Cloud agent build (Oct 2–3) | DeepSeek-V4-Pro | 156 | 24.9M | **0** | $1.75/M |
| Same thread, next sessions | GLM-5.3-Flash | 332 | 5.5M new + 120M "cached" | 120.5M | $0.15/M |

Reconciling the user-visible "82.59M billed input" against the $12 charge gives an effective rate of $0.145/M — which is exactly the GLM-5.3-Flash catalog price. So the dashboard's number is real: **82.59M tokens were billed at the full input rate** despite a large share of them being repeated context that any cache-discounting provider would have charged at ~10% of that.

And the DeepSeek-V4-Pro session? 24.9M tokens at $1.75/M with zero cache hits is ~$43 at list price. Same provider, same failure mode, worse price.

## Why the cache didn't save us

Hermes' accounting showed `cache_read_tokens: 120,466,688` on the GLM session. If that were discounted, the session's input bill would have been pennies. It wasn't.

The root cause is provider-side, not app-side: **Nebius Token Factory does not offer prompt caching with discounted pricing at all.** There's an open feature request on their ideas board — dated, with dozens of comments from users calling it a blocker for agentic workloads. Their docs describe KV-cache as an internal *throughput* optimization, not a billing one. Cache reads are billed at the full input rate. The API's usage response *reports* cached token counts, which is what local telemetry recorded — but nothing was discounted.

This is the trap: every tool in the ecosystem reports cache hits, and you only find out what they actually *cost* when the invoice arrives. Your local numbers can look 90% cached while your provider bills 100%.

So the burn was structural:

- **Every API call re-sends the entire context** — system prompt, conversation history, every tool result — and gets billed at full input price.
- **The fixed overhead is heavy.** A production agent system prompt with skills, memory, and tool schemas ran ~28.5KB (~8K tokens) on every single call. Across 332 calls that's 2.7M tokens of pure prefix.
- **Tool call count is the multiplier.** The feature session made ~170 API calls. A growing context means call N costs more than call N−1: the first call bills ~10K tokens, the last bills ~95K. The sum is roughly quadratic in session length.
- **Un-cached reads amplify it.** 27 `read_file` calls and 131 `execute_code` calls produced ~360KB of tool output — each one landing in the context and being re-billed on every subsequent call for the rest of the session.

The brutal arithmetic of agent sessions: output is a rounding error, input is the business model, and without provider-side caching, **input cost scales with (number of tool calls) × (average context size)**. Both factors grow as the session gets longer. That's why long agentic coding sessions are the most expensive thing you can do with a model, and why the same feature costs 10x more on some providers than others.

## What actually cuts the cost

Ordered by leverage, from things that worked immediately to things that need provider changes:

**1. Route long agentic coding sessions to providers with real prompt caching.** This is the single biggest lever. DeepSeek's official API bills cached input at $0.033/M versus $0.28/M uncached — an ~8x discount on exactly the tokens that dominate an agent session. OpenRouter passes that through to many models. Groq's free tier (which our backend already uses as the free-tier primary) charges nothing. Anthropic's 90-minute cache gives 90% off on reads. Moving a 24.9M-token session from an uncached $1.75/M provider to a cached one turns ~$43 into under $3. Nothing else on this list comes close.

**2. Batch tool calls aggressively.** The agent runtime supports issuing multiple independent tool calls in one turn. Every round-trip you eliminate removes an entire full-context re-bill. The difference between "read 5 files in 5 calls" and "read 5 files in 1 batched call" is 4 complete context re-sends. On a 60K-token context at $0.15/M, each eliminated call saves about a cent — which is nothing per call and hundreds of dollars per year of agent usage. Cheap discipline, compounding returns.

**3. Right-size file reads.** A 39KB single-file read is fine once; reading it in fragments, or re-reading it after a small edit, re-bills the whole thing on every subsequent call. Read once, edit surgically, and pull only the ranges you need when the file is huge.

**4. Keep sessions scoped.** Cost per call grows with context. One feature per session beats one marathon session for three features — the third feature inherits the first two's entire history as a prefix on every call. Compaction resets the prefix (and re-bills the rebuild), so the cheapest session is one that ends before it needs surgery.

**5. Audit the provider's caching story before you commit.** Ask one question: *"What do I pay for a token that appears in my prompt twice?"* If the answer is "the same as once" (Nebius today), long agentic workloads are mispriced on that provider no matter how efficient your prompt is. If it's "10% or less" (DeepSeek direct, Anthropic, OpenRouter on cache-capable models), the same session costs an order of magnitude less.

## The uncomfortable conclusion

The same feature cost $0.11 of model time on the sessions where we used the free chain (Groq primary), and $12+ where it ran on uncached Nebius. Identical code, identical quality bar. The difference was routing.

Agentic input costs are not primarily a prompt-engineering problem. They're a **routing problem**: which provider sees the long session, and whether that provider discounts repeated context. A team that treats provider choice as an infra decision — cache support, per-M rates, tiered routing — will spend 10x less than one that picks a model by vibes and pays the invoice. We now route long coding sessions to cache-friendly providers by default and keep the flat-rate provider for short bursts, and the next feature should cost about a dollar, not twelve.

The feature shipped. The lesson cost $12. The fix costs a line in the routing config.
