'use client';

import AdminBlogDashboard from '@/components/AdminBlogDashboard';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper authentication)
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      setIsAuthorized(true);
      localStorage.setItem('karms-admin-auth', 'true');
    } else {
      setError('Invalid password');
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('karms-admin-auth') === 'true';
    setIsAuthorized(isAuth);
  }, []);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-forest-green mb-2">
            KARMS Admin
          </h1>
          <p className="text-forest-green/70 mb-6">
            Kissan Agro Reforms and Management Systems
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-forest-green mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border-2 border-forest-green/20 rounded-lg focus:border-dragon-pink focus:outline-none"
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-dragon-pink hover:bg-dragon-pink/90 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-forest-green/50 mt-6 text-center">
            Default password: admin123
          </p>
        </div>
      </div>
    );
  }

  return <AdminBlogDashboard />;
}
