import './AccommodationView.scss';
import { Accommodation } from '../../../../shared/model/accommodation';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { accommodationService } from '../../../../services/accommodationServie';

function AccommodationView() {
    const params = useParams();
    const id = params.id;

    const [accommodation, setAccommodation] = useState<Accommodation>();

    useEffect(() => {
        if (id) {
            const findAccomodationsPromise = accommodationService.findById(parseInt(id));
            findAccomodationsPromise.then((result) => {
                setAccommodation(result.data);
            });
        }
    }, [id]);

    return accommodation ? (
        <div className="listing-details-container">
            <div className="listing-details">
                <h2>{accommodation.name}</h2>
                <p>{accommodation.description}</p>
                <div className="address">
                    <p>Address</p>
                    <div className="info-item">
                        <span className="label">Street:</span>
                        <span className="value">{accommodation.address.street}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">City:</span>
                        <span className="value">{accommodation.address.city}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Country:</span>
                        <span className="value">{accommodation.address.country}</span>
                    </div>
                </div>
                <div className="photos">
                    {accommodation.photos.map((photo, index) => (
                        <img src={photo} alt={`Photo ${index + 1}`} key={index} />
                    ))}
                </div>
                <div className="benefits">
                    <h3>Benefits:</h3>
                    <ul>
                        {accommodation.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </div>
                <div className="guests">
                    <span>
                        Guests: {accommodation.minGuests} - {accommodation.maxGuests}
                    </span>
                </div>
                <div className="approval">
                    <span>
                        {accommodation.automaticApproval ? 'Automatic Approval' : 'Manual Approval'}
                    </span>
                </div>
                <div className="score">
                    <span>Average Score: {accommodation.averageScore}</span>
                </div>
            </div>
        </div>
    ) : null;
}

export default AccommodationView;
