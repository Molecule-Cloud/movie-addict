'use client';

import { useFavoriteStore } from '@/app/lib/store/store';
import MovieCard from '@/app/components/movies/MovieCard';
import { HeartOff } from 'lucide-react';

export default function FavoritesPage() {
    const { favorites } = useFavoriteStore();

    if (favorites.length === 0) {
        return (
            <div className="text-center py-12">
                <HeartOff className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
                <p className="text-gray-400">Start adding movies to your favorites to see them here!</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {favorites.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}