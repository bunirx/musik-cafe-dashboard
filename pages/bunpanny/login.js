import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export default function BunpannyLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(
        'https://leonardo-dissipative-soreheadedly.ngrok-free.dev/api/auth/login',
        { email, password }
      );
      localStorage.setItem('bunpanel_token', data.token);
      localStorage.setItem('bunpanel_user', JSON.stringify(data.user));
      router.push('/bunpanny/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-md border border-slate-700">
        <h1 className="text-3xl font-bold text-white mb-6">BunPanel Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white outline-none focus:border-purple-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white outline-none focus:border-purple-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-slate-400 mt-6 text-center">
          No account?{' '}
          <a href="/bunpanny/register" className="text-purple-400 hover:text-purple-300">
            Register here
          </a>
        </p>
        {error && <div className="mt-4 bg-red-900 text-red-200 px-4 py-2 rounded">{error}</div>}
      </div>
    </div>
  );
}
