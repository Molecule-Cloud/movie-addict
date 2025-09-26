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
          <h1 className='text-4xl font-bold mb-4'>Welcome to <span className='text-yellow-300'>Movie Addict</span></h1>
          <p className='text-xl text-white max-w-2xl mx-auto'>Discover, save, and explore your favorite movies. Your personal cinema companion for finding the perfect film.</p>
        </section>
        <HeroCarousel movies={trendingMovies.results.slice(0, 8)} />

        <MovieSection title='Trending Movies' movies={trendingMovies.results} seeMoreLink="/trending" />

        <MovieSection title='Now Playing' movies={nowPlayingMovies.results} seeMoreLink="/now-playing" />

        <MovieSection title="Popular Movies" movies={popularMovies.results} seeMoreLink="/popular"/>
      </div>
    </>
  )

}