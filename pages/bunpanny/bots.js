import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://leonardo-dissipative-soreheadedly.ngrok-free.dev';

export default function BunpannyBots() {
  const router = useRouter();
  const [bots, setBots] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [botName, setBotName] = useState('');
  const [botToken, setBotToken] = useState('');
  const [loading, setLoading] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('bunpanel_token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/bunpanny/login');
      return;
    }

    const userData = localStorage.getItem('bunpanel_user');
    setUser(JSON.parse(userData));
    loadBots();
  }, [router, token]);

  const loadBots = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/bots`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBots(data);
    } catch (err) {
      console.error('Failed to load bots:', err);
    }
  };

  const createBot = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${API_URL}/api/bots`,
        { name: botName, token: botToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBotName('');
      setBotToken('');
      setShowModal(false);
      await loadBots();
    } catch (err) {
      console.error('Failed to create bot:', err);
    } finally {
      setLoading(false);
    }
  };

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
            <a href="/bunpanny/dashboard" className="text-slate-300 hover:text-white">Dashboard</a>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">My Bots</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-medium"
          >
            + New Bot
          </button>
        </div>

        {bots.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
            <p className="text-slate-400">No bots yet. Create your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bots.map((bot) => (
              <div key={bot.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white">{bot.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-2 h-2 rounded-full ${bot.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-slate-400">{bot.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-8 w-full max-w-md border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">Create New Bot</h2>
              <form onSubmit={createBot} className="space-y-4">
                <input
                  type="text"
                  placeholder="Bot Name"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
                  required
                />
                <input
                  type="password"
                  placeholder="Discord Token"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
