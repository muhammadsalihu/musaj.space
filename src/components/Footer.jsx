import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceLinks = [
    'React Native Mobile Development',
    'AI Agent Development',
    'Backend Services & Microservices',
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="w-5 h-5" />, url: 'https://github.com/musaj' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/in/musaj' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com/musaj' },
    { name: 'Email', icon: <Mail className="w-5 h-5" />, url: 'mailto:contact@musaj.space' },
  ];

  return (
    <footer className="bg-bg-secondary border-t border-border-default text-text-primary">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/musaj-logo.svg" alt="Musaj logo" className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Musaj<span className="text-accent-pink">.space</span></h2>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Fullstack Engineer building AI-powered platforms across Africa and beyond.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-text-secondary hover:text-accent-pink transition text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((s, i) => (
                <li key={i} className="text-text-secondary text-sm">{s}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-bg-elevated p-2 rounded-full text-text-secondary hover:text-accent-pink hover:bg-bg-tertiary transition"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border-default mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-text-muted">
          <p>© {currentYear} Musaj.space. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
