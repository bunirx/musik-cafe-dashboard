import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const navItems = [
    { path: '/documentation', label: 'Documentation' },
    { path: '/add', label: 'Add Bot' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/servers', label: 'Servers' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-aqua/20 bg-gradient-to-r from-darker-blue/80 to-dark-blue/80">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-aqua to-accent-blue flex items-center justify-center shadow-lg overflow-hidden">
                <img src="/logo.png" alt="Musik Cafe" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-400">MUSIK CAFE</p>
                <p className="gradient-text font-black text-lg">Dashboard</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(({ path, label }) => (
              <Link key={path} href={path}>
                <span
                  className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                    isActive(path)
                      ? 'bg-gradient-to-r from-aqua to-accent-blue text-white shadow-lg'
                      : 'text-gray-300 hover:bg-aqua/10 hover:text-aqua'
                  }`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-aqua hover:bg-aqua/10 p-2 rounded-lg transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            {navItems.map(({ path, label }) => (
              <Link key={path} href={path}>
                <span
                  className={`block px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                    isActive(path)
                      ? 'bg-gradient-to-r from-aqua to-accent-blue text-white'
                      : 'text-gray-300 hover:bg-aqua/10'
                  }`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
