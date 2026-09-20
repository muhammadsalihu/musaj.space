import React from 'react';
import { ExternalLink, ArrowLeft, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const VIDEOS = [
  {
    title: 'Introducing Musaj From Airbills Digital',
    url: 'https://www.youtube.com/shorts/hqSk4ohhvH4',
    date: 'Feb 2026',
    thumbnail: 'https://img.youtube.com/vi/hqSk4ohhvH4/maxresdefault.jpg',
    videoId: 'hqSk4ohhvH4',
  },
  {
    title: 'Tributes to Softpreneur',
    url: 'https://www.youtube.com/watch?v=6JwXWBc0SuM',
    date: 'May 2022',
    thumbnail: 'https://img.youtube.com/vi/6JwXWBc0SuM/maxresdefault.jpg',
    videoId: '6JwXWBc0SuM',
  },
];

const Videos = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-bg-tertiary py-20">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-10 text-accent-pink flex items-center gap-2 hover:opacity-80 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <h1 className="text-4xl font-bold text-text-primary mb-2">Videos</h1>
          <p className="text-text-muted mb-12">
            Music production, and more from my YouTube channel{' '}
            <a
              href="https://www.youtube.com/@musaj.airbills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-lavender hover:underline"
            >
              @musaj.airbills
            </a>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VIDEOS.map((video) => (
              <a
                key={video.videoId}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="bg-bg-elevated rounded-card overflow-hidden border border-border-default hover:border-border-hover transition">
                  <div className="relative aspect-video bg-bg-tertiary">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`; }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-14 h-14 bg-accent-pink rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-pink transition">
                      {video.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-2">{video.date}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://www.youtube.com/@musaj.airbills"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-pink hover:opacity-80 transition font-medium"
            >
              View all on YouTube <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Videos;
