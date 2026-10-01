# SEO Technical Plan — musaj.space Hermes-agent content

Anchors: **Hermes agent**, **Hermes AI agent**, **customize AI agent**, **AI agent workflow**, **Nous Research Hermes**.
All canonical URLs are `https://musaj.space/...` (the site is `musaj.space`, deployed via Vercel).

---

## 0. The single most important fact (read this first)

`musaj.space` is a **client-side SPA** (React + Vite) with **no server-side rendering**. `vercel.json` rewrites every route to `/index.html`. Google *can* render and index client-side JS, but to maximize crawlable, indexable article pages you must:

1. Add real per-article routes (`/writing/:slug`) and per-page `document.title` / `<meta>` injection.
2. Ship a `sitemap.xml` + `robots.txt` in `public/`.
3. Inject JSON-LD **Article** schema on each article page at runtime.

There is no SSR/SSG in this repo. Options if you want static HTML per article later: `vite-plugin-singlefile` won't do it; raise this by adding React Helmet or a custom meta component now (cheap), and consider a pre-render step (`react-snap`, `prerender.io`, or Vercel) as a phase-two improvement. The plan below makes the site correct today without a rebuild.

---

## 1. The three articles

| # | Title | Slug (route under `/writing/`) | Primary anchor |
|---|-------|-------------------------------|----------------|
| 1 | Why I build with Hermes agents | `why-i-build-with-hermes-agents` | Hermes agent / Nous Research Hermes |
| 2 | Customizing a Hermes agent to your workflow: my method | `customizing-a-hermes-agent-to-your-workflow` | customize AI agent / AI agent workflow |
| 3 | Shipping production apps with AI agents — what nobody tells you | `shipping-production-apps-with-ai-agents` | AI agent / shipping with AI agents |

Files (already created): `content/<slug>.md`.

---

## 2. Per-article meta (title, description, OG, canonical)

### Article 1 — why-i-build-with-hermes-agents

- **Meta title (≈60 chars):** `Why I Build with Hermes Agents — musaj`
- **Meta description (≈150 chars):** `A working engineer's honest case for building with Hermes agents by Nous Research — and why they beat the big-name agents for real, everyday work.`
- **Canonical:** `https://musaj.space/writing/why-i-build-with-hermes-agents`
- **OG title:** `Why I Build with Hermes Agents`
- **OG description:** `Why I build with Hermes agents by Nous Research — and why they win for real day-to-day automation work.`
- **OG image:** `https://musaj.space/og/why-hermes-1200x630.png` (create a 1200×630 OG image in `public/og/`)

### Article 2 — customizing-a-hermes-agent-to-your-workflow

- **Meta title (≈60 chars):** `Customizing a Hermes Agent to Your Workflow — musaj`
- **Meta description (≈150 chars):** `A concrete, repeatable method for customizing a Hermes AI agent to your workflow — system prompt, skills, memories, and testing.`
- **Canonical:** `https://musaj.space/writing/customizing-a-hermes-agent-to-your-workflow`
- **OG title:** `Customizing a Hermes Agent to Your Workflow`
- **OG description:** `My step-by-step method for customizing a Hermes AI agent to your workflow — prompt, skills, memory, tools, and testing.`
- **OG image:** `https://musaj.space/og/customize-hermes-1200x630.png`

### Article 3 — shipping-production-apps-with-ai-agents

- **Meta title (≈60 chars):** `Shipping Production Apps with AI Agents — musaj`
- **Meta description (≈150 chars):** `Hard-won, honest lessons on shipping real production apps with AI agents — including the failures — from an engineer shipping every day.`
- **Canonical:** `https://musaj.space/writing/shipping-production-apps-with-ai-agents`
- **OG title:** `Shipping Production Apps with AI Agents`
- **OG description:** `What nobody tells you about shipping production apps with AI agents — real lessons, real failures, from an engineer shipping daily.`
- **OG image:** `https://musaj.space/og/shipping-ai-1200x630.png`

**Shared defaults on every article page:** `og:type=article`, `og:site_name=musaj`, `og:url` = the canonical URL, `twitter:card=summary_large_image`, `twitter:title` = meta title, `twitter:description` = meta description.

---

## 3. JSON-LD Article schema (inject per article page)

Add this `<script type="application/ld+json">` when a `/writing/:slug` route renders. Values are the real title/slug — **no fabricated dates, authors, or figures.**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Customizing a Hermes Agent to Your Workflow: my method",
  "description": "A concrete, repeatable method for customizing a Hermes AI agent to your workflow — system prompt, skills, memories, and testing.",
  "author": { "@type": "Person", "name": "Musaj Muhammad Salihu", "url": "https://musaj.space" },
  "publisher": { "@type": "Person", "name": "Musaj Muhammad Salihu", "url": "https://musaj.space" },
  "mainEntityOfPage": "https://musaj.space/writing/customizing-a-hermes-agent-to-your-workflow",
  "url": "https://musaj.space/writing/customizing-a-hermes-agent-to-your-workflow",
  "image": "https://musaj.space/og/customize-hermes-1200x630.png",
  "wordCount": 1000,
  "inLanguage": "en"
}
```

Swap `headline`, `description`, `mainEntityOfPage`, `url`, `image`, and `wordCount` per article. Add `"datePublished"`/`"dateModified"` only when real dates are known. `Organization`/`WebSite` schema can go once in `index.html` (add `"@type": "WebSite"` with `url: https://musaj.space`).

---

## 4. Steps to do in the code

### 4a. `src/components/Blog.jsx`

The blog currently renders `SUBSTACK_POSTS` + `localStorage('musaj_blog')` as cards only. To surface these articles and make them crawlable:

1. **Add the three articles to the post list** alongside (or above) `SUBSTACK_POSTS`, each with `id`, `title`, `excerpt`, `date`, `tags`, `readTime`, **and `slug`** + a flag like `source: 'hermes'`.
2. **Make each card link to the article route** instead of only "Read on Substack." For `source: 'hermes'` posts, render a `<Link to={`/writing/${post.slug}`}>Read the article</Link>`.
3. Add a **tag "Hermes"** to all three so the existing tag-filter picks them up (`allTags` is computed from `posts` automatically, so the filter works without extra code).
4. Keep the `All` filter sensible — new posts appear at the top of the list when `posts` order is flipped.

### 4b. New article render page/route

1. Create `src/components/WritingPost.jsx` that reads the `slug` from the route, looks up the matching article (from a shared data module: move the three articles' frontmatter/content into `src/data/articles.js` or import the markdown), and:
   - sets `document.title` and a `document.querySelector('meta[name="description"]')` update (or install `react-helmet-async` for cleaner head management) to the per-article meta from §2;
   - injects the `og:*`, `twitter:*`, `canonical` link, and the JSON-LD `Article` script from §3;
   - renders the markdown body (install `react-markdown`, or pre-convert the `.md` files to a React-friendly format).
2. **Register the route** in `src/App.jsx`:
   ```jsx
   <Route path="/writing/:slug" element={<WritingPost />} />
   ```

### 4c. `index.html`

1. Keep the current static `title`/`description` as the **site-wide default** for the homepage (`/` returns this shell for every route today — the article pages must *override* it via JS from §4b).
2. Add global OG defaults in `<head>` so non-article pages still render reasonable social cards:
   ```html
   <meta property="og:site_name" content="musaj" />
   <meta property="og:type" content="website" />
   <meta property="og:url" content="https://musaj.space/" />
   <meta property="og:title" content="musaj — Fullstack Engineer & AI Agent Developer" />
   <meta property="og:description" content="...same as meta description..." />
   <meta property="og:image" content="https://musaj.space/musaj-social.svg" />
   <meta name="twitter:card" content="summary_large_image" />
   ```
3. Add a **`WebSite` JSON-LD** block for the homepage.

### 4d. Crawlability files (in `public/`)

**`public/robots.txt`:**
```
User-agent: *
Allow: /
Sitemap: https://musaj.space/sitemap.xml
```

**`public/sitemap.xml`** — include the homepage + all three article URLs (only real pages; `/writing/:slug` requires the route from §4b to actually resolve, otherwise crawlers get a 200 shell of the homepage duplicate):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://musaj.space/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://musaj.space/writing/why-i-build-with-hermes-agents</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://musaj.space/writing/customizing-a-hermes-agent-to-your-workflow</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://musaj.space/writing/shipping-production-apps-with-ai-agents</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

> **Note on rewriting:** `vercel.json` already rewrites `/(.*) → /index.html`, so the `/writing/:slug` URLs will serve the SPA. That's correct for the client-render approach, provided the article page sets its own meta. If Google doesn't pick up the articles after a few weeks, add a pre-render step (Vercel `og`/SSR or `prerender.io`) as phase two.

### 4e. `vercel.json` (optional, recommended)

Keep the SPA rewrite. No change strictly required. If you later add a `public/og/*.png` and pre-render, no config change needed either.

---

## 5. Rollout order

1. Land the three `content/<slug>.md` files (done).
2. Add `public/robots.txt` + `public/sitemap.xml` + `public/og/*.png` OG images.
3. Add `src/data/articles.js` + `src/components/WritingPost.jsx` + the `/writing/:slug` route in `App.jsx`.
4. Update `Blog.jsx` to link cards to the article routes and tag them "Hermes".
5. Add global OG defaults + `WebSite` JSON-LD to `index.html`.
6. Build (`npm run build`), deploy to Vercel, then submit `https://musaj.space/sitemap.xml` in **Google Search Console** and request indexing on the three article URLs.
7. Verify with the **URL Inspection** tool that each article URL renders as a standalone page with the correct title, description, canonical, and JSON-LD.

## 6. Human-first checks

- No fabricated metrics, benchmarks, or testimonials anywhere in the content or schema.
- Every canonical, OG URL, and sitemap `loc` points to real `musaj.space` paths.
- Titles/descriptions read for humans first; keywords are woven in naturally, not stuffed.
