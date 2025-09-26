const MovieCardSkeleton = () => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
            <div className="aspect-[2/3] bg-gray-700" />
            <div className="p-3">
                <div className="h-4 bg-gray-700 rounded mb-2" />
                <div className="h-3 bg-gray-700 rounded w-3/4" />
            </div>
        </div>
    );
};

export default MovieCardSkeleton;