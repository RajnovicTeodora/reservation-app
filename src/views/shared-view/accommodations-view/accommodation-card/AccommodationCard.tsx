import './AccommodationCard.scss';
import { Accommodation } from '../../../../shared/model/accommodation';
import { Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FaInfo } from 'react-icons/fa';
import { CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function AccommodationCard(props: { accommodation: Accommodation }) {
    const { accommodation } = props;
    const userType = localStorage.user
        ? localStorage.user.split('userType":"')[1].split('"')[0]
        : '';
    const url = localStorage.user
        ? (userType == 'HOST' ? '/main/host/accommodations/' : '/main/guest/accommodations/') +
          accommodation.id
        : '/accommodations/' + accommodation.id;

    return (
        <Card className="accommodation-card">
            <CardHeader className="accommodation-card__header" title={accommodation.name}>
                {accommodation.name}
            </CardHeader>
            <CardContent className="accommodation-card__content">
                <Typography
                    className="accommodation-card__description"
                    variant="body2"
                    color="text.secondary"
                >
                    {accommodation.address.number}, {accommodation.address.city},{' '}
                    {accommodation.address.street}
                </Typography>
            </CardContent>
            <CardContent>
                <div className="gallery">
                    {accommodation.photos.map((image: string, index: number) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="gallery-image"
                        />
                    ))}
                </div>
            </CardContent>
            <CardActions className="accommodation-card__actions" disableSpacing>
                <Link to={url}>
                    <FaInfo className="accommodation-card__icon" />
                </Link>
            </CardActions>
        </Card>
    );
}

export default AccommodationCard;
