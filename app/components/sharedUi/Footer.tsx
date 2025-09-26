'use client';

import Link from 'next/link';
import Image from'next/image' 
import { Film, ExternalLink, Mail, Heart } from 'lucide-react';



const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 border-t border-gray-800 mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center font-bold mb-4">
                            <Image src="/assets/logo.png" width={100} height={100} alt="Logo"></Image>
                        </Link>
                        <p className="text-gray-400 max-w-md mb-4">
                            Discover, save, and explore your favorite movies. Your personal cinema companion for finding the perfect film.
                        </p>
                        <div className="flex space-x-4">
                            
                            <a
                                href="movie-addict@gmail.co"
                                className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                                aria-label="Email"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-1">
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
                                    <span>About Us</span>
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

export default Footer;