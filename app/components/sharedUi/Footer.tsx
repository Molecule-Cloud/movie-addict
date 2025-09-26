'use client';

import Link from 'next/link';
import {
    Film,
    Heart,
    ExternalLink,
    Mail,
    Popcorn
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 border-t border-gray-800 mt-16">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-blue-400 mb-4">
                            <Popcorn className="h-8 w-8" />
                            <span>Movie Addict</span>
                        </Link>
                        <p className="text-gray-400 max-w-md mb-4">
                            Discover, save, and explore your favorite movies. Your personal cinema companion for finding the perfect film.
                        </p>
                        <div className="flex space-x-4">
                            
                            <a
                                href="mailto:hello@cinerec.com"
                                className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors"
                                aria-label="Email"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-1">
                                    <Film className="h-4 w-4" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/trending" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <Link href="/now-playing" className="text-gray-400 hover:text-blue-400 transition-colors">
                                    Now Playing
                                </Link>
                            </li>
                            <li>
                                <Link href="/favorites" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-1">
                                    <Heart className="h-4 w-4" />
                                    <span>Favorites</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://www.themoviedb.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-1"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    <span>TMDB API</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://nextjs.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    Next.js Docs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://tailwindcss.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    Tailwind CSS
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {currentYear} Movie Addict. Made with <Heart className="h-4 w-4 inline fill-red-500 text-red-500" /> for movie lovers.
                    </div>

                    <div className="flex space-x-6 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-blue-400 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/about" className="hover:text-blue-400 transition-colors">
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}