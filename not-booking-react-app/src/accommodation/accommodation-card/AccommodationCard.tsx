import './AccommodationCard.scss';
import { Accommodation } from '../../shared/model/accommodation';
import { Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FaInfo } from 'react-icons/fa';
import { CardActions, CardContent, Typography } from '@mui/material';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';

function AccommodationCard(props: { accommodation: Accommodation }) {
    const { accommodation } = props;

    const url = '/main/accommodations/' + accommodation.id;

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
                    <Truncate lines={4}>{accommodation.description}</Truncate>
                </Typography>
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
