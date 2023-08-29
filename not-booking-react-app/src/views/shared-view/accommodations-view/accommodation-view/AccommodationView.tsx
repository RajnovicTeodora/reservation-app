import './AccommodationView.scss';
import { Accommodation } from '../../../../shared/model/accommodation';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { accommodationService } from '../../../../services/accommodationServie';
import { Button } from '@mui/material';
import { useModal } from 'react-simple-modal-provider';

function AccommodationView() {
    const params = useParams();
    const id = params.id;
    let navigate = useNavigate();

    const [accommodation, setAccommodation] = useState<Accommodation>();

    const { open: openRatingModal } = useModal('RatingModal');

    const handleClickHostRating = (event: any) => {
        navigate(window.location.pathname + '#rateHost');
        openRatingModal(event);
    };

    const handleClickAccommodationRating = (event: any) => {
        navigate(window.location.pathname + '#rateAcc');
        openRatingModal(event);
    };

    useEffect(() => {
        if (id) {
            const findAccomodationsPromise = accommodationService.findById(parseInt(id));
            findAccomodationsPromise.then((result) => {
                setAccommodation(result.data);
            });
        }
    }, [id]);

    const priceClick = () => {
        localStorage.accommodationId = accommodation ? accommodation.id : '';
        navigate('/main/host/pricesTable');
    };
    const unavilabilityClick = () => {
        localStorage.accommodationId = accommodation ? accommodation.id : '';
        navigate('/main/host/un');
    };
    const requestsClick = () => {
        localStorage.accommodationId = accommodation ? accommodation.id : '';
        navigate('/main/host/request_page');
    };
    const reserveClick = () => {
        localStorage.accommodationId = accommodation ? accommodation.id : '';
        navigate('/main/host/request');
    };
    const userType = localStorage.user.split('userType":"')[1].split('"')[0];

    return accommodation ? (
        <div className="listing-details-container">
            <div className="listing-details">
                <h2>{accommodation.name}</h2>
                <p>{accommodation.description}</p>

                <div className="address">
                    <span>{accommodation.address}</span>
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
                    <button onClick={handleClickAccommodationRating}>
                        Average Score: {accommodation.averageScore}
                    </button>
                </div>

                <div className="host">
                    <button onClick={handleClickHostRating}>Host: host@gmail.com</button>
                </div>
            </div>
            <div>
                {userType === 'HOST' && (
                    <Button
                        onClick={() => {
                            priceClick();
                        }}
                    >
                        Price table
                    </Button>
                )}
                {userType === 'HOST' && (
                    <Button
                        onClick={() => {
                            unavilabilityClick();
                        }}
                    >
                        Unavilability table
                    </Button>
                )}
                {userType === 'HOST' && (
                    <Button
                        onClick={() => {
                            requestsClick();
                        }}
                    >
                        See requests
                    </Button>
                )}
                {userType === 'GUEST' && (
                    <Button
                        onClick={() => {
                            reserveClick();
                        }}
                    >
                        Reserve
                    </Button>
                )}
            </div>
        </div>
    ) : null;
}

export default AccommodationView;
