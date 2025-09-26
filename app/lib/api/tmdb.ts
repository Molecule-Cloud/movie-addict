import { Movie, MovieListResponse, Credits } from '@/app/interfaces/tmbd';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

if (!API_KEY) {
    throw new Error('TMDB API key is not defined');
}

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
    if (!path) return '/placeholder-movie.png';
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

const fetchFromTMDB = async <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.set('api_key', API_KEY!);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`TMDB API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const getTrendingMovies = async (): Promise<MovieListResponse> => {
    return fetchFromTMDB<MovieListResponse>('/trending/movie/week');
};

export const getPopularMovies = async (page: number = 1): Promise<MovieListResponse> => {
    return fetchFromTMDB<MovieListResponse>('/movie/popular', { page: page.toString() });
};

export const getNowPlayingMovies = async (page: number = 1): Promise<MovieListResponse> => {
    return fetchFromTMDB<MovieListResponse>('/movie/now_playing', { page: page.toString() });
};

export const getMovieDetails = async (id: number): Promise<Movie> => {
    return fetchFromTMDB<Movie>(`/movie/${id}`);
};

export const getMovieCredits = async (id: number): Promise<Credits> => {
    return fetchFromTMDB<Credits>(`/movie/${id}/credits`);
};

export const getMovieVideos = async (id: number): Promise<string> => {
    return fetchFromTMDB(`/movie/${id}/videos`);
};


export const searchMovies = async (query: string, page: number = 1): Promise<MovieListResponse> => {
    return fetchFromTMDB<MovieListResponse>('/search/movie', {
        query,
        page: page.toString()
    });

};