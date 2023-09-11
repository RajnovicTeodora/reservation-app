import { useState, useEffect } from 'react';
import reservationService from '../../../services/ReservationService';
import { useToaster } from 'rsuite/toaster';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { Message } from 'rsuite';
import accomoddationService from '../../../services/AccomoddationService';
import UserService from '../../../services/user.service';
import NotificationService from '../../../services/notification.service';

const TableReservationPage = () => {
    const [rows, setRows] = useState([]);
    const toaster = useToaster();
    const username = JSON.parse(localStorage.getItem('user')).username;
    const [open, setOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [requestId, setRequestId] = useState('');
    const [accName, setAccName] = useState('');

    const createNotification = () => {
        accomoddationService.getHostUsernameByAccId(accName, true).then(
            (res) => {
                //TODO check
                UserService.checkNotification(res.data).then((response) => {
                    if (response.data.type2) {
                        NotificationService.createNotification(response.data.userId, 2).then(
                            (error) => {
                                toaster.push(
                                    <Message showIcon type="error" closable>
                                        {error.response.data}
                                    </Message>,
                                    { placement: 'topEnd' }
                                );
                            }
                        );
                    }
                });
            },
            (err) => {
                toaster.push(
                    <Message showIcon type="error">
                        {err.response.data}
                    </Message>,
                    { placement: 'topEnd' }
                );
            }
        );
    };

    const handleOpen = (text, id, accommodationName) => {
        setRequestId(id);
        setDialogText(text);
        setOpen(true);
        setAccName(accommodationName);
    };
    const handleAgree = () => {
        reservationService.deleteReservation(requestId).then((res) => {
            if (res.status === 200) {
                toaster.push(
                    <Message showIcon type="success">
                        Successfully deleted request!
                    </Message>,
                    { placement: 'topEnd' }
                );
                createNotification();
                window.location.reload();
            } else {
                toaster.push(
                    <Message showIcon type="error" closable>
                        Error while deleting request
                    </Message>,
                    { placement: 'topEnd' }
                );
            }
        });
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                await reservationService.getListRequestByGostId(username).then((resp) => {
                    if (resp.status !== 200) {
                        toaster.push(
                            <Message showIcon type="error">
                                There is no reservations.
                            </Message>,
                            { placement: 'topEnd' }
                        );
                    } else {
                        setRows(resp.data);
                    }
                });
            } catch (error) {
                const resMessage = error.response;
                toaster.push(
                    <Message showIcon type="error" closable>
                        {resMessage}
                    </Message>,
                    { placement: 'topEnd' }
                );
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <h2>Your reservations</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Date from </TableCell>
                            <TableCell align="center">Date to</TableCell>
                            <TableCell align="center">Accomodation </TableCell>
                            <TableCell align="center">Number of guests</TableCell>
                            <TableCell align="center">Delete </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" align="center">
                                    {row.startDate}
                                </TableCell>
                                <TableCell component="th" align="center">
                                    {row.endDate}
                                </TableCell>
                                <TableCell component="th" align="center">
                                    {row.accomodation !== null ? <>{row.accomodation.name}</> : '/'}
                                </TableCell>
                                <TableCell component="th" align="center">
                                    {row.guestNumber}
                                </TableCell>
                                <TableCell component="th" align="center">
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            handleOpen(
                                                'Are you sure you want to delete this request?',
                                                row.id,
                                                row.accomodation.name
                                            );
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default TableReservationPage;
