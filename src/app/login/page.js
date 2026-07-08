"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, AlertCircle } from 'lucide-react';
import { useLoginMutation } from '@/store/apiSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('admin_authenticated') === 'true') {
        router.push('/dashboard');
      }
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      const response = await login({ username: cleanUsername, password: cleanPassword }).unwrap();
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('admin_authenticated', 'true');
        // Force page reload to ensure auth states refresh
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err?.data?.message || 'Invalid username or password.');
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 backdrop-blur-md shadow-lg space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Admin Portal Login</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your administrative credentials to manage portfolio items.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-xs font-semibold animate-slide-up">
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="username" className="text-xs font-bold text-slate-500 dark:text-slate-400">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <User size={16} />
              </span>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-955 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-250 transition-colors"
                placeholder="Enter username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold text-slate-500 dark:text-slate-400">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-955 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-250 transition-colors"
                placeholder="Enter password"
              />
            </div>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-550 hover:to-indigo-550 shadow-md shadow-purple-500/10 cursor-pointer hover:shadow-purple-500/20 active:scale-99 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Authenticating Admin...' : 'Authenticate Admin'}
          </button>
        </form>

        

      </div>
    </div>
  );
};

export default Login;
