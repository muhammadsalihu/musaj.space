import React, { useState } from 'react';
import { 
  Bot, Brain, Code, Search, Terminal, 
  Database, ChevronRight, AlertCircle,
  CreditCard, Check, ArrowLeft, MessageSquare,
  Loader, Download, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Agent = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [step, setStep] = useState('browse'); // browse, details, payment, processing, complete
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  const agents = [
    {
      id: 1,
      name: "ResearchGPT",
      icon: <Brain className="w-12 h-12 text-accent-pink" />,
      description: "AI-powered research paper analysis and summary",
      price: "$10/paper",
      features: [
        "Paper summarization",
        "Key findings extraction",
        "Related work analysis"
      ],
      example: "Upload your research paper and I'll provide a detailed analysis with key findings and related work suggestions."
    },
    {
      id: 2,
      name: "CodeOptimizer",
      icon: <Code className="w-12 h-12 text-accent-pink" />,
      description: "Performance optimization for research code",
      price: "$50/review",
      features: [
        "Code performance analysis",
        "Optimization suggestions",
        "Parallel computing recommendations"
      ],
      example: "Share your code repository and I'll analyze its performance, suggesting optimizations for better efficiency."
    },
    {
      id: 3,
      name: "DataScientist",
      icon: <Database className="w-12 h-12 text-accent-pink" />,
      description: "Automated data analysis and visualization",
      price: "$30/dataset",
      features: [
        "Statistical analysis",
        "Custom visualizations",
        "Insight generation"
      ],
      example: "Upload your dataset and I'll generate comprehensive statistical analysis with visualizations."
    }
  ];

  const simulateAgentResponse = (agentId, userInput) => {
    setLoading(true);
    setTimeout(() => {
      const responses = {
        1: "I've analyzed your research paper. Here are the key findings:\n\n1. Novel approach to multi-agent systems\n2. Significant performance improvements\n3. Potential applications in autonomous systems\n\nWould you like me to generate a detailed summary or focus on specific aspects?",
        2: "I've reviewed your code. Here are my optimization suggestions:\n\n1. Replace nested loops with vectorized operations\n2. Implement parallel processing for data transformation\n3. Optimize memory usage in large arrays\n\nShall I provide specific code examples for any of these improvements?",
        3: "Based on your dataset, I've identified these patterns:\n\n1. Strong correlation between variables X and Y\n2. Seasonal trends in the time series\n3. Potential outliers affecting results\n\nWould you like to see detailed visualizations of these findings?"
      };
      
      setMessages(prev => [...prev, 
        { type: 'user', content: userInput },
        { type: 'agent', content: responses[agentId] }
      ]);
      setLoading(false);
    }, 2000);
  };

  const PaymentForm = () => (
    <div className="bg-bg-elevated p-6 rounded-card border border-border-default">
      <h3 className="text-xl font-bold mb-4 text-text-primary">Payment Details</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2 text-text-secondary">Card Number</label>
          <input 
            type="text" 
            className="w-full bg-bg-tertiary border border-border-default rounded-xl p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-pink/50"
            placeholder="4242 4242 4242 4242"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 text-text-secondary">Expiry Date</label>
            <input 
              type="text" 
              className="w-full bg-bg-tertiary border border-border-default rounded-xl p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-pink/50"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-text-secondary">CVC</label>
            <input 
              type="text" 
              className="w-full bg-bg-tertiary border border-border-default rounded-xl p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-pink/50"
              placeholder="123"
            />
          </div>
        </div>
        <button 
          onClick={() => setStep('processing')}
          className="w-full bg-accent-pink py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center text-white font-semibold"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Pay {selectedAgent?.price}
        </button>
      </div>
    </div>
  );

  const ChatInterface = () => (
    <div className="bg-bg-elevated rounded-card h-96 flex flex-col border border-border-default">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block p-3 rounded-2xl ${
              message.type === 'user' 
                ? 'bg-accent-pink text-white rounded-br-sm' 
                : 'bg-bg-tertiary text-text-primary rounded-bl-sm'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center justify-center">
            <Loader className="w-6 h-6 text-accent-pink animate-spin" />
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border-default">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-bg-tertiary border border-border-default rounded-xl p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-pink/50"
            placeholder="Type your message..."
          />
          <button
            onClick={() => {
              if (inputText.trim()) {
                simulateAgentResponse(selectedAgent.id, inputText);
                setInputText('');
              }
            }}
            className="bg-accent-pink px-4 py-2 rounded-xl hover:opacity-90 transition text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 'browse':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div 
                key={agent.id}
                className="bg-bg-elevated p-6 rounded-card border border-border-default hover:border-accent-pink/30 cursor-pointer transition"
                onClick={() => {
                  setSelectedAgent(agent);
                  setStep('details');
                }}
              >
                <div className="mb-4">
                  {agent.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-text-primary">{agent.name}</h3>
                <p className="text-text-secondary mb-4">{agent.description}</p>
                <div className="text-accent-pink font-bold mb-4">{agent.price}</div>
                <button className="w-full bg-accent-pink py-2 rounded-xl hover:opacity-90 transition text-white font-semibold">
                  Hire Agent
                </button>
              </div>
            ))}
          </div>
        );

      case 'details':
        return (
          <div className="bg-bg-elevated p-6 rounded-card border border-border-default">
            <button 
              onClick={() => setStep('browse')}
              className="text-text-muted hover:text-text-primary mb-4 flex items-center transition"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Agents
            </button>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  {selectedAgent?.icon}
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{selectedAgent?.name}</h2>
                    <p className="text-text-secondary">{selectedAgent?.description}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2 text-text-primary">Features</h3>
                  <ul className="space-y-2">
                    {selectedAgent?.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-text-secondary">
                        <Check className="w-4 h-4 text-accent-pink mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2 text-text-primary">Example Interaction</h3>
                  <p className="text-text-secondary">{selectedAgent?.example}</p>
                </div>
                <button 
                  onClick={() => setStep('payment')}
                  className="w-full bg-accent-pink py-3 rounded-xl hover:opacity-90 transition text-white font-semibold"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return <PaymentForm />;

      case 'processing':
        return (
          <div className="bg-bg-elevated p-6 rounded-card text-center border border-border-default">
            <Loader className="w-12 h-12 text-accent-pink animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-text-primary">Processing Payment</h3>
            <p className="text-text-secondary">Please wait while we process your payment...</p>
            {setTimeout(() => setStep('complete'), 3000)}
          </div>
        );

      case 'complete':
        return (
          <div className="space-y-6">
            <div className="bg-bg-elevated p-6 rounded-card text-center border border-border-default">
              <div className="w-12 h-12 bg-accent-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">Payment Successful!</h3>
              <p className="text-text-secondary mb-4">You can now start working with your agent.</p>
              <button 
                onClick={() => setStep('chat')}
                className="bg-accent-pink px-6 py-2 rounded-xl hover:opacity-90 transition text-white font-semibold"
              >
                Start Chat
              </button>
            </div>
          </div>
        );

      case 'chat':
        return <ChatInterface />;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        {/* Header */}
        <header className="bg-bg-secondary border-b border-border-default p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button onClick={() => navigate('/')} className="text-text-muted hover:text-text-primary mr-6 flex items-center transition">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </button>
                <Bot className="w-8 h-8 text-accent-pink mr-2" />
                <span className="text-xl font-bold">Agent Musaj</span>
              </div>
              <button className="bg-accent-pink px-4 py-2 rounded-xl text-white font-semibold hover:opacity-90 transition">
                Connect Wallet
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-6">
          {step === 'browse' && (
            <div className="mb-12 text-center">
              <h1 className="font-display text-5xl md:text-7xl mb-4 leading-[0.9]">AI <span className="text-accent-pink">Agents</span> Marketplace</h1>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                Specialized AI agents trained to help with your development, data science, and research needs.
              </p>
            </div>
          )}
          
          {step === 'browse' && (
            <div className="relative mb-8 max-w-2xl mx-auto">
              <Search className="absolute left-4 top-3 text-text-muted" />
              <input 
                type="text"
                placeholder="What kind of agent do you need?"
                className="w-full bg-bg-elevated border border-border-default rounded-xl py-3 px-12 text-text-primary focus:border-accent-pink transition focus:outline-none focus:ring-2 focus:ring-accent-pink/50"
              />
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>

          {step === 'browse' && (
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              <div className="bg-bg-elevated p-6 rounded-card border border-border-default">
                <div className="text-3xl font-bold text-accent-pink">2,431</div>
                <div className="text-text-secondary">Tasks Completed</div>
              </div>
              <div className="bg-bg-elevated p-6 rounded-card border border-border-default">
                <div className="text-3xl font-bold text-accent-pink">98%</div>
                <div className="text-text-secondary">Success Rate</div>
              </div>
              <div className="bg-bg-elevated p-6 rounded-card border border-border-default">
                <div className="text-3xl font-bold text-accent-pink">1.2s</div>
                <div className="text-text-secondary">Avg Response Time</div>
              </div>
            </div>
          )}
          
          {step === 'browse' && (
            <div className="mt-20 bg-gradient-to-r from-bg-secondary to-bg-tertiary p-8 rounded-card border border-border-default">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">Build Your Own Custom Agent</h2>
                    <p className="text-text-secondary mb-4">
                      Need a specialized AI agent tailored to your unique requirements? Contact me to discuss building a custom solution for your business or research needs.
                    </p>
                    <button 
                      onClick={() => navigate('/contact')}
                      className="bg-accent-pink px-6 py-3 rounded-xl hover:opacity-90 transition text-white font-semibold"
                    >
                      Get in Touch
                    </button>
                  </div>
                  <div className="md:w-1/3">
                    <div className="bg-bg-elevated p-4 rounded-card border border-border-default">
                      <Brain className="w-24 h-24 text-accent-pink mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Agent;
