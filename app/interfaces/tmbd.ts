export interface Movie { 
    id: number;
    title: string;
    overview: string;
    poster_path: string | null
    release_date: string;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    genre_ids?: number[];
    genres: Genre[];
    runtime?: number;
    original_language?: string;
    popularity: number;
    production_companies?: ProductionCompany[];
    production_countries?: ProductionCountry[];
    spoken_languages?: SpokenLanguage[];
    budget?: number;
    tagline?: boolean;
    video?: boolean;
    adult?: boolean;
    homepage?: string;
    imdb_id?: string;
    revenue?: number;
}

export interface Genre {
    id: number;
    name: string;
    origin_country: | null;
    logo_path?: string | null
}

export interface ProductionCountry { 
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage{
    english_name: string;
    iso_639_1: string;
    name: string;
}


export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order:  number
}


export interface Credits {
    cast: Cast[];
    crew: Crew[];
}

export interface Crew {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_patn: string | null;
    origin_country: string;
}

export interface ApiResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface MovieListResponse extends ApiResponse<Movie> {}

export interface SearchResponse extends ApiResponse<Movie> {}



export interface MovieCardProps {
    movie: Movie;
    priority?: boolean;
}

export interface MovieSectionProps {
    title: string;
    movies: Movie[];
    seeMoreLink?: string;
}
export interface InfiniteScrollResponse<T>{
    results: T[];
    total_pages: number;
    page: number;
}

export interface LoadMoreProps {
    onLoadMore: () => void;
    loading: boolean;
    hasMore: boolean;
}


export interface ButtonProps {
    size: 'small' | 'medium' | 'large';
    shape: 'rounded-sm' | 'rounded-md' | 'rounded-full';
    text: string;
}


export interface HeroCarouselProps {
    movies: Movie[];
}