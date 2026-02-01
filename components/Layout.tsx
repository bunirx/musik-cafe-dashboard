import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserMenu from '@/components/UserMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-darker-blue via-dark-blue to-darker-blue">
      <Navbar />
      <div className="sticky top-[72px] z-40 bg-gradient-to-r from-darker-blue/90 to-dark-blue/90 backdrop-blur-lg border-b border-aqua/20 py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-end">
          <UserMenu />
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
