import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import UserMenu from '@/components/UserMenu';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Musik Cafe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="space-y-8">
          <div className="text-center space-y-2 mb-12 relative pb-12">
            <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
            <p className="text-gray-400">Main hub for bot management and statistics</p>
            
            {/* User Menu - Below Title */}
            <div className="flex justify-center pt-4">
              <UserMenu />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Servers', value: '150+', icon: '🖥️' },
              { label: 'Active Users', value: '5K+', icon: '👥' },
              { label: 'Songs Played', value: '100K+', icon: '🎵' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-8 text-center hover:border-aqua/60 transition-all"
              >
                <div className="text-5xl mb-3">{stat.icon}</div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-aqua">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-aqua mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/servers">
                <div className="p-4 bg-darker-blue/50 hover:bg-darker-blue border border-aqua/30 hover:border-aqua rounded-xl transition-all text-left group cursor-pointer">
                  <div className="text-2xl mb-2">🖥️</div>
                  <h3 className="font-bold text-white group-hover:text-aqua transition-colors">View Servers</h3>
                  <p className="text-sm text-gray-400">Manage your connected servers</p>
                </div>
              </Link>
              <Link href="/documentation">
                <div className="p-4 bg-darker-blue/50 hover:bg-darker-blue border border-aqua/30 hover:border-aqua rounded-xl transition-all text-left group cursor-pointer">
                  <div className="text-2xl mb-2">📖</div>
                  <h3 className="font-bold text-white group-hover:text-aqua transition-colors">Documentation</h3>
                  <p className="text-sm text-gray-400">Learn about all commands</p>
                </div>
              </Link>
              <Link href="/add">
                <div className="p-4 bg-darker-blue/50 hover:bg-darker-blue border border-aqua/30 hover:border-aqua rounded-xl transition-all text-left group cursor-pointer">
                  <div className="text-2xl mb-2">➕</div>
                  <h3 className="font-bold text-white group-hover:text-aqua transition-colors">Add Bot</h3>
                  <p className="text-sm text-gray-400">Invite bot to new server</p>
                </div>
              </Link>
              <a href="https://discord.gg/d8uuYBf7Nh" target="_blank" rel="noopener noreferrer">
                <div className="p-4 bg-darker-blue/50 hover:bg-darker-blue border border-aqua/30 hover:border-aqua rounded-xl transition-all text-left group cursor-pointer">
                  <div className="text-2xl mb-2">💬</div>
                  <h3 className="font-bold text-white group-hover:text-aqua transition-colors">Join Discord</h3>
                  <p className="text-sm text-gray-400">Get support from the community</p>
                </div>
              </a>
            </div>
          </div>

          {/* Bot Status */}
          <div className="bg-gradient-to-br from-accent-blue/10 to-aqua/10 border border-accent-blue/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-accent-blue mb-6">Bot Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-darker-blue/50 rounded-xl">
                <span className="text-gray-300">Bot Status</span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-bold">Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-darker-blue/50 rounded-xl">
                <span className="text-gray-300">Uptime</span>
                <span className="text-aqua font-bold">99.8%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-darker-blue/50 rounded-xl">
                <span className="text-gray-300">API Status</span>
                <span className="text-green-400 font-bold">Operational</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-darker-blue/50 rounded-xl">
                <span className="text-gray-300">Last Updated</span>
                <span className="text-gray-400">Just now</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-aqua mb-6">What Can You Do?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                '🎵 Play music from multiple sources',
                '🔊 Control volume with buttons',
                '📋 Manage queue with ease',
                '⚙️ Customize server settings',
                '🎭 Set up DJ roles',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-darker-blue/50 rounded-xl">
                  <span className="text-xl">{feature.split(' ')[0]}</span>
                  <span className="text-gray-300">{feature.slice(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
