import { getTrendingMovies, getNowPlayingMovies, getPopularMovies } from '@/app/lib/api/tmdb';
import MovieSection from '@/app/components/movies/MovieSection';
import HeroCarousel from './components/movies/hero-carousel';

export default async function HomePage() {
  const [trendingMovies, nowPlayingMovies, popularMovies] = await Promise.all([
    getTrendingMovies(),
    getNowPlayingMovies(),
    getPopularMovies()
  ]);



  return (
    <>
      <div className='space-y-12'>
        <section className='text-center'>
          <h1 className='text-4xl font-bold mb-4'>Welcome to Movie Addict</h1>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto'>Discover trending movies</p>
        </section>
        <HeroCarousel movies={trendingMovies.results.slice(0, 8)} />

        <MovieSection title='Trending Movies' movies={trendingMovies.results} seeMoreLink="/trending" />

        <MovieSection title='Now Playing' movies={nowPlayingMovies.results} seeMoreLink="/now-playing" />

        <MovieSection title="Popular Movies" movies={popularMovies.results} seeMoreLink="/popular"/>
      </div>
    </>
  )

}