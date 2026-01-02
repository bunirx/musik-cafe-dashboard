import Head from 'next/head';
import Layout from '@/components/Layout';
import UserMenu from '@/components/UserMenu';
import { SOCIAL_LINKS } from '@/config';

export default function Documentation() {
  return (
    <>
      <Head>
        <title>Documentation - Musik Cafe</title>
      </Head>

      <Layout>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 relative pb-12">
            <h1 className="text-5xl font-bold gradient-text">Documentation</h1>
            <p className="text-xl text-gray-400">Complete guide to Musik Cafe</p>
            
            {/* User Menu - Below Title */}
            <div className="flex justify-center pt-4">
              <UserMenu />
            </div>
          </div>

          {/* Getting Started */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-aqua">🚀 Getting Started</h2>
            <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6 space-y-4">
              <p className="text-gray-300">
                Musik Cafe is a feature-rich Discord music bot that supports multiple music sources including YouTube, Spotify, Deezer, and Apple Music.
              </p>
              <ol className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-aqua font-bold min-w-fit">1.</span>
                  <span>Add the bot to your server using the <strong>Add Bot</strong> page</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-aqua font-bold min-w-fit">2.</span>
                  <span>Join a voice channel and use <code className="bg-darker-blue px-2 py-1 rounded">.play song name</code></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-aqua font-bold min-w-fit">3.</span>
                  <span>Use <code className="bg-darker-blue px-2 py-1 rounded">.help</code> to see all commands</span>
                </li>
              </ol>
            </div>
          </section>

          {/* Commands */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-aqua">🎵 Music Commands</h2>
            {[
              {
                cmd: '.play [song name]',
                desc: 'Search and play a song from YouTube, Spotify, Deezer, or other sources',
              },
              {
                cmd: '.pause',
                desc: 'Pause the current playback',
              },
              {
                cmd: '.resume',
                desc: 'Resume paused playback',
              },
              {
                cmd: '.skip',
                desc: 'Skip to the next song in queue',
              },
              {
                cmd: '.stop',
                desc: 'Stop playback and leave the voice channel after 3 minutes',
              },
              {
                cmd: '.queue',
                desc: 'Show all songs in the current queue',
              },
              {
                cmd: '.nowplaying',
                desc: 'Display information about the current song',
              },
              {
                cmd: '.volume [0-100]',
                desc: 'Set the playback volume',
              },
              {
                cmd: '.shuffle',
                desc: 'Shuffle the current queue',
              },
              {
                cmd: '.repeat [off/current/queue]',
                desc: 'Set repeat mode for songs',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
                <code className="text-aqua font-bold text-lg">{item.cmd}</code>
                <p className="text-gray-300 mt-2">{item.desc}</p>
              </div>
            ))}
          </section>

          {/* Admin Commands */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-aqua">⚙️ Admin Commands</h2>
            <div className="bg-gradient-to-br from-accent-blue/10 to-aqua/10 border border-accent-blue/30 rounded-2xl p-6 mb-4">
              <p className="text-gray-300 text-sm">
                These commands can only be used by server administrators or members with admin permissions.
              </p>
            </div>
            {[
              {
                cmd: '.setup',
                desc: 'Open the server configuration panel to manage bot settings',
              },
              {
                cmd: '.setdefaultvolume [0-100]',
                desc: 'Set the default volume for all new songs',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6">
                <code className="text-aqua font-bold text-lg">{item.cmd}</code>
                <p className="text-gray-300 mt-2">{item.desc}</p>
              </div>
            ))}
          </section>

          {/* Features */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-aqua">✨ Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '🎵', title: '12+ Music Sources', desc: 'YouTube, Spotify, Deezer, Apple Music & more' },
                { icon: '🔊', title: 'Volume Control', desc: 'Adjust volume with buttons or commands' },
                { icon: '📋', title: 'Queue Management', desc: 'Full queue control with shuffle & repeat' },
                { icon: '⚙️', title: 'Server Config', desc: 'Customize prefix, DJ roles, and channels' },
                { icon: '👥', title: 'DJ Roles', desc: 'Give DJ permissions to specific roles' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-bold text-aqua mb-2">{feature.title}</h4>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Support */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-aqua">💬 Support & Community</h2>
            <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-8 text-center space-y-6">
              <p className="text-lg text-gray-300">
                Need help or want to join our community? Visit our Discord server and subscribe to our YouTube channel!
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a
                  href={SOCIAL_LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-gradient-to-r from-aqua to-accent-blue text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-aqua/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  Join Discord Server
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-aqua text-aqua font-bold rounded-2xl hover:bg-aqua/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>📺</span>
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="space-y-4 pb-12">
            <h2 className="text-3xl font-bold text-aqua">ℹ️ About Musik Cafe</h2>
            <div className="bg-gradient-to-br from-accent-blue/10 to-aqua/10 border border-accent-blue/30 rounded-2xl p-8 space-y-4">
              <p className="text-gray-300">
                <strong>Musik Cafe v3.0</strong> is a premium Discord music bot created with care and attention to detail. 
                It combines the best features from popular music bots with our own innovations.
              </p>
              <p className="text-gray-300">
                The bot is <strong>completely free</strong> to use with no premium features or paywalls. 
                We believe music should be accessible to everyone!
              </p>
              <p className="text-gray-300">
                Made with ❤️ by <strong>Bunirx</strong>
              </p>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
