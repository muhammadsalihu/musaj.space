import React from 'react';
import { ExternalLink, Video, Globe, Lock, ShoppingBag, FlaskConical, Code, Brain, Server, Database, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const ICON_MAP = { Video, Globe, Lock, ShoppingBag, FlaskConical, Code, Brain, Server, Database, Layers };

const ProjectIcon = ({ name, className }) => {
  const Icon = ICON_MAP[name] || Code;
  return <Icon className={className} />;
};

const DEFAULT_PROJECTS = [
  {
    id: '1',
    title: 'Ultrapalace',
    description: 'Real-time livestreaming platform with multi-host rooms, live chat, and audience engagement features built for scale.',
    tech: ['React Native', 'Expo', 'LiveKit', 'Firebase'],
    icon: 'Video',
    liveLabel: 'Demo on request',
    liveUrl: null,
    category: 'Mobile & Streaming',
    inProgress: false,
  },
  {
    id: '2',
    title: 'Airbills Digital',
    description: 'Premium digital agency platform featuring a team portal, project showcase, blog, and a learning hub for clients.',
    tech: ['React Native', 'Node.js', 'TypeScript'],
    icon: 'Globe',
    liveLabel: 'airbills.digital',
    liveUrl: 'https://airbills.digital',
    category: 'Platform',
    inProgress: false,
  },
  {
    id: '3',
    title: 'T2Mobile Auth Service',
    description: 'Enterprise LDAP/Active Directory microservice powering authentication across telco platforms with high availability.',
    tech: ['NestJS', 'Docker', 'AKS'],
    icon: 'Lock',
    liveLabel: 'Architecture on request',
    liveUrl: null,
    category: 'Enterprise',
    inProgress: false,
  },
  {
    id: '4',
    title: 'Umnafass',
    description: 'E-commerce platform for personalized gifts — browse, customize, and deliver meaningful products with seamless checkout.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    icon: 'ShoppingBag',
    liveLabel: 'Live',
    liveUrl: null,
    category: 'E-commerce',
    inProgress: false,
  },
  {
    id: '5',
    title: 'SimAgent',
    description: 'AI agent for physics simulation — leverages Claude API and Azure to automate complex simulation workflows. Built for Microsoft Hackathon 2026.',
    tech: ['Python', 'Claude API', 'Azure'],
    icon: 'FlaskConical',
    liveLabel: 'In progress',
    liveUrl: null,
    category: 'AI / Research',
    inProgress: true,
  },
];

const getProjects = () => {
  try {
    const stored = localStorage.getItem('musaj_projects');
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_PROJECTS;
};

const ProjectsSection = () => {
  const navigate = useNavigate();
  const isStandalonePage = window.location.pathname === '/projects';
  const projects = getProjects();

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {isStandalonePage && (
            <button
              onClick={() => navigate('/')}
              className="mb-8 text-accent-pink flex items-center gap-2 hover:opacity-80 transition text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          )}

          <h2 className="font-display text-5xl md:text-7xl text-text-primary text-center mb-3 leading-[0.9]">
            Featured <span className="text-accent-pink">Projects</span>
          </h2>
          <p className="text-text-muted text-center mb-12 text-lg">Real products built for real clients and real users.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={project.id || index} className="bg-bg-elevated border border-border-default rounded-card p-6 hover:border-border-hover transition group flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-accent-pink/10 p-3 rounded-xl">
                    <ProjectIcon name={project.icon} className="w-8 h-8 text-accent-pink" />
                  </div>
                  {project.inProgress && (
                    <span className="text-xs font-semibold bg-accent-lime/10 text-accent-lime px-2 py-1 rounded-full">In Progress</span>
                  )}
                </div>
                <span className="text-xs font-semibold text-accent-lavender bg-accent-lavender/10 px-2 py-1 rounded-full w-fit mb-3 font-mono">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-pink transition">{project.title}</h3>
                <p className="text-text-secondary text-sm mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="bg-bg-tertiary text-text-muted text-xs px-3 py-1 rounded-full font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-accent-pink hover:opacity-80 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {project.liveLabel}
                    </a>
                  ) : (
                    <span className="text-sm text-text-muted italic">{project.liveLabel}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isStandalonePage && <Footer />}
    </>
  );
};

export default ProjectsSection;
