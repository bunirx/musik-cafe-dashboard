import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

interface ServerConfig {
  defaultVolume: number;
  defaultPrefix: string;
  djRoles: string[];
  musicChannels: string[];
  autoLeaveEnabled: boolean;
  autoLeaveTime: number;
}

export default function ServerConfig() {
  const router = useRouter();
  const { serverId } = router.query;
  const [config, setConfig] = useState<ServerConfig>({
    defaultVolume: 80,
    defaultPrefix: '.',
    djRoles: [],
    musicChannels: [],
    autoLeaveEnabled: true,
    autoLeaveTime: 180,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Mock loading config
    const mockConfig: ServerConfig = {
      defaultVolume: 80,
      defaultPrefix: '.',
      djRoles: ['DJ', 'Moderator'],
      musicChannels: ['music', 'songs'],
      autoLeaveEnabled: true,
      autoLeaveTime: 180,
    };
    setConfig(mockConfig);
  }, [serverId]);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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

          {saved && (
            <div className="bg-green-500/20 border border-green-500 rounded-2xl p-4 text-green-300 flex items-center gap-3">
              <span>✅</span>
              <span>Configuration saved successfully!</span>
            </div>
          )}

          {/* Config Sections */}
          <div className="space-y-6">
            {/* Volume Settings */}
            <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-aqua mb-4">🔊 Volume Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Default Volume: {config.defaultVolume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.defaultVolume}
                    onChange={(e) =>
                      setConfig({ ...config, defaultVolume: parseInt(e.target.value) })
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
                  <label className="block text-sm text-gray-300 mb-2">Command Prefix</label>
                  <input
                    type="text"
                    maxLength={5}
                    value={config.defaultPrefix}
                    onChange={(e) =>
                      setConfig({ ...config, defaultPrefix: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-darker-blue border border-aqua/30 rounded-xl text-white focus:border-aqua focus:outline-none transition-colors"
                    placeholder="."
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Users will use this prefix before commands (e.g., {config.defaultPrefix}play song)
                  </p>
                </div>
              </div>
            </div>

            {/* Auto Leave Settings */}
            <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-aqua mb-4">⏱️ Auto Leave Settings</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.autoLeaveEnabled}
                    onChange={(e) =>
                      setConfig({ ...config, autoLeaveEnabled: e.target.checked })
                    }
                    className="w-5 h-5 rounded accent-aqua cursor-pointer"
                  />
                  <span className="text-gray-300">Enable auto leave</span>
                </label>
                {config.autoLeaveEnabled && (
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Auto Leave Delay: {config.autoLeaveTime}s
                    </label>
                    <input
                      type="range"
                      min="60"
                      max="600"
                      step="30"
                      value={config.autoLeaveTime}
                      onChange={(e) =>
                        setConfig({ ...config, autoLeaveTime: parseInt(e.target.value) })
                      }
                      className="w-full h-2 bg-darker-blue rounded-lg appearance-none cursor-pointer accent-aqua"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      Bot will leave after {config.autoLeaveTime} seconds of inactivity
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* DJ Roles */}
            <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-aqua mb-4">🎭 DJ Roles</h2>
              <div className="space-y-3">
                {config.djRoles.length > 0 ? (
                  <div className="space-y-2">
                    {config.djRoles.map((role) => (
                      <div
                        key={role}
                        className="flex items-center justify-between bg-darker-blue/50 px-4 py-2 rounded-xl"
                      >
                        <span className="text-gray-300">{role}</span>
                        <button
                          onClick={() =>
                            setConfig({
                              ...config,
                              djRoles: config.djRoles.filter((r) => r !== role),
                            })
                          }
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No DJ roles configured yet</p>
                )}
              </div>
            </div>

            {/* Music Channels */}
            <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-aqua mb-4">📝 Music Channels</h2>
              <div className="space-y-3">
                {config.musicChannels.length > 0 ? (
                  <div className="space-y-2">
                    {config.musicChannels.map((channel) => (
                      <div
                        key={channel}
                        className="flex items-center justify-between bg-darker-blue/50 px-4 py-2 rounded-xl"
                      >
                        <span className="text-gray-300">#{channel}</span>
                        <button
                          onClick={() =>
                            setConfig({
                              ...config,
                              musicChannels: config.musicChannels.filter((c) => c !== channel),
                            })
                          }
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Bot can use all channels</p>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-4 bg-gradient-to-r from-aqua to-accent-blue text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-aqua/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </Layout>
    </>
  );
}
