'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-gray-100">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong!</h2>
            <p className="text-gray-400 mb-6">{error.message}</p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-all"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

