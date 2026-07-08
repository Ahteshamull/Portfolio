"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    const msg = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].message) || '';
    if (
      msg.includes('A tree hydrated but some attributes') ||
      msg.includes('Hydration failed') ||
      msg.includes('There was an error while hydrating') ||
      msg.includes('bis_skin_checked')
    ) {
      return; // Suppress browser extension hydration warnings
    }
    originalError(...args);
  };
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  // Load theme from localStorage on client-side mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemPrefersDark ? 'dark' : 'dark'); // Default to dark for premium portfolio!
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
