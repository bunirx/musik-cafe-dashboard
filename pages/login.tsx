import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } from '@/config';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('discord_token');
    if (token) {
      router.push('/servers');
    }
  }, [router]);

  const handleDiscordLogin = () => {
    setIsLoading(true);
    const scope = 'identify guilds';
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    window.location.href = discordAuthUrl;
  };

  return (
    <>
      <Head>
        <title>Login - Musik Cafe Dashboard</title>
        <link rel="icon" href="/banana.png?v=2" />
      </Head>

      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center py-12">
          <div className="w-full max-w-md">
            <div className="card space-y-8 border border-aqua/40 shadow-2xl aqua-glow">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="text-7xl animate-bounce">🎵</div>
                <h1 className="text-4xl font-black gradient-text">MUSIK CAFE</h1>
                <p className="text-gray-400">Authorize to manage your servers</p>
              </div>

              {/* Login Button */}
              <button
                onClick={handleDiscordLogin}
                disabled={isLoading}
                className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 00-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.028C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.08.08 0 00.087-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.294.075.075 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 01.079.009c.12.098.246.198.373.295a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.076.076 0 00-.041.107c.36.699.772 1.365 1.225 1.994a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.057c.5-4.761-.838-8.901-3.549-12.576a.06.06 0 00-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.948-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.948 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.948-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.948 2.418-2.157 2.418z" />
                </svg>
                {isLoading ? 'Connecting...' : 'Continue with Discord'}
              </button>

              {/* Info */}
              <div className="text-center text-sm text-gray-400 space-y-3 border-t border-aqua/20 pt-6">
                <div className="flex items-center justify-center gap-2">
                  <span>🔒</span>
                  <p>Secure OAuth2 Authentication</p>
                </div>
                <p>We only access your server list and basic profile info</p>
                <p className="text-xs">You need admin or owner access to manage a server</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>💡 Your data is encrypted and never shared with third parties</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
