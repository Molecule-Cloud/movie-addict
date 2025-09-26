'use client'

'use client';

import { useEffect } from 'react';
import { AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
                <p className="text-gray-400 mb-6">
                    We apologize for the inconvenience. Please try again or return to the homepage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors flex items-center justify-center"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}