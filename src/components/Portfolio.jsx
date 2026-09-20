import React from 'react';
import { Code, Server, Brain, ChevronRight, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectsSection from "./ProjectsSection";
import Footer from './Footer';

const services = [
  {
    title: "React Native Mobile Development",
    icon: <Smartphone className="w-10 h-10 text-accent-pink" />,
    features: ["Cross-platform iOS & Android", "Expo & bare workflow", "LiveKit, Firebase integrations"],
  },
  {
    title: "AI Agent Development",
    icon: <Brain className="w-10 h-10 text-accent-pink" />,
    features: ["Claude API & Azure AI", "Physics & simulation agents", "Agentic pipelines & orchestration"],
  },
  {
    title: "Backend Services & Microservices",
    icon: <Server className="w-10 h-10 text-accent-pink" />,
    features: ["NestJS, Node.js, TypeScript", "Docker, AKS, Azure", "LDAP/AD & enterprise auth"],
  },
];

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-bg-primary text-text-primary">

        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-default">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <img src="/musaj-logo.svg" alt="Musaj logo" className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight font-body">
                Musaj<span className="text-accent-pink">.space</span>
              </span>
            </span>
            <div className="flex items-center gap-6 text-sm font-medium text-text-secondary">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-text-primary transition">Projects</button>
              <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-text-primary transition">Services</button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-accent-pink text-white px-5 py-2 rounded-full hover:opacity-90 transition font-semibold"
              >
                Hire Me
              </button>
            </div>
          </div>
        </nav>

        {/* Hero — Chat-style conversation */}
        <header className="bg-bg-primary relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent-pink/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <span className="inline-block bg-accent-lime/10 text-accent-lime text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase font-mono">
                Fullstack Engineer & AI Builder
              </span>
              
              {/* Massive display type headline */}
              <h1 className="font-display text-7xl md:text-9xl lg:text-[144px] leading-[0.85] mb-8 text-text-primary tracking-tight">
                Build.<span className="text-accent-pink">Ship.</span><br />Repeat.
              </h1>
              
              <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
                I build elite digital products — React Native apps, AI agents, and backend platforms — for startups and enterprises across Africa and beyond.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-accent-pink text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition flex items-center gap-2 text-base"
                >
                  Hire Me <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-text-primary text-text-primary px-8 py-4 rounded-full font-semibold hover:bg-text-primary hover:text-bg-primary transition text-base"
                >
                  View Projects
                </button>
              </div>

              {/* Chat-style conversation snippet — the Junior vibe */}
              <div className="mt-20 max-w-xl mx-auto">
                <div className="bg-bg-elevated rounded-2xl p-6 border border-border-default text-left">
                  {/* User message */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent-purple flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">M</div>
                    <div className="bg-bg-tertiary rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-text-primary">
                      @musaj why is my checkout failing? find the bug and fix it.
                    </div>
                  </div>
                  {/* My response */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent-pink flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">S</div>
                    <div className="flex-1">
                      <div className="bg-bg-tertiary rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-text-primary mb-2">
                        Found it. <span className="font-mono text-accent-lavender">a3f7c2</span> broke signature verification. Rolled back — errors are dropping now.
                      </div>
                      <div className="flex gap-2 text-xs text-text-muted font-mono">
                        <span className="text-accent-lime">✓ Sentry matched</span>
                        <span>·</span>
                        <span className="text-accent-lime">✓ GitHub confirmed</span>
                        <span>·</span>
                        <span className="text-accent-lime">✓ Fix shipped</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Projects */}
        <div id="projects" className="bg-bg-secondary py-20">
          <ProjectsSection />
        </div>

        {/* Services */}
        <section id="services" className="py-20 bg-bg-primary">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-display text-5xl md:text-7xl text-text-primary text-center mb-4 leading-[0.9]">
              What I <span className="text-accent-pink">Build</span>
            </h2>
            <p className="text-text-muted text-center mb-12 text-lg">Pricing on request — let's talk about your project.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-bg-elevated border border-border-default rounded-card p-8 hover:border-border-hover transition group">
                  <div className="mb-5">{service.icon}</div>
                  <h3 className="text-lg font-bold text-text-primary mb-4 group-hover:text-accent-pink transition">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-text-secondary text-sm">
                        <ChevronRight className="w-3 h-3 text-accent-pink flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/contact')}
                    className="mt-6 w-full border border-accent-pink text-accent-pink py-2.5 rounded-full text-sm font-semibold hover:bg-accent-pink hover:text-white transition"
                  >
                    Get in Touch
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-accent-pink">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-5xl md:text-7xl text-white mb-4 leading-[0.9]">Ready to Ship?</h2>
            <p className="text-pink-100 mb-8 text-lg">
              Let's build your next platform — mobile, AI, or backend.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-accent-pink px-10 py-4 rounded-full font-bold hover:opacity-90 transition inline-flex items-center gap-2 text-base"
            >
              Start a Project <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Portfolio;
