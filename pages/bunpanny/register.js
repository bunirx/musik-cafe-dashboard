import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export default function BunpannyRegister() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(
        'https://leonardo-dissipative-soreheadedly.ngrok-free.dev/api/auth/register',
        { username, email, password }
      );
      localStorage.setItem('bunpanel_token', data.token);
      localStorage.setItem('bunpanel_user', JSON.stringify(data.user));
      router.push('/bunpanny/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-md border border-slate-700">
        <h1 className="text-3xl font-bold text-white mb-6">Join BunPanel</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p className="text-slate-400 mt-6 text-center">
          Already have an account?{' '}
          <a href="/bunpanny/login" className="text-purple-400 hover:text-purple-300">
            Login here
          </a>
        </p>
        {error && <div className="mt-4 bg-red-900 text-red-200 px-4 py-2 rounded">{error}</div>}
      </div>
    </div>
  );
}
