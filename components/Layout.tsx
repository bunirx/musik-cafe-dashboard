import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserMenu from '@/components/UserMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-darker-blue via-dark-blue to-darker-blue">
      <Navbar />
      <div className="sticky top-[73px] z-40 flex justify-end pr-4 py-2">
        <UserMenu />
      </div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
