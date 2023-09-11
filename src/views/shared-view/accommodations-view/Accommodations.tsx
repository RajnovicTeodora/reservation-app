import { useEffect, useState } from 'react';
import { accommodationService } from '../../../services/accommodationServie';
import AccommodationCard from './accommodation-card/AccommodationCard';
import { Accommodation } from '../../../shared/model/accommodation';
import AccommodationFilter from './accommodation-filter/AccommodationFilter';
import './Accommodations.scss';
import { AccommodationFilterParams } from './accommodation-filter/AccommodationFilterParams';

export default function Accommodations() {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [filter, setFilter] = useState<AccommodationFilterParams>(
        new AccommodationFilterParams()
    );

    useEffect(() => {
        const allAccomodationsPromise = accommodationService.filterAll(filter);
        allAccomodationsPromise.then((result) => {
            setAccommodations(result.data);
        });
    }, [filter]);

    return (
        <div className="section-content">
            <AccommodationFilter setFilter={setFilter} />
            <div className="accommodations">
                {accommodations.map((item: Accommodation, index: number) => (
                    <AccommodationCard key={index} accommodation={item} />
                ))}
            </div>
        </div>
    );
}
