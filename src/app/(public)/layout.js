import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 animate-fade-in">
        {children}
      </main>
      <Footer />
    </>
  );
}
