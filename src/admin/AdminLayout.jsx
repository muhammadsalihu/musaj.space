import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, FileText, Bot, ExternalLink, LogOut, Menu, X } from 'lucide-react';
import { useAdmin } from './AdminContext';

const NAV = [
  { to: '/my-admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/my-admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/my-admin/blog', label: 'Blog', icon: FileText },
  { to: '/my-admin/agents', label: 'Agents', icon: Bot },
];

const Sidebar = ({ open, onClose }) => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-bg-primary flex flex-col z-30 transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="px-5 py-5 border-b border-border-default flex items-center justify-between">
          <div>
            <p className="text-text-primary font-bold">musaj.space</p>
            <p className="text-text-muted text-xs mt-0.5">Admin</p>
          </div>
          <button onClick={onClose} className="md:hidden text-text-muted hover:text-text-primary transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-accent-pink text-text-primary' : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-border-default space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-bg-elevated transition"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </a>
          <button
            onClick={() => { logout(); navigate('/my-admin'); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-accent-pink hover:bg-bg-elevated transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-tertiary">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:ml-56 min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-bg-elevated border-b border-border-default sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-text-secondary hover:text-text-primary transition"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-text-primary">musaj.space</span>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
