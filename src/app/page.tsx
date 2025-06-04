'use client';

import { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { isValidUrl } from '@/lib/urlValidator';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<{ shortUrl: string; originalUrl: string; message?: string } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [clipboardError, setClipboardError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidInput, setIsValidInput] = useState(true);

  useEffect(() => {
    if (url.trim()) {
      setIsValidInput(isValidUrl(url.trim()));
    } else {
      setIsValidInput(true); // Reset validation when input is empty
    }
  }, [url]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit');
    e.preventDefault();
    
    const trimmedUrl = url.trim();
    if (!isValidUrl(trimmedUrl)) {
      setFormError('Please enter a valid URL');
      return;
    }

    setFormError(null);
    setClipboardError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmedUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || 'Something went wrong');
        return;
      }

      setResult(data);
      setUrl('');
    } catch (err) {
      setFormError('Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (result?.shortUrl) {
      try {
        await navigator.clipboard.writeText(result.shortUrl);
        setIsCopied(true);
        setClipboardError(null);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        setClipboardError('Failed to copy to clipboard');
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Shorten a long link
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your link here"
              className={`w-full rounded-lg border shadow-sm focus:ring-blue-500 h-12 px-4 ${
                !isValidInput && url.trim() 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
              disabled={isLoading}
            />
            {!isValidInput && url.trim() && (
              <p className="text-red-600 text-sm">Not a valid link</p>
            )}
            <button
              type="submit"
              disabled={isLoading || !url.trim() || !isValidInput}
              className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
            >
              {isLoading ? 'Generating...' : 'Generate link'}
            </button>
          </div>

          {formError && (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
              {formError}
            </div>
          )}

          {clipboardError && (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
              {clipboardError}
            </div>
          )}

          {(result && !formError && !clipboardError) && (
            <div className="rounded-lg bg-white p-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-gray-500">Short link</p>
                  <p className="text-lg font-medium text-gray-900">{result.shortUrl}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors cursor-pointer"
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  ) : (
                    <ClipboardIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
