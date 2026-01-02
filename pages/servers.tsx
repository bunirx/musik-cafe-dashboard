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

interface User {
  username: string;
  avatar: string | null;
  id: string;
  guilds: Guild[];
}

export default function Servers() {
  const router = useRouter();
  const [servers, setServers] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('discord_token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Get actual user data from localStorage
    const userData = localStorage.getItem('discord_user');
    if (userData) {
      try {
        const user: User = JSON.parse(userData);
        setUserName(user.username || 'User');
        setUserId(user.id);
        if (user.avatar) {
          setUserAvatar(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`);
        }
        const sortedServers = (user.guilds || []).sort((a: Guild, b: Guild) => {
          // Custom sort: numbers first, then alphabets
          const aFirstChar = a.name[0] || '';
          const bFirstChar = b.name[0] || '';
          const aIsNumber = /\d/.test(aFirstChar);
          const bIsNumber = /\d/.test(bFirstChar);
          
          // If one starts with number and other with letter, number comes first
          if (aIsNumber && !bIsNumber) return -1;
          if (!aIsNumber && bIsNumber) return 1;
          
          // Both same type, use alphabetical order
          return a.name.localeCompare(b.name);
        });
        setServers(sortedServers);
      } catch (err) {
        console.error('Error parsing user data:', err);
        setError('Failed to load user data');
      }
    }

    setLoading(false);

    // Close menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-avatar-menu]')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [router]);

  const handleLogout = async () => {
    // Clear all auth data
    localStorage.removeItem('discord_token');
    localStorage.removeItem('discord_user');
    localStorage.removeItem('discord_refresh_token');
    
    // Clear session storage as well
    sessionStorage.clear();
    
    // Redirect to login - user will see login page as if first time
    router.push('/login');
  };

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
        {/* Avatar Menu - Top Right */}
        <div className="fixed top-6 right-6 z-50" data-avatar-menu>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-aqua to-accent-blue flex items-center justify-center text-white font-bold hover:shadow-lg hover:shadow-aqua/50 transition-all hover:scale-110"
            title={userName}
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full rounded-full object-cover border-2 border-aqua"
              />
            ) : (
              <span>{userName.charAt(0).toUpperCase()}</span>
            )}
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute top-16 right-0 mt-2 w-48 bg-gray-900 border border-red-500/50 rounded-xl shadow-2xl shadow-red-500/20 overflow-hidden animate-fadeIn">
              <button
                onClick={() => {
                  handleLogout();
                  setShowMenu(false);
                }}
                className="w-full px-4 py-3 text-red-400 hover:bg-red-500/20 flex items-center gap-3 font-bold transition-colors text-left"
              >
                <span className="text-lg">🚪</span>
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold gradient-text">Your Servers</h1>
            <p className="text-gray-400 text-lg">
              Welcome, <span className="text-aqua font-bold">{userName}</span>
            </p>
            <p className="text-gray-400">Select a server to configure your bot</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-2xl p-4 text-red-300">
              {error}
            </div>
          )}

          {servers.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <div className="text-6xl">🚫</div>
              <p className="text-xl text-gray-400">
                No servers found where you have admin access.
              </p>
              <p className="text-gray-500">
                You need to be an admin or owner of a server to manage it.
              </p>
              <Link href="/add">
                <button className="btn-primary px-8 py-3 text-lg">
                  ➕ Add Bot to a Server
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-gray-400 text-sm">
                Found <span className="text-aqua font-bold">{servers.length}</span> server{servers.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servers.map((server) => {
                  // Generate a default icon if none exists
                  const initials = server.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <Link key={server.id} href={`/${server.id}/config`}>
                      <div className="card group cursor-pointer border-aqua/40 hover:aqua-glow">
                        <div className="flex items-start justify-between mb-6">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-aqua to-accent-blue flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                            {server.icon ? (
                              <img
                                src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                                alt={server.name}
                                className="w-full h-full rounded-xl object-cover"
                              />
                            ) : (
                              initials
                            )}
                          </div>
                          {server.owner && (
                            <span className="px-3 py-1 bg-gradient-to-r from-aqua to-accent-blue text-white rounded-full text-xs font-bold">
                              OWNER
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-aqua transition-colors line-clamp-2">
                          {server.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-6 font-mono">
                          ID: {server.id}
                        </p>
                        <button className="w-full py-3 bg-gradient-to-r from-aqua/20 to-accent-blue/20 border border-aqua/50 text-aqua font-bold rounded-xl group-hover:from-aqua group-hover:to-accent-blue group-hover:text-white group-hover:border-aqua transition-all duration-300">
                          ⚙️ Configure
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {servers.length > 0 && (
            <div className="card border-accent-blue/40 mt-12">
              <h3 className="text-lg font-bold text-accent-blue mb-4">💡 Tip</h3>
              <p className="text-gray-400">
                Click on any server to configure the bot settings including volume, prefix, DJ roles, and music channels.
              </p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
