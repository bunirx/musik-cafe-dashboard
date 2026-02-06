import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BunpannyDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('bunpanel_token');
    const userData = localStorage.getItem('bunpanel_user');
    
    if (!token) {
      router.push('/bunpanny/login');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('bunpanel_token');
    localStorage.removeItem('bunpanel_user');
    router.push('/bunpanny/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-lg">BunPanel</h1>
          <div className="flex items-center gap-4">
            <a href="/bunpanny/bots" className="text-slate-300 hover:text-white">My Bots</a>
            {user?.role === 'admin' && (
              <a href="/bunpanny/admin" className="text-slate-300 hover:text-white">Admin</a>
            )}
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome, {user?.username}!</h1>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400">Your Discord bot hosting dashboard is ready!</p>
          <p className="text-white mt-4">
            <a href="/bunpanny/bots" className="text-purple-400 hover:underline">
              Go to My Bots →
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
