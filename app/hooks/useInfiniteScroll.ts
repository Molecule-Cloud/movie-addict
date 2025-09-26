'use client'

import {useState, useEffect, useCallback} from 'react';
import { InfiniteScrollResponse } from '@/app/interfaces/tmbd';

export default function useInfiniteScroll<T>(
    fetchFunction: (page: number) => Promise<InfiniteScrollResponse<T>>, initialData: T[] = []
)
{
    const [data, setData] = useState<T[]>(initialData);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        setError(null);

        try {
            const response = await fetchFunction(page + 1);
            setData(prev => [...prev, ...response.results]);
            setTotalPages(response.total_pages);
            setPage(prev => prev + 1);
            setHasMore(page + 1 < response.total_pages);
        } catch (error) {
            setError("Failed to load more movies");
            console.error("Error loading more data", error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore, fetchFunction]);
    
    useEffect(() => {
        setData(initialData);;
        setPage(1);
        setHasMore(true);
        setError(null);
    }, [initialData]);

    return {
        data, loadMore, loading, hasMore, error, currentPage: page, totalPages
    }
}

