import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Musik Cafe Site</title>
        <meta name="description" content="Manage your Discord music bot servers with a powerful, intuitive dashboard. Control settings, view statistics, and configure everything in one beautiful interface." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Musik Cafe Site" />
        <meta property="og:description" content="Manage your Discord music bot servers with a powerful, intuitive dashboard. Control settings, view statistics, and configure everything in one beautiful interface." />
        <meta property="og:image" content="/banana.png" />
        <meta property="og:type" content="website" />
        <meta property="theme-color" content="#00FFFF" />
        <link rel="icon" href="/banana.png?v=2" />
        <link rel="shortcut icon" href="/banana.png?v=2" />
      </Head>

      <Layout>
        <div className="space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-8 py-32">
            <div className="inline-block">
              <h1 className="text-6xl md:text-8xl font-black mb-4">
                <span className="gradient-text">MUSIK CAFE</span>
              </h1>
              <p className="text-2xl md:text-4xl text-white font-bold">
                The Ultimate <span className="gradient-text">Music Bot</span> Dashboard
              </p>
            </div>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Manage your Discord music bot servers with a powerful, intuitive dashboard. 
              Control settings, view statistics, and configure everything in one beautiful interface.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12">
              <Link href="/login">
                <button className="btn-primary px-10 py-4 text-lg w-full sm:w-auto">
                  🔑 Login with Discord
                </button>
              </Link>
              <Link href="/add">
                <button className="btn-secondary px-10 py-4 text-lg w-full sm:w-auto">
                  ➕ Add Bot to Server
                </button>
              </Link>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16">
            <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '⚙️',
                  title: 'Easy Configuration',
                  description: 'Configure your bot settings with an intuitive, modern interface. Set prefixes, volumes, DJ roles, and more.',
                  color: '#00d4ff',
                },
                {
                  icon: '📊',
                  title: 'Server Management',
                  description: 'Manage all your Discord servers where you have admin or owner access. Control multiple servers easily.',
                  color: '#00a8cc',
                },
                {
                  icon: '🎵',
                  title: 'Music Control',
                  description: 'Full control over music playback, queue management, volume adjustment, and more advanced features.',
                  color: '#0099cc',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="card group hover:aqua-glow"
                >
                  <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 gradient-text">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16">
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '150+', label: 'Servers' },
                { value: '5K+', label: 'Active Users' },
                { value: '99.8%', label: 'Uptime' },
              ].map((stat, i) => (
                <div key={i} className="card text-center">
                  <div className="text-4xl font-black gradient-text mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16">
            <div className="card text-center space-y-6">
              <h2 className="text-3xl font-bold">
                Ready to get started?
              </h2>
              <p className="text-gray-400">
                Join thousands of servers already using Musik Cafe
              </p>
              <Link href="/login">
                <button className="btn-primary px-12 py-4 text-lg mx-auto">
                  Get Started Now →
                </button>
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Home;
