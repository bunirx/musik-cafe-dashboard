import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Musik Cafe - Discord Music Bot Dashboard</title>
        <meta name="description" content="Manage your Musik Cafe bot with our powerful dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-6 py-20">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="gradient-text">Musik Cafe</span>
              <br />
              Dashboard
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Manage your Discord music bot servers with an intuitive, powerful dashboard. 
              Control settings, view statistics, and configure your bot all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
              <Link href="/login">
                <button className="px-8 py-3 bg-gradient-to-r from-aqua to-accent-blue text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-aqua/50 transform hover:scale-105 transition-all duration-300">
                  Login with Discord
                </button>
              </Link>
              <Link href="/add">
                <button className="px-8 py-3 border-2 border-aqua text-aqua font-bold rounded-2xl hover:bg-aqua/10 transition-all duration-300">
                  Add Bot to Server
                </button>
              </Link>
              <Link href="/documentation">
                <button className="px-8 py-3 border-2 border-gray-500 text-gray-300 font-bold rounded-2xl hover:border-aqua hover:text-aqua transition-all duration-300">
                  View Documentation
                </button>
              </Link>
            </div>
          </section>

          {/* Features Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
            {[
              {
                icon: '⚙️',
                title: 'Easy Configuration',
                description: 'Configure your bot settings with an intuitive interface',
              },
              {
                icon: '📊',
                title: 'Server Management',
                description: 'Manage all your servers where you have admin access',
              },
              {
                icon: '🎵',
                title: 'Music Control',
                description: 'Full control over your music playback and queue',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-aqua/10 to-accent-blue/10 border border-aqua/30 rounded-2xl p-6 hover:border-aqua/60 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-aqua mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Home;
