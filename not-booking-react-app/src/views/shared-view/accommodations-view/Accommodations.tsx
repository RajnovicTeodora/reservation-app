import { useEffect, useState } from 'react';
import { accommodationService } from '../../../services/accommodationServie';
import AccommodationCard from './accommodation-card/AccommodationCard';
import { Accommodation } from '../../../shared/model/accommodation';
import './Accommodations.scss';

export default function Accommodations() {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

    useEffect(() => {
        const allAccomodationsPromise = accommodationService.findAll();
        allAccomodationsPromise.then((result) => {
            setAccommodations(result.data);
        });
    }, []);

    return (
        <div className="section-content">
            <div className="accommodations">
                {accommodations.map((item: Accommodation, index: number) => (
                    <AccommodationCard key={index} accommodation={item} />
                ))}
            </div>
        </div>
    );
}
