import Modal, { useModalState, modalAnimation } from 'react-simple-modal-provider';
import './modal.scss';
import { IconX, IconStar } from '@tabler/icons';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import RatingService from '../../services/rating.service';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Message, useToaster } from 'rsuite';

const ViewRatingsModal = ({ children }) => {
    const [isOpen, setOpen] = useModalState();
    const params = useParams();
    const id = params.id;
    const temp = window.location.href;
    const toaster = useToaster();
    const [ratingType, setRatingType] = useState('Host');
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (id) {
            if (temp.includes('#viewRating')) {
                if (temp.includes('#viewRatingHost')) {
                    setRatingType('Host');
                    RatingService.getAllHostScores(localStorage.hostUsername).then(
                        (response) => {
                            setRows(response.data);
                        },
                        (error) => {
                            toaster.push(
                                <Message showIcon type="info" closable>
                                    {error.response}
                                </Message>,
                                { placement: 'topEnd' }
                            );
                        }
                    );
                } else if (temp.includes('#viewRatingAcc')) {
                    setRatingType('Accommodation');
                    RatingService.getAllAccommodationScores(id).then(
                        (response) => {
                            setRows(response.data);
                        },
                        (error) => {
                            toaster.push(
                                <Message showIcon type="info" closable>
                                    {error.response.data}
                                </Message>,
                                { placement: 'topEnd' }
                            );
                        }
                    );
                }
            }
        }
    }, [id, temp]);

    return (
        <Modal
            id={'ViewRatingsModal'}
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
                        onClick={() => {
                            setOpen(false);
                            setRows([]);
                        }}
                    >
                        <IconX />
                    </button>
                </div>
                <div className="flex-disp">
                    <div className="custom-modal-icon">
                        <IconStar className="custom-icon" />
                    </div>
                    <div className="custom-text-modal">
                        <h3 className="custom-text">View All {ratingType} Ratings</h3>
                    </div>
                </div>
                <div style={{ height: 400, width: '100%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 450 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Rating </TableCell>
                                    <TableCell align="center">Date created</TableCell>
                                    <TableCell align="center">Guest </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.guest}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            {row.score}
                                        </TableCell>
                                        <TableCell align="center">{row.date}</TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {row.guest}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Modal>
    );
};

export default ViewRatingsModal;
