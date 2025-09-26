'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { MovieCardProps } from '@/app/interfaces/tmbd';
import { getImageUrl } from '@/app/lib/api/tmdb';
import { useFavoriteStore } from '@/app/lib/store/store';



const MovieCard = ({ movie, priority = false }: MovieCardProps) => {
    const [imageError, setImageError] = useState(false);
    const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
    const isFavorite = favorites.some(fav => fav.id === movie.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.2 }}
            className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <Link href={`./movies/${movie.id}`}>
                <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                        src={imageError ? '/placeholder-movie.png' : getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImageError(true)}
                        priority={priority}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Rating badge */}
                    <div className="absolute top-2 left-2 bg-black/70 rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold">{movie.vote_average.toFixed(1)}</span>
                    </div>

                    {/* Favorite button */}
                    <button
                        onClick={handleFavoriteClick}
                        className="absolute top-2 right-2 p-2 bg-black/70 rounded-full hover:bg-red-500/80 transition-colors"
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Heart
                            className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
                        />
                    </button>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end">
                        <div className="p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                            <p className="text-gray-300 text-xs line-clamp-2">{movie.overview}</p>
                            <p className="text-gray-400 text-xs mt-1">
                                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default MovieCard;