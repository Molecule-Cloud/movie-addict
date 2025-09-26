'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { searchMovies } from '@/app/lib/api/tmdb';
import { Movie } from '@/app/interfaces/tmbd';
import MovieCard from '@/app/components/movies/MovieCard';
import debounce from 'lodash/debounce';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedSearch = useCallback(
        debounce(async (searchQuery: string) => {
            if (!searchQuery.trim()) {
                setResults([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const data = await searchMovies(searchQuery);
                setResults(data.results);
            } catch (err) {
                setError('Failed to search movies');
                console.error('Search error:', err);
            } finally {
                setIsLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(query);
        return () => debouncedSearch.cancel();
    }, [query, debouncedSearch]);

    const clearSearch = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Search Movies</h1>

            {/* Search input */}
            <div className="relative max-w-2xl mb-8">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                    className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Results */}
            {isLoading && (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                </div>
            )}

            {error && (
                <div className="text-center py-8 text-red-400">{error}</div>
            )}

            {!isLoading && !error && results.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {results.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}

            {!isLoading && !error && query && results.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                    No results found for "{query}"
                </div>
            )}

            {!isLoading && !error && !query && (
                <div className="text-center py-8 text-gray-400">
                    Start typing to search for movies
                </div>
            )}
        </div>
    );
}