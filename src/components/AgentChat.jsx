import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Bot, ArrowLeft, AlertCircle, Loader } from 'lucide-react';
import { chat } from '../lib/openrouter';
import Footer from './Footer';

const getAgent = (id) => {
  try {
    const stored = localStorage.getItem('musaj_agents');
    if (stored) {
      const agents = JSON.parse(stored);
      return agents.find((a) => a.id === id && a.deployed) || null;
    }
  } catch {}
  return null;
};

const Bubble = ({ msg }) => (
  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
    {msg.role === 'assistant' && (
      <div className="bg-accent-pink/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
        <Bot className="w-4 h-4 text-accent-pink" />
      </div>
    )}
    <div
      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
        msg.role === 'user'
          ? 'bg-accent-pink text-text-primary rounded-br-sm'
          : 'bg-bg-elevated text-text-primary border border-border-default rounded-bl-sm'
      }`}
    >
      {msg.content}
    </div>
  </div>
);

const AgentChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const agent = getAgent(id);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (agent) {
      setMessages([
        {
          role: 'assistant',
          content: `Hi! I'm ${agent.name}. ${agent.description ? agent.description + ' ' : ''}How can I help you today?`,
        },
      ]);
    }
  }, []);

  if (!agent) {
    return (
      <div className="min-h-screen bg-bg-tertiary flex items-center justify-center px-4">
        <div className="text-center">
          <Bot className="w-12 h-12 text-text-secondary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">Agent not found</h2>
          <p className="text-text-muted text-sm mb-6">This agent may not be deployed yet.</p>
          <button onClick={() => navigate('/agent')} className="text-accent-pink font-medium text-sm hover:opacity-80 transition">
            ← Back to Agent Hub
          </button>
        </div>
      </div>
    );
  }

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const reply = await chat({
        model: agent.model,
        systemPrompt: agent.systemPrompt,
        messages: updated.map(({ role, content }) => ({ role, content })),
      });
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch (err) {
      if (err.message === 'NO_KEY') {
        setError('OpenRouter API key not configured. Add VITE_OPENROUTER_API_KEY to your Vercel environment variables.');
      } else {
        setError(err.message || 'Something went wrong. Try again.');
      }
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-bg-tertiary flex flex-col">
        {/* Header */}
        <div className="bg-bg-elevated border-b border-border-default px-4 py-4 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button onClick={() => navigate('/agent')} className="text-text-muted hover:text-accent-pink transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-accent-pink/10 p-2 rounded-xl">
              <Bot className="w-5 h-5 text-accent-pink" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-text-primary truncate">{agent.name}</h1>
              <p className="text-xs text-text-muted truncate">{agent.model}</p>
            </div>
            <span className="text-xs bg-accent-lime/10 text-accent-lime px-2 py-1 rounded-full font-medium flex-shrink-0">
              Live
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <Bubble key={i} msg={msg} />
          ))}

          {loading && (
            <div className="flex items-center gap-2">
              <div className="bg-accent-pink/10 p-1.5 rounded-full h-7 w-7 flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-pink" />
              </div>
              <div className="bg-bg-elevated border border-border-default rounded-2xl rounded-bl-sm px-4 py-3">
                <Loader className="w-4 h-4 text-accent-pink animate-spin" />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 bg-accent-pink/10 border border-accent-pink/20 rounded-xl p-4 text-sm text-accent-pink">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Features list */}
        {agent.features?.length > 0 && messages.length <= 1 && (
          <div className="max-w-3xl w-full mx-auto px-4 pb-4">
            <p className="text-xs text-text-muted mb-2">This agent can help with:</p>
            <div className="flex flex-wrap gap-2">
              {agent.features.map((f, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(f); inputRef.current?.focus(); }}
                  className="text-xs bg-bg-elevated border border-border-default text-text-secondary px-3 py-1.5 rounded-full hover:border-accent-pink hover:text-accent-pink transition"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-bg-elevated border-t border-border-default px-4 py-4 sticky bottom-0">
          <div className="max-w-3xl mx-auto flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={`Message ${agent.name}…`}
              rows={1}
              className="flex-1 border border-border-default rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pink resize-none max-h-32 overflow-y-auto bg-bg-tertiary text-text-primary placeholder:text-text-muted"
              style={{ minHeight: '42px' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="bg-accent-pink text-text-primary p-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-40 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-xs text-text-muted mt-2">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </>
  );
};

export default AgentChat;
