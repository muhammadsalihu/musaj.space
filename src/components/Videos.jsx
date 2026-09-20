import React, { useState } from 'react';
import { ExternalLink, ArrowLeft, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const CHANNELS = [
  { id: 'UC8thEnlk8zR64CzWlRMlMew', name: 'Musaj' },
];

const parseYouTubeFeed = (xmlText) => {
  const videos = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  
  while ((match = entryRegex.exec(xmlText)) !== null) {
    const entry = match[1];
    
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1] || '';
    const link = entry.match(/<link rel="alternate" href="([^"]*)"/)?.[1] || '';
    const published = entry.match(/<published>([^<]*)<\/published>/)?.[1] || '';
    const videoId = entry.match(/<yt:videoId>([^<]*)<\/yt:videoId>/)?.[1] || '';
    // Use a reliable thumbnail URL format
    const thumbUrl = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '');
    const description = entry.match(/<media:description>([^<]*)<\/media:description>/)?.[1] || '';
    
    const date = published ? new Date(published).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    }) : '';

    videos.push({ title, link, date, videoId, thumbnail: thumbUrl, description });
  }
  
  return videos;
};

const loadChannelVideos = async (channelId) => {
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const xml = await response.text();
    return parseYouTubeFeed(xml);
  } catch {
    return [];
  }
};

const Videos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const load = async () => {
      const results = await Promise.all(CHANNELS.map(ch => loadChannelVideos(ch.id)));
      const all = results.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
      setVideos(all);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-tertiary flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-accent-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted text-sm">Loading videos...</p>
        </div>
      </div>
    );
  }

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
          <p className="text-text-muted mb-12">Music production, official videos, and more from my YouTube channels.</p>

          {videos.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-text-muted">Could not load videos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <a
                  key={video.videoId}
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-bg-elevated rounded-card overflow-hidden border border-border-default hover:border-border-hover transition">
                    <div className="relative aspect-video bg-bg-tertiary">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-12 h-12 text-text-muted" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-14 h-14 bg-accent-pink rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent-pink transition">
                        {video.title}
                      </h3>
                      <p className="text-xs text-text-muted mt-2">{video.date}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

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
