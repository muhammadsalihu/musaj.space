import React, { useState, useEffect } from 'react';
import { FileText, ChevronRight, ArrowLeft, Tag, ExternalLink, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const SUBSTACK_FEED = 'https://musaj.substack.com/feed.xml';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

const parseRSS = (xmlText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');
  const items = doc.querySelectorAll('item');
  return Array.from(items).map((item, index) => {
    const title = item.querySelector('title')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const content = item.querySelector('content\\:encoded')?.textContent || '';
    const enclosure = item.querySelector('enclosure');
    const imageUrl = enclosure?.getAttribute('url') || '';
    
    // Parse date
    const date = pubDate ? new Date(pubDate).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    }) : '';

    // Strip HTML from description for excerpt
    const div = document.createElement('div');
    div.innerHTML = description;
    const excerpt = div.textContent?.slice(0, 200) || '';

    return {
      id: index,
      title,
      description: excerpt,
      content,
      link,
      date,
      imageUrl,
      tags: [],
    };
  });
};

const getSubstackPosts = async () => {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(SUBSTACK_FEED)}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const xmlText = await response.text();
    return parseRSS(xmlText);
  } catch (err) {
    console.error('Failed to fetch Substack feed:', err);
    return [];
  }
};

const getLocalPosts = () => {
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
  const [substackPosts, setSubstackPosts] = useState([]);
  const [localPosts, setLocalPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const [substack, local] = await Promise.all([
        getSubstackPosts(),
        Promise.resolve(getLocalPosts()),
      ]);
      setSubstackPosts(substack);
      setLocalPosts(local);
      setLoading(false);
    };
    loadPosts();
  }, []);

  const posts = [...localPosts, ...substackPosts];

  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))];
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All' ? posts : posts.filter((p) => (p.tags || []).includes(activeTag));

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-tertiary flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-accent-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted text-sm">Loading articles...</p>
        </div>
      </div>
    );
  }

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
            Writing
          </h1>
          <p className="text-text-muted mb-8">Thoughts, tutorials, and deep dives — also on <a href="https://musaj.substack.com" target="_blank" rel="noopener noreferrer" className="text-accent-lavender hover:underline">Substack</a></p>

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
                  {post.link && (
                    <span className="flex items-center gap-1 text-accent-lavender">
                      <BookOpen className="w-3 h-3" /> Substack
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-text-primary mb-2">{post.title}</h2>

                {post.excerpt && (
                  <p className="text-text-muted mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                )}

                {post.link ? (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-pink hover:opacity-80 transition"
                  >
                    Read on Substack <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  expanded === post.id && post.content && (
                    <div className="text-text-primary mb-4 whitespace-pre-wrap leading-relaxed border-t border-border-default pt-4 text-sm">
                      {post.content}
                    </div>
                  )
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-wrap gap-2">
                    {(post.tags || []).map((tag) => (
                      <span key={tag} className="text-xs bg-accent-pink/10 text-accent-pink px-2 py-0.5 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {!post.link && post.content && (
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
