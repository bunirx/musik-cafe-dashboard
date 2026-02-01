import Head from 'next/head';
import Layout from '@/components/Layout';

export default function Add() {
  const botInviteUrl = `https://discord.com/oauth2/authorize?client_id=1455917162270294091&scope=bot%20applications.commands&permissions=4539334060756224`;

  return (
    <>
      <Head>
        <title>Add Bot - Musik Cafe</title>
        <link rel="icon" href="/banana.png?v=2" />
      </Head>

      <Layout>
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2 mb-12 relative pb-12">
            <h1 className="text-4xl font-bold gradient-text">Add Musik Cafe Bot</h1>
            <p className="text-gray-400">Invite the bot to your Discord server</p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Click the button below',
                description: 'This will open Discord authorization page',
                icon: '🔗',
              },
              {
                step: 2,
                title: 'Select your server',
                description: 'Choose which Discord server you want to add the bot to',
                icon: '🖱️',
              },
              {
                step: 3,
                title: 'Grant permissions',
                description: 'Confirm the required permissions for the bot to function',
                icon: '✅',
              },
              {
                step: 4,
                title: 'Start using!',
                description: 'Go to your server and use .help to see all commands',
                icon: '🎵',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 bg-gradient-to-r from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6 hover:border-aqua/60 transition-all"
              >
                <div className="text-4xl flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-aqua mb-1">
                    Step {item.step}: {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Invite Button */}
          <div className="flex justify-center pt-8">
            <a
              href={botInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="px-12 py-4 bg-gradient-to-r from-aqua to-accent-blue text-white font-bold rounded-2xl text-lg hover:shadow-lg hover:shadow-aqua/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                <span>🚀</span>
                Add Bot to Server
              </button>
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12 border-t border-aqua/20">
            {[
              { icon: '🎵', title: 'Music Playback', desc: 'Play from YouTube, Spotify & more' },
              { icon: '🔊', title: 'Volume Control', desc: 'Adjust volume with commands' },
              { icon: '📋', title: 'Queue Manager', desc: 'Manage your music queue' },
              { icon: '⚙️', title: 'Customization', desc: 'Full server configuration' },
            ].map((feature, i) => (
              <div key={i} className="p-4 rounded-xl bg-darker-blue/50 border border-aqua/20">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Permissions Info */}
          <div className="bg-gradient-to-br from-accent-blue/10 to-aqua/10 border border-accent-blue/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-accent-blue mb-3">📋 Required Permissions</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Send Messages</li>
              <li>✓ Embed Links</li>
              <li>✓ Read Message History</li>
              <li>✓ Use External Emojis</li>
              <li>✓ Bypass Slowmode</li>
              <li>✓ View Channels</li>
              <li>✓ Connect</li>
              <li>✓ Speak</li>
              <li>✓ Use Voice Activity</li>
              <li>✓ Priority Speaker</li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
