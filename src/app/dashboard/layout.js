"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Wrench, Briefcase, UserCheck, ArrowLeftRight, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';
      if (!isAuthenticated) {
        router.replace('/login');
      } else {
        setAuth(true);
      }
    }
    setMounted(true);
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_authenticated');
      window.location.href = '/login';
    }
  };

  const menuItems = [
    { name: 'Overview & Inbox', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Manage Projects', path: '/dashboard/projects', icon: <FolderKanban size={18} /> },
    { name: 'Manage Services', path: '/dashboard/services', icon: <Wrench size={18} /> },
    { name: 'Manage Experience', path: '/dashboard/experience', icon: <Briefcase size={18} /> },
    { name: 'Edit Personal Profile', path: '/dashboard/profile', icon: <UserCheck size={18} /> },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };

  if (!mounted || !auth) {
    return (
      <div className="w-full min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400">Authenticating session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-955 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 md:sticky md:top-0 md:h-screen shrink-0 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-4 md:p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="pb-4 border-b border-slate-200/50 dark:border-slate-800">
            <h2 className="text-sm font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest">Admin Dashboard</h2>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Manage public profile dynamically</p>
          </div>

          <nav className="space-y-1 flex flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15 dark:border-purple-400/20'
                    : 'text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-6 border-t border-slate-200/50 dark:border-slate-800 mt-6 md:mt-0">
          {/* Back to Public Website */}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/5 transition-all"
          >
            <ArrowLeftRight size={16} />
            View Public Site
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-semibold rounded-xl text-red-655 dark:text-red-400 hover:bg-red-500/5 transition-all text-left cursor-pointer"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main dashboard content area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
