import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Zap, ZapOff, Bot, Download } from 'lucide-react';
import { useAdmin } from '../AdminContext';
import { MODELS } from '../../lib/openrouter';

const DEFAULT_MODEL = MODELS[0].id;
const EMPTY = { name: '', description: '', model: DEFAULT_MODEL, systemPrompt: '', price: '', features: '', category: '' };

const exportOpenClaw = (agent) => {
  const skill = {
    name: agent.name,
    version: '1.0.0',
    description: agent.description,
    category: agent.category || 'general',
    model: agent.model,
    systemPrompt: agent.systemPrompt,
    price: agent.price,
    features: agent.features,
    triggers: agent.features.slice(0, 3).map((f) => f.toLowerCase()),
    channels: ['whatsapp', 'telegram'],
    createdAt: agent.createdAt,
  };
  const blob = new Blob([JSON.stringify(skill, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${agent.name.toLowerCase().replace(/\s+/g, '-')}.openclaw.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const AgentForm = ({ initial = EMPTY, onSave, onCancel }) => {
  const [form, setForm] = useState({
    ...EMPTY,
    ...initial,
    features: Array.isArray(initial.features) ? initial.features.join('\n') : (initial.features || ''),
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({
      ...form,
      features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
    });
  };

  return (
    <div className="bg-bg-tertiary border border-border-default rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Agent Name *</label>
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. ResearchBot"
            className="w-full border border-border-default rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pink bg-bg-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Category</label>
          <input
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            placeholder="e.g. Research, Finance, Code"
            className="w-full border border-border-default rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pink bg-bg-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          rows={2}
          className="w-full border border-border-default rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pink bg-bg-primary resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Model</label>
          <select
            value={form.model}
            onChange={(e) => set('model', e.target.value)}
            className="w-full border border-border-default rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pink bg-bg_primary"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label} — {m.tag}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Price (display only)</label>
          <input
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            placeholder="e.g. $10/task, Free"
            className="w-full border border-border-default rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pink bg-bg-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1">System Prompt</label>
        <textarea
          value={form.systemPrompt}
          onChange={(e) => set('systemPrompt', e.target.value)}
          rows={5}
          placeholder="You are a helpful assistant that..."
          className="w-full border border-border-default rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pink bg-bg-primary resize-none font-mono"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1">
          Features / Capabilities (one per line — shown as quick-reply chips in chat)
        </label>
        <textarea
          value={form.features}
          onChange={(e) => set('features', e.target.value)}
          rows={4}
          placeholder={"Summarize a document\nAnswer questions\nGenerate a report"}
          className="w-full border border-border-default rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pink bg-bg-primary resize-none"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-accent-pink text-text-primary px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          <Check className="w-4 h-4" /> Save Agent
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 border border-border-default text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:bg-bg-tertiary transition"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </div>
  );
};

const AgentsManager = () => {
  const { agents, addAgent, updateAgent, deleteAgent, toggleDeploy } = useAdmin();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Agents</h2>
          <p className="text-text-muted text-sm mt-0.5">
            {agents.filter((a) => a.deployed).length} of {agents.length} deployed · powered by OpenRouter
          </p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditing(null); }}
          className="flex items-center gap-2 bg-accent-pink text-text-primary px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Create Agent
        </button>
      </div>

      {/* Model legend */}
      <div className="bg-bg-elevated rounded-xl p-4 border border-border-default shadow-sm mb-5">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Available Models</p>
        <div className="flex flex-wrap gap-2">
          {MODELS.map((m) => (
            <span key={m.id} className="text-xs bg-bg-tertiary border border-border-default text-text-secondary px-2 py-1 rounded-lg">
              <span className="font-medium">{m.label}</span>
              <span className="text-text-muted ml-1">— {m.tag}</span>
            </span>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-3">
          All models run via <span className="font-medium">OpenRouter</span>. Add <code className="bg-bg-tertiary px-1 rounded">VITE_OPENROUTER_API_KEY</code> to Vercel to activate.
        </p>
      </div>

      {adding && (
        <div className="mb-5">
          <AgentForm
            onSave={(data) => { addAgent(data); setAdding(false); }}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}

      {agents.length === 0 && !adding && (
        <div className="text-center py-24 text-text-muted">
          <Bot className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium text-text-muted">No agents yet</p>
          <p className="text-sm mt-1">Create your first AI agent and deploy it to your site.</p>
        </div>
      )}

      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.id}>
            {editing === agent.id ? (
              <AgentForm
                initial={agent}
                onSave={(data) => { updateAgent(agent.id, data); setEditing(null); }}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className="bg-bg-elevated rounded-xl p-4 shadow-sm border border-border-default flex items-center gap-4">
                <div className={`p-2.5 rounded-xl flex-shrink-0 ${agent.deployed ? 'bg-accent-lime/10' : 'bg-bg-tertiary'}`}>
                  <Bot className={`w-5 h-5 ${agent.deployed ? 'text-accent-lime' : 'text-text-muted'}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h3 className="font-semibold text-text-primary">{agent.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${agent.deployed ? 'bg-accent-lime/10 text-accent-lime' : 'bg-bg-tertiary text-text-muted'}`}>
                      {agent.deployed ? 'Deployed' : 'Inactive'}
                    </span>
                    {agent.category && (
                      <span className="text-xs bg-accent-pink/10 text-accent-pink px-2 py-0.5 rounded-full flex-shrink-0">{agent.category}</span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted truncate">{agent.description}</p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs text-text-muted font-mono truncate max-w-[200px]">{agent.model}</span>
                    {agent.price && <span className="text-xs text-text-muted">{agent.price}</span>}
                    {agent.deployed && (
                      <a
                        href={`/agent/${agent.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent-pink hover:underline"
                      >
                        /agent/{agent.id} ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 flex-wrap justify-end">
                  <button
                    onClick={() => toggleDeploy(agent.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      agent.deployed
                        ? 'bg-accent-lime/10 text-accent-lime hover:bg-accent-lime/20'
                        : 'bg-bg-tertiary text-text-secondary hover:bg-bg-elevated'
                    }`}
                  >
                    {agent.deployed ? <Zap className="w-3.5 h-3.5" /> : <ZapOff className="w-3.5 h-3.5" />}
                    {agent.deployed ? 'Live' : 'Deploy'}
                  </button>
                  <button
                    onClick={() => exportOpenClaw(agent)}
                    title="Export as OpenClaw skill"
                    className="p-2 text-text-muted hover:text-accent-lavender hover:bg-accent-lavender/10 rounded-lg transition"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { setEditing(agent.id); setAdding(false); }}
                    className="p-2 text-text-muted hover:text-accent-pink hover:bg-accent-pink/10 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { if (window.confirm('Delete this agent?')) deleteAgent(agent.id); }}
                    className="p-2 text-text-muted hover:text-accent-pink hover:bg-accent-pink/10 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentsManager;
