import React from 'react';
import { ArrowUpRight, BookOpen, ExternalLink, FlaskConical, Github, Play } from 'lucide-react';
import { RESEARCH_ITEMS, RESEARCH_METHOD, RESEARCH_SITE, researchUrl } from '../lib/research';

const ResearchSection = () => {
  return (
    <section id="research" className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-4">
          <span className="inline-block bg-accent-lavender/10 text-accent-lavender text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase font-mono">
            Research &amp; Evaluation
          </span>
        </div>
        <h2 className="font-display text-5xl md:text-7xl text-text-primary text-center mb-4 leading-[0.9]">
          Research that <span className="text-accent-pink">ships</span>
        </h2>
        <p className="text-text-secondary text-center mb-6 text-lg max-w-3xl mx-auto">
          Benchmarks, evaluation methodology and engineering case studies from the Tupliq ecosystem —
          written up with the raw numbers attached, then shipped as live products.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <a
            href={RESEARCH_SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-pink text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition inline-flex items-center gap-2 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            research.tupliq.com
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <span className="text-text-muted text-sm self-center font-mono">
            {RESEARCH_ITEMS.length} published case studies · full write-ups at the hub
          </span>
        </div>

        {/* Case-study cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {RESEARCH_ITEMS.map((item) => (
            <article
              key={item.id}
              className="bg-bg-elevated border border-border-default rounded-card p-6 hover:border-border-hover transition group flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-accent-pink/10 p-3 rounded-xl">
                  <FlaskConical className="w-7 h-7 text-accent-pink" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs font-semibold text-accent-lavender bg-accent-lavender/10 px-2 py-1 rounded-full font-mono">
                    {item.category}
                  </span>
                  <span className="text-xs text-text-muted font-mono">{item.metric}</span>
                </div>
              </div>

              <span className="text-xs font-mono text-accent-lime mb-2">{item.tag}</span>
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-pink transition">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm mb-4">{item.summary}</p>

              <ul className="space-y-2 mb-5">
                {item.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-text-secondary text-sm">
                    <span className="text-accent-pink mt-0.5 flex-shrink-0">▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-5">
                {item.tech.map((t, i) => (
                  <span key={i} className="bg-bg-tertiary text-text-muted text-xs px-3 py-1 rounded-full font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-border-default">
                <a
                  href={researchUrl(item.anchor)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-accent-pink hover:opacity-80 transition"
                >
                  Read the case study <ArrowUpRight className="w-4 h-4" />
                </a>
                {item.repo && (
                  <a
                    href={item.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {item.play && (
                  <a
                    href={item.play}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition"
                  >
                    <ExternalLink className="w-4 h-4" /> Google Play
                  </a>
                )}
                {item.video && (
                  <a
                    href={item.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition"
                  >
                    <Play className="w-4 h-4" /> Walkthrough
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Method strip */}
        <div className="mt-14 bg-bg-elevated border border-border-default rounded-card p-8">
          <h3 className="text-sm font-mono uppercase tracking-widest text-text-muted mb-6">
            How the research is done
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESEARCH_METHOD.map((m, i) => (
              <div key={i}>
                <span className="text-xs font-mono text-accent-pink">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="text-text-primary font-bold mt-2 mb-2 text-sm">{m.title}</h4>
                <p className="text-text-secondary text-sm">{m.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResearchSection;
