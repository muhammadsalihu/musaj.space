import React from 'react';
import { useAdmin } from '../AdminContext';
import { FolderKanban, FileText, Bot, Globe } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, sub }) => (
  <div className="bg-bg-elevated rounded-xl p-6 shadow-sm border border-border-default">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-text-muted">{label}</span>
      <div className="bg-accent-pink/10 p-2 rounded-lg">
        <Icon className="w-4 h-4 text-accent-pink" />
      </div>
    </div>
    <div className="text-3xl font-bold text-text-primary">{value}</div>
    {sub && <p className="text-xs text-text-muted mt-1">{sub}</p>}
  </div>
);

const Overview = () => {
  const { projects, blog, agents } = useAdmin();
  const published = blog.filter((p) => p.published).length;
  const deployed = agents.filter((a) => a.deployed).length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-1">Overview</h2>
      <p className="text-text-muted text-sm mb-8">Your site at a glance.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        <StatCard label="Projects" value={projects.length} icon={FolderKanban} sub="listed on site" />
        <StatCard label="Blog Posts" value={blog.length} icon={FileText} sub={`${published} published`} />
        <StatCard label="Agents" value={agents.length} icon={Bot} sub={`${deployed} deployed`} />
        <StatCard label="Site" value="Live" icon={Globe} sub="musaj.space" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-bg-elevated rounded-xl p-6 shadow-sm border border-border-default">
          <h3 className="font-semibold text-text-primary mb-4">Recent Blog Posts</h3>
          {blog.length === 0 ? (
            <p className="text-sm text-text-muted">No posts yet — create your first article in Blog.</p>
          ) : (
            <ul className="space-y-3">
              {blog.slice(0, 5).map((post) => (
                <li key={post.id} className="flex items-center gap-3">
                  <span className="text-sm text-text-primary truncate flex-1">{post.title}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                      post.published ? 'bg-accent-lime/10 text-accent-lime' : 'bg-bg-tertiary text-text-muted'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-bg-elevated rounded-xl p-6 shadow-sm border border-border-default">
          <h3 className="font-semibold text-text-primary mb-4">Deployed Agents</h3>
          {deployed === 0 ? (
            <p className="text-sm text-text-muted">No agents deployed — create one in Agents.</p>
          ) : (
            <ul className="space-y-3">
              {agents
                .filter((a) => a.deployed)
                .map((agent) => (
                  <li key={agent.id} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-lime rounded-full flex-shrink-0" />
                    <span className="text-sm text-text-primary flex-1">{agent.name}</span>
                    <span className="text-xs text-text-muted font-mono">{agent.model}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
