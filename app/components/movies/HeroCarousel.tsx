'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Star, Info } from 'lucide-react';
import { Movie } from '@/app/interfaces/tmbd';
import { getImageUrl } from '@/app/lib/api/tmdb';
import { HeroCarouselProps } from '@/app/interfaces/tmbd'



export default function HeroCarousel({ movies }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Filter movies that have backdrop images
    const moviesWithBackdrops = movies.filter(movie => movie.backdrop_path);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || moviesWithBackdrops.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % moviesWithBackdrops.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [currentIndex, isAutoPlaying, moviesWithBackdrops.length]);

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % moviesWithBackdrops.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000); 
    };

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + moviesWithBackdrops.length) % moviesWithBackdrops.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    if (moviesWithBackdrops.length === 0) {
        return null; 
    }

    const currentMovie = moviesWithBackdrops[currentIndex];

    return (
        <div className="relative h-[70vh] min-h-[350px] w-full overflow-hidden rounded-xl mb-12">
            {/* Carousel Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={getImageUrl(currentMovie.backdrop_path, 'w1280')}
                        alt={currentMovie.title}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Movie Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <div className="max-w-4xl">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold mb-4 text-white"
                    >
                        {currentMovie.title}
                    </motion.h2>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center space-x-4 mb-4"
                    >
                        <div className="flex items-center space-x-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{currentMovie.vote_average.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-300">
                            {currentMovie.release_date ? new Date(currentMovie.release_date).getFullYear() : 'TBA'}
                        </span>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-200 text-lg mb-6 line-clamp-3 max-w-2xl"
                    >
                        {currentMovie.overview}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex space-x-4"
                    >
                        <Link
                            href={`/movies/${currentMovie.id}`}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            <Info className="h-5 w-5" />
                            <span>View Details</span>
                        </Link>
                        <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                            <Play className="h-5 w-5" />
                            <span>Watch Trailer</span>
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {moviesWithBackdrops.slice(0, 5).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                ? 'bg-blue-500 w-8'
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
                {moviesWithBackdrops.length > 5 && (
                    <span className="text-white text-sm ml-2">
                        +{moviesWithBackdrops.length - 5} more
                    </span>
                )}
            </div>

            {/* Pause/Play Button */}
            <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-lg transition-colors z-10 text-sm"
            >
                {isAutoPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
}