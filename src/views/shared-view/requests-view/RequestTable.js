import { useState } from 'react';
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
import requestService from '../../../services/RequestService';
import { useNavigate } from 'react-router-dom';
import { useToaster } from 'rsuite/toaster';
import { Message } from 'rsuite';
import UserService from '../../../services/user.service';
import NotificationService from '../../../services/notification.service';
const RequestTable = ({ rows, isByGuest }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [requestId, setRequestId] = useState('');
    const toaster = useToaster();
    const [guestUsername, setUsername] = useState('');

    const handleOpen = (text, id, username) => {
        setRequestId(id);
        setDialogText(text);
        setOpen(true);
        setUsername(username);
    };

    const createNotification = () => {
        //TODO check
        UserService.checkNotification(guestUsername).then((response) => {
            if (response.data.type5) {
                NotificationService.createNotification(response.data.userId, 5).then((error) => {
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

    const handleAgree = () => {
        if (dialogText == 'Are you sure you want to delete this request?') {
            requestService.deleteRequest(requestId).then((res) => {
                if (res.data) {
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
        } else if (dialogText == 'Are you sure you want to approve this request?') {
            requestService.approveRequest(requestId).then((res) => {
                if (res.data != null) {
                    toaster.push(
                        <Message showIcon type="success">
                            Successfully approved request!
                        </Message>,
                        { placement: 'topEnd' }
                    );
                    createNotification();
                    navigate('/');
                } else {
                    toaster.push(
                        <Message showIcon type="error" closable>
                            Error while approving request
                        </Message>,
                        { placement: 'topEnd' }
                    );
                }
            });
        } else {
            requestService.declineRequest(requestId).then((res) => {
                if (res.data) {
                    toaster.push(
                        <Message showIcon type="success">
                            Successfully declined request!
                        </Message>,
                        { placement: 'topEnd' }
                    );
                    navigate('/');
                } else {
                    toaster.push(
                        <Message showIcon type="error" closable>
                            Error while declining request
                        </Message>,
                        { placement: 'topEnd' }
                    );
                }
            });
        }
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">User </TableCell>
                            <TableCell align="center">Date from </TableCell>
                            <TableCell align="center">Date to</TableCell>
                            <TableCell align="center">Accomodation </TableCell>
                            <TableCell align="center">Number of guests</TableCell>
                            <TableCell align="center">Status</TableCell>
                            {isByGuest ? (
                                <TableCell align="center">Delete </TableCell>
                            ) : (
                                <TableCell align="center">Number of cancelation</TableCell>
                            )}
                            {!isByGuest ? (
                                <TableCell align="center">Approve/Reject </TableCell>
                            ) : (
                                ''
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.dateFrom}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" align="center">
                                    {row.username}
                                </TableCell>
                                <TableCell component="th" align="center">
                                    {row.dateFrom}
                                </TableCell>
                                <TableCell component="th" align="center">
                                    {row.dateTo}
                                </TableCell>
                                <TableCell component="th" align="center">
                                    {row.accomodationName}
                                </TableCell>
                                <TableCell component="th" align="center">
                                    {row.guestNumber}
                                </TableCell>
                                <TableCell component="th" align="center">
                                    {row.requestStatus}
                                </TableCell>
                                {!isByGuest ? (
                                    <TableCell component="th" align="center">
                                        {row.canceledNumber}
                                    </TableCell>
                                ) : row.requestStatus == 'PENDING' ? (
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
                                                    row.username
                                                );
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                ) : (
                                    <Button disabled>Delete</Button>
                                )}

                                {!isByGuest ? (
                                    <TableCell component="th" align="center">
                                        <Button
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                handleOpen(
                                                    'Are you sure you want to approve this request?',
                                                    row.id
                                                );
                                            }}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            color="warning"
                                            onClick={() => {
                                                handleOpen(
                                                    'Are you sure you want to rejuct this request?',
                                                    row.id
                                                );
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                ) : (
                                    ''
                                )}
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
export default RequestTable;
