import React, { useState } from 'react';
import { FileText, ChevronRight, ArrowLeft, Tag, ExternalLink, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const SUBSTACK_POSTS = [
  {
    id: 'substack-nft-gaming',
    title: 'NFT Gaming',
    excerpt: 'A new approach towards learning. In recent years, the popularity of non-fungible tokens (NFTs) and blockchain technology has seen a significant increase...',
    content: 'Full article on Substack',
    link: 'https://musaj.substack.com/p/nft-gaming',
    date: 'Mar 9, 2023',
    tags: ['NFT', 'Blockchain', 'Education'],
  },
  {
    id: 'substack-f1-schools',
    title: 'F1 in African Schools',
    excerpt: 'Case Study: Productize Yourself. Formula 1 (F1) is one of the most popular and exciting forms of motorsport in the world. This article explores how we can bring F1 to African schools to foster interest in STEM.',
    content: 'Full article on Substack',
    link: 'https://musaj.substack.com/p/f1-in-african-schools',
    date: 'Mar 9, 2023',
    tags: ['F1', 'STEM', 'Africa'],
  },
  {
    id: 'substack-coming-soon',
    title: 'Coming soon',
    excerpt: "This is Musaj's Substack, a newsletter about Thoughts of lived experiences.",
    content: 'Full article on Substack',
    link: 'https://musaj.substack.com/p/coming-soon',
    date: 'May 18, 2022',
    tags: ['Introduction'],
  },
];

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
  const localPosts = getLocalPosts();
  const posts = [...localPosts, ...SUBSTACK_POSTS];

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
              Writing
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
