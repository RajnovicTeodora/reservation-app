// material-ui
import { useTheme } from '@mui/material/styles';
import useScriptRef from '../../hooks/useScriptRef';
import Modal, { useModalState, modalAnimation, useModal } from 'react-simple-modal-provider';
import './modal.scss';
import { IconX } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useToaster } from 'rsuite/toaster';

import { FormControl, Grid, useMediaQuery } from '@mui/material';

// third party
import { Formik } from 'formik';
import { Rating } from 'react-simple-star-rating';
import RatingService from '../../services/rating.service';
import UserService from '../../services/user.service';
import NotificationService from '../../services/notification.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Message } from 'rsuite';

const RatingModal = ({ children, others }) => {
    const toaster = useToaster();
    const params = useParams();
    const id = params.id;
    const temp = window.location.href;
    let navigate = useNavigate();
    const [isOpen, setOpen] = useModalState();
    const [ratingType, setRatingType] = useState('Host');
    const [ratingExists, setRatingExists] = useState(false);
    const [newScore, setNewScore] = useState(0);
    const [avgScore, setAvgScore] = useState(0);

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const scriptedRef = useScriptRef();

    const { open: openViewRatingsModal } = useModal('ViewRatingsModal');

    const handleClickViewAllRatings = (event) => {
        ratingType == 'Host'
            ? navigate(window.location.pathname + '#viewRatingHost')
            : navigate(window.location.pathname + '#viewRatingAcc');
        openViewRatingsModal(event);
        setOpen(false);
    };

    const handleDelete = () => {
        if (ratingExists) {
            const data = {
                guestUsername: JSON.parse(localStorage.getItem('user')).username,
                hostRating: ratingType == 'Host' ? true : false,
                hostUsername: localStorage.hostUsername,
                accommodation: id,
            };
            RatingService.deleteRating(data).then(
                () => {
                    toaster.push(
                        <Message showIcon type="success">
                            Successfully deleted score rating!
                        </Message>,
                        { placement: 'topEnd' }
                    );
                    setNewScore(0);
                    setRatingExists(false);
                    ratingType == 'Host' ? getAvgHostScore() : getAvgAccommodationScore();
                },
                (error) => {
                    toaster.push(
                        <Message showIcon type="error" closable>
                            {error.response.data}
                        </Message>,
                        { placement: 'topEnd' }
                    );
                    setOpen(false);
                }
            );
        }
    };

    const checkNotification = (type) => {
        UserService.checkNotification(localStorage.hostUsername).then((response) => {
            if ((type == 3 && response.data.type3) || (type == 4 && response.data.type4)) {
                NotificationService.createNotification(response.data.userId, type).then((error) => {
                    toaster.push(
                        <Message showIcon type="error" closable>
                            {error.response.data}
                        </Message>,
                        { placement: 'topEnd' }
                    );
                });
            }
        });
    };

    const getAvgHostScore = () => {
        RatingService.getAvgHostScore(localStorage.hostUsername).then((response) => {
            setAvgScore(response.data);
            RatingService.getExistingHostScore(localStorage.hostUsername).then((res) => {
                setNewScore(res.data);
                if (res.data != 0) {
                    setRatingExists(true);
                }
            });
        });
    };

    const getAvgAccommodationScore = () => {
        RatingService.getAvgAccommodationScore(id).then((response) => {
            setAvgScore(response.data);
            RatingService.getExistingAccommodationScore(id).then((res) => {
                setNewScore(res.data);
                if (res.data != 0) {
                    setRatingExists(true);
                }
            });
        });
    };

    useEffect(() => {
        if (id) {
            if (temp.includes('#rate')) {
                setRatingExists(false);
                if (temp.includes('#rateHost')) {
                    setRatingType('Host');
                    getAvgHostScore();
                } else if (temp.includes('#rateAcc')) {
                    setRatingType('Accommodation');
                    getAvgAccommodationScore();
                }
            }
        }
    }, [id, temp]);

    return (
        <Modal
            id={'RatingModal'}
            consumer={children}
            isOpen={isOpen}
            setOpen={setOpen}
            duration={250}
            animation={modalAnimation.scaleUp}
            draggable={false}
        >
            <div className="custom-modal">
                <div className="custom-x-button-modal">
                    <button
                        type="button"
                        className="custom-x-button"
                        onClick={() => setOpen(false)}
                    >
                        <IconX />
                    </button>
                </div>
                <div className="flex-disp">
                    <div className="custom-modal-icon">{avgScore}</div>
                    <div className="custom-text-modal">
                        <h3 className="custom-text">{ratingType} Rating</h3>
                        <a onClick={handleClickViewAllRatings}>View All Ratings</a>
                    </div>
                </div>
                <div className="flex-disp" style={{ justifyContent: 'center' }}>
                    <>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                rating: newScore,
                                submit: null,
                            }}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    if (newScore == 0) {
                                        toaster.push(
                                            <Message showIcon type="error" closable>
                                                {'Score rating must be 1-5'}
                                            </Message>,
                                            { placement: 'topEnd' }
                                        );
                                    } else {
                                        const data = {
                                            guestUsername: JSON.parse(localStorage.getItem('user'))
                                                .username,
                                            hostRating: ratingType == 'Host' ? true : false,
                                            hostUsername: localStorage.hostUsername,
                                            accommodation: id,
                                            score: newScore,
                                            editExistingRating: ratingExists,
                                        };

                                        RatingService.saveRating(data).then(
                                            () => {
                                                toaster.push(
                                                    <Message showIcon type="success">
                                                        {'New score rating saved'}
                                                    </Message>,
                                                    { placement: 'topEnd' }
                                                );

                                                setNewScore(newScore);
                                                setRatingExists(true);
                                                if (ratingType == 'Host') {
                                                    getAvgHostScore();
                                                    checkNotification(3);
                                                } else {
                                                    getAvgAccommodationScore();
                                                    checkNotification(4);
                                                }
                                            },
                                            (error) => {
                                                toaster.push(
                                                    <Message showIcon type="error" closable>
                                                        {error.response.data}
                                                    </Message>,
                                                    { placement: 'topEnd' }
                                                );

                                                setStatus({ success: false });
                                                setSubmitting(false);
                                            }
                                        );
                                        if (scriptedRef.current) {
                                            setStatus({ success: true });
                                            setSubmitting(false);
                                        }
                                    }
                                } catch (err) {
                                    if (scriptedRef.current) {
                                        setStatus({ success: false });
                                        setErrors({ submit: err.message });
                                        setSubmitting(false);
                                    }
                                }
                            }}
                        >
                            {({ handleSubmit, isSubmitting, values }) => (
                                <form noValidate onSubmit={handleSubmit} {...others}>
                                    <Grid container spacing={matchDownSM ? 0 : 1}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl
                                                fullWidth
                                                sx={{ ...theme.typography.customInput }}
                                            >
                                                {
                                                    <Rating
                                                        initialValue={values.rating}
                                                        onClick={(selected) => {
                                                            setNewScore(selected);
                                                        }}
                                                        size={40}
                                                        label
                                                        transition
                                                        fillColor="orange"
                                                        emptyColor="gray"
                                                        className="foo" // Will remove the inline style if applied
                                                    />
                                                }
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <div style={{ textAlignLast: 'center' }}>
                                        {ratingExists && (
                                            <button
                                                className="cancel-button"
                                                type="button"
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </button>
                                        )}
                                        <button
                                            className="ok-button"
                                            disabled={isSubmitting}
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </>
                </div>
            </div>
        </Modal>
    );
};

export default RatingModal;
