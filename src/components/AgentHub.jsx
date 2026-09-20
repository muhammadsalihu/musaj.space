import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Bot, ArrowRight, Zap } from 'lucide-react';
import Footer from './Footer';

const getDeployedAgents = () => {
  try {
    const stored = localStorage.getItem('musaj_agents');
    if (stored) return JSON.parse(stored).filter((a) => a.deployed);
  } catch {}
  return [];
};

const AgentCard = ({ icon, title, description, tag, onClick, badge }) => (
  <button
    onClick={onClick}
    className="bg-bg-elevated rounded-card p-6 border border-border-default hover:border-accent-pink/30 hover:shadow-md transition group text-left flex flex-col w-full"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="bg-accent-pink/10 p-3 rounded-xl">{icon}</div>
      {badge && (
        <span className="text-xs font-semibold bg-accent-lime/10 text-accent-lime px-2 py-1 rounded-full">{badge}</span>
      )}
    </div>
    {tag && (
      <span className="text-xs font-semibold text-accent-pink bg-accent-pink/10 px-2 py-1 rounded-full w-fit mb-3">{tag}</span>
    )}
    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-pink transition">{title}</h3>
    <p className="text-text-muted text-sm flex-1">{description}</p>
    <div className="flex items-center gap-1 mt-4 text-accent-pink text-sm font-medium">
      Open <ArrowRight className="w-4 h-4" />
    </div>
  </button>
);

const AgentHub = () => {
  const navigate = useNavigate();
  const agents = getDeployedAgents();

  return (
    <>
      <div className="min-h-screen bg-bg-tertiary">
        {/* Header */}
        <div className="bg-bg-elevated border-b border-border-default px-4 py-5">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => navigate('/')}
              className="text-accent-pink text-sm font-medium hover:opacity-80 transition mb-4 flex items-center gap-1"
            >
              ← Home
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-accent-pink p-2 rounded-xl">
                <Bot className="w-5 h-5 text-text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Agent Hub</h1>
                <p className="text-text-muted text-sm">AI-powered tools, ready to use</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Invoice Agent — always present */}
            <AgentCard
              icon={<FileText className="w-6 h-6 text-accent-pink" />}
              tag="Finance"
              title="Invoice Agent"
              description="Generate professional invoices and send them directly to clients via WhatsApp."
              onClick={() => navigate('/agent/invoice')}
            />

            {/* Deployed agents from admin */}
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                icon={<Zap className="w-6 h-6 text-accent-pink" />}
                tag={agent.category || 'Agent'}
                title={agent.name}
                description={agent.description || 'AI-powered assistant.'}
                badge="Live"
                onClick={() => navigate(`/agent/${agent.id}`)}
              />
            ))}
          </div>

          {agents.length === 0 && (
            <p className="text-center text-text-muted text-sm mt-12">
              More agents coming soon.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgentHub;
