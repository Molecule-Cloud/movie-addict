import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { MovieSectionProps } from '@/app/interfaces/tmbd';
import MovieCard from './MovieCard';


const MovieSection = ({ title, movies, seeMoreLink }: MovieSectionProps) => {
    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                {seeMoreLink && (
                    <Link
                        href={seeMoreLink}
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        See more <ChevronRight className="h-4 w-4" />
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies.slice(0, 10).map((movie, index) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        priority={index < 4} // Prioritize loading first 4 images
                    />
                ))}
            </div>
            
        </section>
    );
};

export default MovieSection;