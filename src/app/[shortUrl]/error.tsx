'use client';

export default function Error({ error }: { error: string | null }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Page not found
    </h1>

    <div className="space-y-4">
        <div className="rounded-lg bg-white p-6">
        <div className="text-center space-y-4">
            <p className="text-red-600">{error}</p>
            <a 
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium cursor-pointer"
            >
            Create a new short link
            </a>
        </div>
        </div>
    </div>
    </div>
  );
} 