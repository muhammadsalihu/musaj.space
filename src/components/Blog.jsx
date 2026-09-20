import React, { useState } from 'react';
import { FileText, ChevronRight, ArrowLeft, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const getPublishedPosts = () => {
  try {
    const stored = localStorage.getItem('musaj_blog');
    if (stored) {
      const all = JSON.parse(stored);
      return all.filter((p) => p.published);
    }
  } catch {}
  return [];
};

const Blog = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const posts = getPublishedPosts();

  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))];
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All' ? posts : posts.filter((p) => (p.tags || []).includes(activeTag));

  if (posts.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-bg-tertiary py-20">
          <div className="max-w-4xl mx-auto px-4">
            <button
              onClick={() => navigate('/')}
              className="mb-10 text-accent-pink flex items-center gap-2 hover:opacity-80 transition text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Technical <span className="text-accent-pink">Blog</span>
            </h1>
            <p className="text-text-muted mb-20">Thoughts, tutorials, and deep dives.</p>
            <div className="text-center py-24 text-text-muted">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl font-medium text-text-muted">No articles published yet</p>
              <p className="text-sm mt-2">Check back soon.</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-bg-tertiary py-20">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-10 text-accent-pink flex items-center gap-2 hover:opacity-80 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Technical <span className="text-accent-pink">Blog</span>
          </h1>
          <p className="text-text-muted mb-8">Thoughts, tutorials, and deep dives.</p>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {['All', ...allTags].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    activeTag === tag
                      ? 'bg-accent-pink text-text-primary'
                      : 'bg-bg-elevated text-text-secondary border border-border-default hover:border-accent-pink hover:text-accent-pink'
                  }`}
                >
                  {tag !== 'All' && <Tag className="w-3 h-3" />}
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {filtered.map((post) => (
              <article key={post.id} className="bg-bg-elevated rounded-card p-8 border border-border-default">
                <div className="flex items-center gap-3 mb-3 text-xs text-text-muted">
                  <span>{post.date}</span>
                  {post.readTime && <span>· {post.readTime}</span>}
                </div>

                <h2 className="text-xl font-bold text-text-primary mb-2">{post.title}</h2>

                {post.excerpt && (
                  <p className="text-text-muted mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                )}

                {expanded === post.id && post.content && (
                  <div className="text-text-primary mb-4 whitespace-pre-wrap leading-relaxed border-t border-border-default pt-4 text-sm">
                    {post.content}
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-wrap gap-2">
                    {(post.tags || []).map((tag) => (
                      <span key={tag} className="text-xs bg-accent-pink/10 text-accent-pink px-2 py-0.5 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {post.content && (
                    <button
                      onClick={() => setExpanded(expanded === post.id ? null : post.id)}
                      className="flex items-center gap-1 text-sm font-medium text-accent-pink hover:opacity-80 transition flex-shrink-0 ml-4"
                    >
                      {expanded === post.id ? 'Collapse' : 'Read more'}
                      <ChevronRight className={`w-4 h-4 transition-transform ${expanded === post.id ? 'rotate-90' : ''}`} />
                    </button>
                  )}
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <p className="text-center text-text-muted py-16">No posts match this filter.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
