import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

interface ServerConfig {
  defaultVolume: number;
  defaultPrefix: string;
  djRoles: string[];
  musicChannels: string[];
  voiceChannels: string[];
}

interface ServerData {
  channels: Array<{ id: string; name: string; type: 'text' | 'voice' }>;
  roles: Array<{ id: string; name: string }>;
}

export default function ServerConfig() {
  const router = useRouter();
  const { serverId } = router.query;
  const [config, setConfig] = useState<ServerConfig>({
    defaultVolume: 100,
    defaultPrefix: '.',
    djRoles: [],
    musicChannels: [],
    voiceChannels: [],
  });
  const [serverData, setServerData] = useState<ServerData>({ channels: [], roles: [] });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedFading, setSavedFading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => {
        setSavedFading(true);
      }, 3000);
      const fadeTimer = setTimeout(() => {
        setSaved(false);
        setSavedFading(false);
      }, 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(fadeTimer);
      };
    }
  }, [saved]);

  // Modal states
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [channelModalType, setChannelModalType] = useState<'text' | 'voice'>('text');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set());
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!serverId) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError('');

        // Load config from bot
        const configRes = await fetch(`/api/config/${serverId}`);
        const configData = await configRes.json();
        
        // Support both wrapped and unwrapped responses
        const configObj = configData.config || configData;
        
        if (configObj) {
          // Convert volume from percentage (0-100) to decimal (0-1) if needed
          let volume = configObj.default_volume || configObj.defaultVolume || 0.6;
          // If volume is greater than 1, it's stored as percentage, convert to decimal
          if (volume > 1) {
            volume = volume / 100;
          }
          
          const djRoles = configObj.dj_roles || configObj.djRoles || [];
          const musicChannels = configObj.music_channels || configObj.musicChannels || [];
          const voiceChannels = configObj.voice_channels || configObj.voiceChannels || [];
          
          setConfig({
            defaultVolume: volume,
            defaultPrefix: configObj.default_prefix || configObj.defaultPrefix || '.',
            djRoles: Array.isArray(djRoles) ? djRoles : [],
            musicChannels: Array.isArray(musicChannels) ? musicChannels : [],
            voiceChannels: Array.isArray(voiceChannels) ? voiceChannels : [],
          });
        }

        // Load server channels and roles - MUST happen before setLoading(false)
        try {
          const serverRes = await fetch(`/api/server/${serverId}`);
          if (serverRes.ok) {
            const data = await serverRes.json();
            setServerData({
              channels: data.channels || [],
              roles: data.roles || [],
            });
          }
        } catch (serverErr) {
          console.error('Failed to load server data:', serverErr);
        }
      } catch (err) {
        console.error('Failed to load data:', err);
        // Only show error if we couldn't load the config
        // Default config is still available for saving
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [serverId]);

  const handleSave = async () => {
    if (!serverId) return;

    try {
      setSaving(true);
      setError('');

      // Validate prefix
      if (!config.defaultPrefix || config.defaultPrefix.length > 5) {
        setError('Prefix must be 1-5 characters');
        setSaving(false);
        return;
      }

      const response = await fetch(`/api/config/${serverId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          defaultVolume: config.defaultVolume,
          defaultPrefix: config.defaultPrefix,
          djRoles: config.djRoles,
          musicChannels: config.musicChannels,
          voiceChannels: config.voiceChannels,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError('Failed to save configuration. Please try again.');
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleChannelSelect = (channelId: string) => {
    const newSelected = new Set(selectedChannels);
    if (newSelected.has(channelId)) {
      newSelected.delete(channelId);
    } else {
      newSelected.add(channelId);
    }
    setSelectedChannels(newSelected);
  };

  const handleConfirmChannels = () => {
    const newChannels = Array.from(selectedChannels);
    
    if (channelModalType === 'text') {
      // Only update text channels, keep existing voice channels
      setConfig({
        ...config,
        musicChannels: newChannels,
      });
    } else {
      // Only update voice channels, keep existing text channels
      setConfig({
        ...config,
        voiceChannels: newChannels,
      });
    }
    
    setShowChannelModal(false);
    setSelectedChannels(new Set());
  };

  const handleRoleSelect = (roleId: string) => {
    const newSelected = new Set(selectedRoles);
    if (newSelected.has(roleId)) {
      newSelected.delete(roleId);
    } else {
      newSelected.add(roleId);
    }
    setSelectedRoles(newSelected);
  };

  const handleConfirmRoles = () => {
    const roles = serverData.roles
      .filter(r => selectedRoles.has(r.id))
      .map(r => r.id);

    setConfig({
      ...config,
      djRoles: roles,
    });
    setShowRoleModal(false);
    setSelectedRoles(new Set());
  };

  const handleCreateRole = async () => {
    if (!newRoleName.trim()) {
      setError('Role name cannot be empty');
      return;
    }

    try {
      setError('');
      // Call bot API to create role
      const response = await fetch(`/api/create-role/${serverId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newRoleName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.role) {
          // Add the new role to server data
          setServerData({
            ...serverData,
            roles: [...serverData.roles, data.role],
          });
          // Automatically add the new role to DJ roles (don't save yet - user will click save)
          setConfig({
            ...config,
            djRoles: [...config.djRoles, data.role.id],
          });
        }
        setNewRoleName('');
        setShowCreateRole(false);
      } else {
        setError('Failed to create role');
      }
    } catch (err) {
      setError('Failed to create role');
      console.error('Create role error:', err);
    }
  };

  return (
    <>
      <Head>
        <title>Server Configuration - Musik Cafe</title>
      </Head>

      <Layout>
        <div className="space-y-8 max-w-2xl">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-4xl font-bold gradient-text">Server Configuration</h1>
            <p className="text-gray-400">Server ID: {serverId}</p>
          </div>

          {loading && (
            <div className="bg-blue-500/20 border border-blue-500 rounded-2xl p-4 text-blue-300 flex items-center gap-3">
              <span>⏳</span>
              <span>Loading configuration...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-2xl p-4 text-red-300 flex items-center gap-3">
              <span>❌</span>
              <span>{error}</span>
            </div>
          )}

          {!loading && (
            <div className="space-y-6">
              {/* Volume Settings */}
              <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-aqua mb-4">🔊 Volume Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Default Volume: {Math.round(config.defaultVolume * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={config.defaultVolume}
                      onChange={(e) =>
                        setConfig({ ...config, defaultVolume: parseFloat(e.target.value) })
                      }
                      className="w-full h-2 bg-darker-blue rounded-lg appearance-none cursor-pointer accent-aqua"
                    />
                  </div>
                </div>
              </div>

              {/* Prefix Settings */}
              <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-aqua mb-4">🔤 Prefix Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Command Prefix (Max 5 characters)</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={config.defaultPrefix}
                      onChange={(e) => {
                        const value = e.target.value.slice(0, 5);
                        setConfig({ ...config, defaultPrefix: value });
                      }}
                      className="w-full px-4 py-3 bg-darker-blue border border-aqua/30 rounded-xl text-white focus:border-aqua focus:outline-none transition-colors"
                      placeholder="."
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      Users will use this prefix before commands (e.g., {config.defaultPrefix}play song)
                    </p>
                  </div>
                </div>
              </div>

              {/* DJ Roles */}
              <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-aqua mb-4">🎭 DJ Roles</h2>
                <div className="space-y-3">
                  {config.djRoles && config.djRoles.length > 0 ? (
                    <div className="space-y-2">
                      {config.djRoles.map((roleId) => {
                        const role = serverData.roles.find(r => r.id === roleId);
                        return (
                          <div
                            key={roleId}
                            className="flex items-center justify-between bg-darker-blue/50 px-4 py-2 rounded-xl"
                          >
                            <span className="text-gray-300">{role?.name || roleId}</span>
                            <button
                              onClick={() =>
                                setConfig({
                                  ...config,
                                  djRoles: config.djRoles.filter((r) => r !== roleId),
                                })
                              }
                              className="text-red-500 hover:text-red-400 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No DJ roles configured yet</p>
                  )}
                  <button
                    onClick={() => {
                      setSelectedRoles(new Set(config.djRoles));
                      setShowRoleModal(true);
                    }}
                    className="w-full mt-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-xl hover:bg-accent-blue/30 transition-colors"
                  >
                    + Select Roles
                  </button>
                </div>
              </div>

              {/* Music Channels */}
              <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-aqua mb-4">📝 Text Channels</h2>
                <div className="space-y-3">
                  {config.musicChannels.length > 0 ? (
                    <div className="space-y-2">
                      {config.musicChannels.map((channelId) => {
                        const channel = serverData.channels.find(c => c.id === channelId);
                        return (
                          <div
                            key={channelId}
                            className="flex items-center justify-between bg-darker-blue/50 px-4 py-2 rounded-xl"
                          >
                            <span className="text-gray-300">#{channel?.name || channelId}</span>
                            <button
                              onClick={() =>
                                setConfig({
                                  ...config,
                                  musicChannels: config.musicChannels.filter((c) => c !== channelId),
                                })
                              }
                              className="text-red-500 hover:text-red-400 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Bot can use all channels</p>
                  )}
                  <button
                    onClick={() => {
                      setChannelModalType('text');
                      setSelectedChannels(new Set(config.musicChannels));
                      setShowChannelModal(true);
                    }}
                    className="w-full mt-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-xl hover:bg-accent-blue/30 transition-colors"
                  >
                    + Select Channels
                  </button>
                </div>
              </div>

              {/* Voice Channels */}
              <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-aqua mb-4">🎙️ Voice Channels</h2>
                <div className="space-y-3">
                  {config.voiceChannels.length > 0 ? (
                    <div className="space-y-2">
                      {config.voiceChannels.map((channelId) => {
                        const channel = serverData.channels.find(c => c.id === channelId);
                        return (
                          <div
                            key={channelId}
                            className="flex items-center justify-between bg-darker-blue/50 px-4 py-2 rounded-xl"
                          >
                            <span className="text-gray-300">{channel?.name || channelId}</span>
                            <button
                              onClick={() =>
                                setConfig({
                                  ...config,
                                  voiceChannels: config.voiceChannels.filter((c) => c !== channelId),
                                })
                              }
                              className="text-red-500 hover:text-red-400 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No voice channels restricted (all can be used)</p>
                  )}
                  <button
                    onClick={() => {
                      setChannelModalType('voice');
                      setSelectedChannels(new Set(config.voiceChannels));
                      setShowChannelModal(true);
                    }}
                    className="w-full mt-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-xl hover:bg-accent-blue/30 transition-colors"
                  >
                    + Select Voice Channels
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="w-full py-4 bg-gradient-to-r from-aqua to-accent-blue text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-aqua/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>

          {saved && (
            <div className={`bg-green-500/20 border border-green-500 rounded-2xl p-4 text-green-300 flex items-center gap-3 transition-opacity duration-1000 ${
              savedFading ? 'opacity-0' : 'opacity-100'
            }`}>
              <span>✅</span>
              <span>Configuration saved successfully! Changes will take effect on the bot shortly.</span>
            </div>
          )}

          {/* Channel Selection Modal */}
          {showChannelModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-darker-blue border border-aqua/30 rounded-2xl p-6 max-w-md w-full max-h-96 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-aqua">
                    Select {channelModalType === 'text' ? 'Text' : 'Voice'} Channels
                  </h3>
                  <button
                    onClick={() => {
                      setShowChannelModal(false);
                      setSearchQuery('');
                    }}
                    className="text-gray-400 hover:text-aqua text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <input
                  type="text"
                  placeholder="Search channels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4 px-3 py-2 bg-darker-blue border border-aqua/30 rounded-lg text-white focus:border-aqua focus:outline-none"
                />

                <div className="overflow-y-auto flex-1">
                  {serverData.channels.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-2">No channels found</p>
                      <p className="text-xs text-gray-500">Make sure the bot API is running and properly connected</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {serverData.channels
                        .filter(c => c.type === channelModalType && c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((channel) => (
                          <label key={channel.id} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-darker-blue/50 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedChannels.has(channel.id)}
                              onChange={() => handleChannelSelect(channel.id)}
                              className="w-4 h-4 rounded accent-aqua"
                            />
                            <span className="text-gray-300">
                              {channelModalType === 'text' ? '#' : '🎙️'} {channel.name}
                            </span>
                          </label>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowChannelModal(false);
                      setSearchQuery('');
                    }}
                    className="flex-1 py-2 bg-darker-blue border border-gray-600 text-gray-300 rounded-xl hover:border-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmChannels}
                    className="flex-1 py-2 bg-gradient-to-r from-aqua to-accent-blue text-white rounded-xl hover:shadow-lg hover:shadow-aqua/50 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Role Selection Modal */}
          {showRoleModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-darker-blue border border-aqua/30 rounded-2xl p-6 max-w-md w-full max-h-96 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-aqua">Select DJ Roles</h3>
                  <button
                    onClick={() => {
                      setShowRoleModal(false);
                      setSearchQuery('');
                    }}
                    className="text-gray-400 hover:text-aqua text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4 px-3 py-2 bg-darker-blue border border-aqua/30 rounded-lg text-white focus:border-aqua focus:outline-none"
                />

                <div className="overflow-y-auto flex-1">
                  {serverData.roles.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-2">No roles found</p>
                      <p className="text-xs text-gray-500">Make sure the bot API is running and properly connected</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {serverData.roles
                        .filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((role) => (
                          <label key={role.id} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-darker-blue/50 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedRoles.has(role.id)}
                              onChange={() => handleRoleSelect(role.id)}
                              className="w-4 h-4 rounded accent-aqua"
                            />
                            <span className="text-gray-300">@{role.name}</span>
                          </label>
                        ))}
                    </div>
                  )}
                </div>

                {!showCreateRole && (
                  <button
                    onClick={() => setShowCreateRole(true)}
                    className="w-full mt-4 py-2 bg-accent-blue/20 border border-accent-blue text-accent-blue rounded-xl hover:bg-accent-blue/30 transition-colors"
                  >
                    + Create New DJ Role
                  </button>
                )}
                {showCreateRole && (
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Role name"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      maxLength={32}
                      className="w-full px-3 py-2 bg-darker-blue border border-aqua/30 rounded-lg text-white focus:border-aqua focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setShowCreateRole(false);
                          setNewRoleName('');
                        }}
                        className="flex-1 py-2 bg-darker-blue border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateRole}
                        className="flex-1 py-2 bg-gradient-to-r from-aqua to-accent-blue text-white rounded-lg hover:shadow-lg hover:shadow-aqua/50 transition-all"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowRoleModal(false);
                      setSearchQuery('');
                    }}
                    className="flex-1 py-2 bg-darker-blue border border-gray-600 text-gray-300 rounded-xl hover:border-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRoles}
                    className="flex-1 py-2 bg-gradient-to-r from-aqua to-accent-blue text-white rounded-xl hover:shadow-lg hover:shadow-aqua/50 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
