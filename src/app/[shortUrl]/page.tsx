'use client';

import { useEffect, useState } from 'react';
import Error from './error';

export default function RedirectPage({
  params,
}: {
  params: { shortUrl: string };
}) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        const res = await fetch(`/api/redirect/${params.shortUrl}?check=true`);
        if (res.status === 200) {
          window.location.replace(`/api/redirect/${params.shortUrl}`);
        } else if (res.status === 404) {
          setError("Please check your link.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } catch {
        setError("Something went wrong. Please try again later.");
      }
    };
    checkAndRedirect();
  }, [params.shortUrl]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {error !== null ? (
        <Error error={error} />
      ) : (
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="rounded-lg bg-white p-6">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
              <p className="text-gray-600">Redirecting...</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
