import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Movie } from '@/app/interfaces/tmbd';

interface FavoriteState {
    favorites: Movie[];
    addFavorite: (movie: Movie) => void;
    removeFavorite: (movieId: number) => void;
    isFavorite: (movieId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (movie: Movie) =>
                set((state) => {
                    // Check if movie is already in favorites
                    if (state.favorites.some(fav => fav.id === movie.id)) {
                        return state;
                    }
                    return { favorites: [...state.favorites, movie] };
                }),

            removeFavorite: (movieId: number) =>
                set((state) => ({
                    favorites: state.favorites.filter(movie => movie.id !== movieId),
                })),

            isFavorite: (movieId: number) =>
                get().favorites.some(movie => movie.id === movieId),
        }),
        {
            name: 'favorites-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);