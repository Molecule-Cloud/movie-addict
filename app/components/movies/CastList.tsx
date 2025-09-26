import Image from 'next/image';
import { getImageUrl } from '@/app/lib/api/tmdb';
import { Cast } from '@/app/interfaces/tmbd';

interface CastListProps {
    cast: Cast[];
}

const CastList = ({ cast }: CastListProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {cast.map(person => (
                <div key={person.id} className="text-center">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                        <Image
                            src={getImageUrl(person.profile_path)}
                            alt={person.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h4 className="font-semibold text-sm">{person.name}</h4>
                    <p className="text-gray-400 text-xs">{person.character}</p>
                </div>
            ))}
        </div>
    );
};

export default CastList;