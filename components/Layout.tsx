import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-darker-blue via-dark-blue to-darker-blue">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
