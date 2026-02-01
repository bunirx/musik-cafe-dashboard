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
  const [filteredServers, setFilteredServers] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
        setFilteredServers(sortedServers);
      } catch (err) {
        console.error('Error parsing user data:', err);
        setError('Failed to load user data');
      }
    }

    setLoading(false);
  }, [router]);

  // Handle search with priority ranking (by name and ID)
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredServers(servers);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // Separate servers into categories
    const exactIdMatch: Guild[] = [];
    const startsWith: Guild[] = [];
    const contains: Guild[] = [];

    servers.forEach((server) => {
      const lowerName = server.name.toLowerCase();
      const serverId = server.id;
      
      // Check if ID matches exactly
      if (serverId === query) {
        exactIdMatch.push(server);
      }
      // Check if name starts with query
      else if (lowerName.startsWith(lowerQuery)) {
        startsWith.push(server);
      }
      // Check if name contains query or ID contains query
      else if (lowerName.includes(lowerQuery) || serverId.includes(query)) {
        contains.push(server);
      }
    });

    // Combine: exact ID match first, then names starting with query, then others
    setFilteredServers([...exactIdMatch, ...startsWith, ...contains]);
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Servers...</title>
          <link rel="icon" href="/banana.png?v=2" />
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
        <link rel="icon" href="/banana.png?v=2" />
      </Head>

      <Layout>
        <div className="space-y-8">
          <div className="text-center space-y-4 mb-12 relative pb-12">
            <h1 className="text-4xl font-bold gradient-text">Your Servers</h1>
            <p className="text-gray-400 text-lg">
              Welcome, <span className="text-aqua font-bold">{userName}</span>
            </p>
            <p className="text-gray-400">Select a server to configure your bot</p>
          </div>

          {/* Search Box */}
          {servers.length > 0 && (
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search servers by name or ID..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-6 py-3 bg-darker-blue/50 border border-aqua/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-aqua focus:bg-darker-blue/70 transition-all"
              />
            </div>
          )}

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
          ) : filteredServers.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <div className="text-6xl">🔍</div>
              <p className="text-xl text-gray-400">
                No servers found with this name.
              </p>
              <p className="text-gray-500">
                Try searching with different keywords.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-gray-400 text-sm">
                Found <span className="text-aqua font-bold">{filteredServers.length}</span> server{filteredServers.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServers.map((server) => {
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
