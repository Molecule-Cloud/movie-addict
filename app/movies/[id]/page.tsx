import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getMovieDetails, getMovieCredits, getImageUrl } from '@/app/lib/api/tmdb';
import { Movie, Credits } from '@/app/interfaces/tmbd';
import FavoriteButton from '@/app/components/ui/FavouriteButton';
import CastList from '@/app/components/movies/CastList';

interface MoviePageProps {
    params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
    const { id } = await params;
    const movieId = parseInt(id);

    if (isNaN(movieId)) {
        notFound();
    }

    let movie: Movie;
    let credits: Credits;

    try {
        [movie, credits] = await Promise.all([
            getMovieDetails(movieId),
            getMovieCredits(movieId),
        ]);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        notFound();
    }

    const director = credits.crew.find(person => person.job === 'Director');
    const mainCast = credits.cast.slice(0, 12);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Back button */}
            <Link
                href="/"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
            </Link>

            {/* Hero section with backdrop */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-8">
                <Image
                    src={getImageUrl(movie.backdrop_path, 'w1280')}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                        {/* Poster */}
                        <div className="relative w-48 h-72 flex-shrink-0 hidden md:block">
                            <Image
                                src={getImageUrl(movie.poster_path)}
                                alt={movie.title}
                                fill
                                className="object-cover rounded-lg"
                                priority
                            />
                        </div>

                        {/* Movie info */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                            {movie.tagline && (
                                <p className="text-xl text-gray-300 italic mb-4">&quot;{movie.tagline}&quot;</p>
                            )}

                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <div className="flex items-center space-x-1">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                                    <span className="text-gray-400">({movie.vote_count.toLocaleString()})</span>
                                </div>

                                {movie.release_date && (
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(movie.release_date).getFullYear()}</span>
                                    </div>
                                )}

                                {movie.runtime && (
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-4">
                                <FavoriteButton movie={movie} size="lg" />
                                {movie.homepage && (
                                    <a
                                        href={movie.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                                    >
                                        Official Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column - Details */}
                <div className="lg:col-span-2">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                    </section>

                    {/* Cast */}
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Cast</h2>
                        <CastList cast={mainCast} />
                    </section>
                </div>

                {/* Right column - Sidebar */}
                <div className="space-y-6">
                    {director && (
                        <section>
                            <h3 className="text-lg font-semibold mb-2">Director</h3>
                            <p className="text-gray-300">{director.name}</p>
                        </section>
                    )}

                    {movie.genres && movie.genres.length > 0 && (
                        <section>
                            <h3 className="text-lg font-semibold mb-2">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map(genre => (
                                    <span
                                        key={genre.id}
                                        className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {movie.production_companies && movie.production_companies.length > 0 && (
                        <section>
                            <h3 className="text-lg font-semibold mb-2">Production Companies</h3>
                            <div className="space-y-1">
                                {movie.production_companies.map(company => (
                                    <p key={company.id} className="text-gray-300 text-sm">
                                        {company.name}
                                    </p>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}