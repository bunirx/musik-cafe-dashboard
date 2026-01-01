import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/Layout';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { code } = router.query;

  useEffect(() => {
    if (!code) return;

    const handleCallback = async () => {
      try {
        // In production, you'd call your backend to exchange code for token
        // For now, we'll store the code and redirect
        localStorage.setItem('discord_code', code as string);
        localStorage.setItem('discord_token', `token_${code}`);
        
        // Redirect to servers page
        router.push('/servers');
      } catch (err: any) {
        setError(err.message || 'Authentication failed');
      }
    };

    handleCallback();
  }, [code, router]);

  return (
    <>
      <Head>
        <title>Authenticating...</title>
      </Head>

      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin">
              <div className="text-6xl">⏳</div>
            </div>
            <h1 className="text-2xl font-bold text-aqua">Authenticating...</h1>
            <p className="text-gray-400">Please wait while we verify your Discord account.</p>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </Layout>
    </>
  );
}
