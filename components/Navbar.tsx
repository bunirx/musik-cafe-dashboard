import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path ? 'text-aqua border-b-2 border-aqua' : 'text-gray-300 hover:text-aqua';
  };

  return (
    <nav className="bg-darker-blue/80 backdrop-blur-md border-b border-aqua/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua to-accent-blue flex items-center justify-center">
              <span className="text-white font-bold text-lg">🎵</span>
            </div>
            <span className="text-xl font-bold gradient-text">Musik Cafe</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/documentation">
            <span className={`pb-2 cursor-pointer transition-colors ${isActive('/documentation')}`}>
              Documentation
            </span>
          </Link>
          <Link href="/add">
            <span className={`pb-2 cursor-pointer transition-colors ${isActive('/add')}`}>
              Add Bot
            </span>
          </Link>
          <Link href="/dashboard">
            <span className={`pb-2 cursor-pointer transition-colors ${isActive('/dashboard')}`}>
              Dashboard
            </span>
          </Link>
          <Link href="/servers">
            <span className={`pb-2 cursor-pointer transition-colors ${isActive('/servers')}`}>
              Servers
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-aqua hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
