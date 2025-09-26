'use client';

import { useState, useEffect } from 'react';
import { getTrendingMovies } from '@/app/lib/api/tmdb';
import MovieCard from '@/app/components/movies/MovieCard';
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';
import LoadMore from '@/app/components/ui/LoadMore'
import { Movie, } from '@/app/interfaces/tmbd';

export default function TrendingPage() {
    const [initialData, setInitialData] = useState<Movie[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);

    // Load initial data
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const response = await getTrendingMovies();
                setInitialData(response.results);
            } catch (error) {
                console.error('Error loading initial data:', error);
            } finally {
                setInitialLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const { data, loadMore, loading, hasMore, error } = useInfiniteScroll(
        getTrendingMovies,
        initialData
    );

    if (initialLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-800 rounded w-1/3 mb-8"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="bg-gray-800 rounded-lg aspect-[2/3] animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">Trending Movies</h1>
            <p className="text-gray-400 mb-8">Discover what&apos;s popular right now</p>

            {error && (
                <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-4">
                    <p className="text-red-300">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {data.map(movie => (
                    <MovieCard key={`${movie.id}-${movie.title}`} movie={movie} />
                ))}
            </div>

            <LoadMore
                onLoadMore={loadMore}
                loading={loading}
                hasMore={hasMore}
            />
        </div>
    );
}