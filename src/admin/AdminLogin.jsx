import React, { useState } from 'react';
import { useAdmin } from './AdminContext';
import { Lock, LogIn, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const { login, skipLogin } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!login(password)) setError('Incorrect password.');
  };

  return (
    <div className="min-h-screen bg-bg-tertiary flex items-center justify-center px-4">
      <div className="bg-bg-elevated rounded-card shadow-sm border border-border-default p-10 w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent-pink p-2 rounded-xl">
            <Lock className="w-5 h-5 text-text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">musaj.space</h1>
            <p className="text-xs text-text-muted">Admin Dashboard</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter admin password"
              className="w-full border border-border-default rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-pink focus:border-transparent bg-bg-primary"
            />
            {error && <p className="text-accent-pink text-xs mt-1.5">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-accent-pink text-text-primary py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-default" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-bg-elevated px-3 text-xs text-text-muted">or</span>
          </div>
        </div>

        <button
          onClick={skipLogin}
          className="w-full border border-border-default text-text-secondary py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-bg-tertiary transition"
        >
          Continue without login
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
