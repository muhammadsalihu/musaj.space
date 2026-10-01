import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Tag } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostBySlug, stripFrontmatter } from '../lib/writing';
import Footer from './Footer';

const WritingPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Basic markdown link renderer so internal /post links navigate via SPA
  const components = {
    a: ({ href, children }) => {
      if (href && href.startsWith('/')) {
        return (
          <a
            href={href}
            onClick={(e) => { e.preventDefault(); navigate(href); }}
            className="text-accent-lavender hover:underline"
          >
            {children}
          </a>
        );
      }
      return <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent-lavender hover:underline">{children}</a>;
    },
    h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold text-text-primary mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">{children}</h3>,
    p: ({ children }) => <p className="text-text-secondary leading-relaxed mb-5">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-5 text-text-secondary">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-5 text-text-secondary">{children}</ol>,
    strong: ({ children }) => <strong className="text-text-primary font-semibold">{children}</strong>,
    code: ({ children }) => <code className="bg-bg-elevated border border-border-default rounded px-1.5 py-0.5 text-sm font-mono text-accent-lime">{children}</code>,
  };

  if (!post) {
    return (
      <>
        <div className="min-h-screen bg-bg-tertiary py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-text-primary mb-4">Article not found</h1>
            <button onClick={() => navigate('/blog')} className="text-accent-pink hover:opacity-80">← Back to Writing</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-bg-tertiary py-16">
        <div className="max-w-3xl mx-auto px-4">
          <button
            onClick={() => navigate('/blog')}
            className="mb-10 text-accent-pink flex items-center gap-2 hover:opacity-80 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Writing
          </button>

          <p className="text-xs text-text-muted uppercase tracking-wide mb-3">
            {post.category} · {post.readingTime} · {post.date}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-text-muted mb-8 leading-relaxed">{post.description}</p>

          <div className="flex flex-wrap gap-2 mb-10">
            {(post.tags || []).map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs bg-accent-pink/10 text-accent-pink px-2 py-0.5 rounded-full font-medium">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>

          <div className="prose-custom border-t border-border-default pt-8">
            <ReactMarkdown components={components}>{stripFrontmatter(post.rawBody)}</ReactMarkdown>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WritingPost;
