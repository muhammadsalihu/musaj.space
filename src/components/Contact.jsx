import React, { useState } from 'react';
import { Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <div className="min-h-screen bg-bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={() => navigate('/')}
            className="mb-8 text-accent-pink flex items-center hover:opacity-80 transition font-medium"
          >
            <ArrowLeft className="mr-2 w-5 h-5" /> Back to Home
          </button>
          
          <h1 className="font-display text-5xl md:text-7xl text-text-primary mb-8 leading-[0.9]">
            Let's Build <span className="text-accent-pink">Together</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-bg-elevated border border-border-default rounded-card p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-lime/20 mb-4">
                    <CheckCircle2 className="w-8 h-8 text-accent-lime" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h3>
                  <p className="text-text-secondary">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-text-secondary mb-2 text-sm font-medium">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-bg-tertiary border border-border-default rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-pink/50 focus:border-accent-pink transition placeholder:text-text-muted"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-text-secondary mb-2 text-sm font-medium">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-bg-tertiary border border-border-default rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-pink/50 focus:border-accent-pink transition placeholder:text-text-muted"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-text-secondary mb-2 text-sm font-medium">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-bg-tertiary border border-border-default rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-pink/50 focus:border-accent-pink transition resize-none placeholder:text-text-muted"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-accent-pink text-white py-4 rounded-full font-semibold flex items-center justify-center hover:opacity-90 transition text-base ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="bg-bg-elevated border border-border-default rounded-card p-8 h-full">
                <h3 className="text-2xl font-bold text-text-primary mb-4">Contact Information</h3>
                <p className="text-text-secondary mb-6">
                  Have a project in mind? Want to collaborate? Just hit me up — I respond within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-2">Email</h4>
                    <p className="text-accent-pink">contact@musaj.space</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-2">Location</h4>
                    <p className="text-text-secondary">Lagos, Nigeria</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-2">Availability</h4>
                    <p className="text-text-secondary">Open for freelance & full-time roles</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-2">What I Do</h4>
                    <p className="text-text-secondary">React Native • AI Agents • Backend • LiveKit • Firebase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-bg-elevated border border-border-default rounded-card p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">Frequently Asked Questions</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">What services do you offer?</h4>
                <p className="text-text-secondary">I specialize in React Native mobile apps, AI agent development (Claude API, Azure), backend microservices, and real-time platforms with LiveKit.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">What is your typical turnaround time?</h4>
                <p className="text-text-secondary">Most MVPs ship in 3-4 weeks. Enterprise projects range 6-12 weeks depending on scope. I always give honest estimates.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">Do you offer ongoing maintenance?</h4>
                <p className="text-text-secondary">Yes — I offer retainer packages for bug fixes, feature additions, and monitoring after launch. Never ghost my clients.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">How do we get started?</h4>
                <p className="text-text-secondary">Send me a message with your project details. I'll respond within 24 hours with a free 30-min consultation call to scope it out.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
