'use client'

import { LoadMoreProps } from '@/app/interfaces/tmbd';
import {useEffect, useRef} from 'react';

const LoadMore = ({ onLoadMore, loading, hasMore }: LoadMoreProps) => {
    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    onLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [onLoadMore, loading, hasMore]);

    if (!hasMore) {
        return (
            <div className="text-center py-8 text-gray-400">
                You have seen all the movies!
            </div>
        );
    }

    return (
        <div ref={observerRef} className="py-8">
            {loading && (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            )}
        </div>
    );
}

export default LoadMore;