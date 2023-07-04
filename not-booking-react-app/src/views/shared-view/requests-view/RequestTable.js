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
const RequestTable = ({ rows, isByGuest }) => {
    //ide ili po accomodation-u ili po useru, mogu vise njih da ga koriste
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [requestId, setRequestId] = useState('');

    const handleOpen = (text, id) => {
        setRequestId(id);
        setDialogText(text);
        setOpen(true);
    };

    const handleAgree = () => {
        if (dialogText == 'Are you sure you want to delete this request?') {
            requestService.deleteRequest(requestId).then((res) => {
                if (res.data) {
                    navigate('/');
                }
                //todo neka poruka
            });
        } else if (dialogText == 'Are you sure you want to approve this request?') {
            requestService.approveRequest(requestId).then((res) => {
                if (res.data != null) {
                    navigate('/'); //todo mozda negde drugo
                }
                //todo neka poruka
            });
        } else {
            requestService.declineRequest(requestId).then((res) => {
                if (res.data) {
                    navigate('/');
                }
                //todo neka poruka
            });
            //reject approve drugi feature
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
                                                    row.id
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
