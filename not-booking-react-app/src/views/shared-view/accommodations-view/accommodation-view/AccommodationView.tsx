import './AccommodationView.scss';
import { Accommodation } from '../../../../shared/model/accommodation';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { accommodationService } from '../../../../services/accommodationServie';
import { Button, Tooltip } from '@mui/material';
import { useModal } from 'react-simple-modal-provider';
import RatingService from '../../../../services/rating.service';
import { IconStar } from '@tabler/icons';
import reservationService from '../../../../services/ReservationService';
import { Message, useToaster } from 'rsuite';

function AccommodationView() {
    const params = useParams();
    const id = params.id;
    let navigate = useNavigate();
    const toaster = useToaster();

    const [accommodation, setAccommodation] = useState<Accommodation>();

    const { open: openRatingModal } = useModal('RatingModal');
    const { open: openViewRatingsModal } = useModal('ViewRatingsModal');
    const [avgAccScore, setAvgAccScore] = useState(0);
    const [avgHostScore, setAvgHostScore] = useState(0);
    const [rateHostAvailable, setRateHost] = useState(false);
    const [rateAccAvailable, setRateAcc] = useState(false);
    const [hostUsername, setHostUsername] = useState('');
    const userType = localStorage.user
        ? localStorage.user.split('userType":"')[1].split('"')[0]
        : '';

    const handleClickHostRating = (event: any) => {
        navigate(window.location.pathname + '#rateHost');
        localStorage.hostUsername = hostUsername;
        openRatingModal(event);
    };

    const handleClickAccommodationRating = (event: any) => {
        navigate(window.location.pathname + '#rateAcc');
        openRatingModal(event);
    };

    const handleClickViewAllHostRatings = (event: any) => {
        navigate(window.location.pathname + '#viewRatingHost');
        localStorage.hostUsername = hostUsername;
        openViewRatingsModal(event);
    };

    const handleClickViewAllAccRatings = (event: any) => {
        navigate(window.location.pathname + '#viewRatingAcc');
        localStorage.hostUsername = hostUsername;
        openViewRatingsModal(event);
    };

    const getAvgScores = (accId: string, username: string) => {
        RatingService.getAvgAccommodationScore(accId).then((response) => {
            setAvgAccScore(response.data);
            RatingService.getAvgHostScore(username).then((res) => {
                setAvgHostScore(res.data);
                if (localStorage.user && userType == 'GUEST') {
                    checkFinishedReservations(accId, username);
                }
            });
        });
    };

    const checkFinishedReservations = (accId: string, hUsername: string) => {
        const username = localStorage.user.split('username":"')[1].split('"')[0];
        reservationService.checkFinishedReservations(hUsername, username, accId).then(
            (res) => {
                setRateHost(res.data.rateHost);
                setRateAcc(res.data.rateAcc);
            },
            (err) => {
                toaster.push(
                    <Message showIcon type="error" closable>
                        {err.response.data}
                    </Message>,
                    { placement: 'topEnd' }
                );
            }
        );
    };

    useEffect(() => {
        if (id) {
            const findAccomodationsPromise = accommodationService.findById(parseInt(id));
            findAccomodationsPromise.then((result) => {
                setAccommodation(result.data);
                setHostUsername('host123'); //TODO teodora postavi username
                getAvgScores(id, 'host123');
            });
        }
    }, [id]);

    const priceClick = () => {
        localStorage.accommodationId = accommodation ? accommodation.id : '';
        navigate('/main/host/prices');
    };
    const unavilabilityClick = () => {
        localStorage.accommodationId = accommodation ? accommodation.id : '';
        navigate('/main/host/unavaliability');
    };
    const requestsClick = () => {
        localStorage.accommodationId = accommodation ? accommodation.id : '';
        navigate('/main/host/requests');
    };
    const reserveClick = () => {
        localStorage.accommodationId = accommodation ? accommodation.id : '';
        localStorage.hostUsername = hostUsername;
        navigate('/main/guest/create');
    };

    return accommodation ? (
        <div className="listing-details-container">
            <div className="listing-details">
                <div className="flex-disp">
                    <div className="custom-modal-icon">{avgAccScore}</div>
                    <div className="custom-text-modal">
                        <h2 className="custom-text">Accommodation: {accommodation.name}</h2>
                        <a
                            onClick={(e) => {
                                handleClickViewAllAccRatings(e);
                            }}
                        >
                            View All Ratings
                        </a>
                    </div>
                    {userType === 'GUEST' && rateAccAvailable && (
                        <Tooltip title="Rate Accommodation">
                            <Button onClick={handleClickAccommodationRating}>
                                <IconStar className="custom-icon wheat-color" />
                            </Button>
                        </Tooltip>
                    )}
                </div>
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

                <div className="flex-disp">
                    <div className="custom-modal-icon">{avgHostScore}</div>
                    <div className="custom-text-modal">
                        <h3 className="custom-text">Host: username</h3>
                        <a
                            onClick={(e) => {
                                handleClickViewAllHostRatings(e);
                            }}
                        >
                            View All Ratings
                        </a>
                    </div>
                    {userType === 'GUEST' && rateHostAvailable && (
                        <Tooltip title="Rate Host">
                            <Button onClick={handleClickHostRating}>
                                <IconStar className="custom-icon wheat-color" />
                            </Button>
                        </Tooltip>
                    )}
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
