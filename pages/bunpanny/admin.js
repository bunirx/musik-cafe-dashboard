import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://leonardo-dissipative-soreheadedly.ngrok-free.dev';

export default function BunpannyAdmin() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bunpanel_token');
    if (!token) {
      router.push('/bunpanny/login');
      return;
    }

    const userData = localStorage.getItem('bunpanel_user');
    if (!userData) {
      router.push('/bunpanny/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser?.role !== 'admin') {
      router.push('/bunpanny/dashboard');
      return;
    }

    setUser(parsedUser);
    loadAdminData();
  }, [router]);

  const loadAdminData = async () => {
    try {
      const token = localStorage.getItem('bunpanel_token');
      const [statsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bunpanel_token');
    localStorage.removeItem('bunpanel_user');
    router.push('/bunpanny/login');
  };

  if (!user || loading) return null;

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-lg">BunPanel</h1>
          <div className="flex items-center gap-4">
            <a href="/bunpanny/dashboard" className="text-slate-300 hover:text-white">Dashboard</a>
            <a href="/bunpanny/bots" className="text-slate-300 hover:text-white">Bots</a>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Panel</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Total Users</p>
            <p className="text-4xl font-bold text-white">{stats?.totalUsers || 0}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Total Bots</p>
            <p className="text-4xl font-bold text-white">{stats?.totalBots || 0}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Online Bots</p>
            <p className="text-4xl font-bold text-white">{stats?.onlineBots || 0}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-700 transition">
                    <td className="px-6 py-4 text-slate-300">{u.email}</td>
                    <td className="px-6 py-4 text-slate-300">{u.username}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        u.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-slate-600 text-slate-300'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
