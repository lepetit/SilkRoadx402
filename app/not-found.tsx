import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-6xl font-bold text-green-400 mb-4">404</h2>
        <h3 className="text-2xl font-bold text-gray-100 mb-2">Page Not Found</h3>
        <p className="text-gray-400 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

