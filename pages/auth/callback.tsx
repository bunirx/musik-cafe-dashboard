import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/Layout';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { code } = router.query;

  useEffect(() => {
    if (!code) return;

    const handleCallback = async () => {
      try {
        setLoading(true);
        
        // Call our backend API to exchange code for token
        const response = await fetch(`/api/auth/discord?code=${code}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(data.error || 'Authentication failed');
          return;
        }

        // Store token and user data
        localStorage.setItem('discord_token', data.token);
        localStorage.setItem('discord_user', JSON.stringify(data.user));
        
        // Redirect to servers page
        setTimeout(() => {
          router.push('/servers');
        }, 500);
      } catch (err: any) {
        console.error('Callback error:', err);
        setError(err.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [code, router]);

  return (
    <>
      <Head>
        <title>Authenticating...</title>
        <link rel="icon" href="/banana.png?v=2" />
      </Head>

      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-6">
            {loading && !error ? (
              <>
                <div className="animate-spin inline-block">
                  <div className="text-6xl">🔄</div>
                </div>
                <h1 className="text-3xl font-bold gradient-text">Authenticating</h1>
                <p className="text-gray-400 text-lg">Verifying your Discord account...</p>
              </>
            ) : error ? (
              <>
                <div className="text-6xl">❌</div>
                <h1 className="text-3xl font-bold text-red-400">Authentication Failed</h1>
                <p className="text-gray-400 text-lg">{error}</p>
                <button
                  onClick={() => router.push('/login')}
                  className="btn-primary px-8 py-3 mt-6"
                >
                  Try Again
                </button>
              </>
            ) : null}
          </div>
        </div>
      </Layout>
    </>
  );
}
