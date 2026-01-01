import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: number;
}

export default function Servers() {
  const router = useRouter();
  const [servers, setServers] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('discord_token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Mock data - in production, fetch from your backend
    const mockServers: Guild[] = [
      {
        id: '123456789',
        name: 'Chill Vibes Server',
        icon: '🎵',
        owner: true,
        permissions: 8,
      },
      {
        id: '987654321',
        name: 'Gaming Hub',
        icon: '🎮',
        owner: false,
        permissions: 8,
      },
    ];

    setTimeout(() => {
      setServers(mockServers);
      setLoading(false);
    }, 500);
  }, [router]);

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Servers...</title>
        </Head>
        <Layout>
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin text-6xl">⏳</div>
              <p className="text-aqua font-bold">Loading your servers...</p>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Your Servers - Musik Cafe</title>
      </Head>

      <Layout>
        <div className="space-y-8">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-4xl font-bold gradient-text">Your Servers</h1>
            <p className="text-gray-400">Select a server to configure your bot</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-2xl p-4 text-red-300">
              {error}
            </div>
          )}

          {servers.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-xl text-gray-400">
                No servers found where you have admin access.
              </p>
              <Link href="/add">
                <button className="px-6 py-3 bg-gradient-to-r from-aqua to-accent-blue text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-aqua/50">
                  Add Bot to a Server
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servers.map((server) => (
                <Link key={server.id} href={`/${server.id}/config`}>
                  <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6 cursor-pointer hover:border-aqua/60 hover:shadow-lg hover:shadow-aqua/20 transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform">
                        {server.icon}
                      </div>
                      {server.owner && (
                        <span className="px-3 py-1 bg-aqua/20 text-aqua rounded-full text-xs font-bold">
                          OWNER
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-aqua transition-colors">
                      {server.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Server ID: {server.id}
                    </p>
                    <button className="w-full py-2 bg-gradient-to-r from-aqua/20 to-accent-blue/20 border border-aqua/50 text-aqua font-bold rounded-xl group-hover:from-aqua group-hover:to-accent-blue group-hover:text-white transition-all duration-300">
                      Configure
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
