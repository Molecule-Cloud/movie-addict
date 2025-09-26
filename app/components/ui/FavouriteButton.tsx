'use client';

import { Heart } from 'lucide-react';
import { Movie } from '@/app/interfaces/tmbd';
import { useFavoriteStore } from '@/app/lib/store/store';

interface FavoriteButtonProps {
    movie: Movie;
    size?: 'sm' | 'md' | 'lg';
}

const FavoriteButton = ({ movie, size = 'md' }: FavoriteButtonProps) => {
    const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
    const isFavorite = favorites.some(fav => fav.id === movie.id);

    const handleClick = () => {
        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    const sizeClasses = {
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-3'
    };

    const iconSizes = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
    };

    return (
        <button
            onClick={handleClick}
            className={`rounded-full bg-gray-800 hover:bg-gray-700 transition-colors ${sizeClasses[size]}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Heart
                className={`${iconSizes[size]} ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
        </button>
    );
};

export default FavoriteButton;