import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, OutlinedInput } from '@mui/material';
import unavilailityService from '../../../services/UnavilabilityService';
//import { useNavigate } from 'react-router-dom';
import useScriptRef from '../../../hooks/useScriptRef';
import { useState, useEffect } from 'react';
import { useToaster } from 'rsuite/toaster';
import { Message } from 'rsuite';

const UnavilabilityAccomodationTabel = () => {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [rows, setRows] = useState([]);
    const scriptedRef = useScriptRef();
    const toaster = useToaster();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await unavilailityService.getListUnavilabilityByAccomodationId();
                if (response.code !== 'ERR_NETWORK') {
                    setRows(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAdd = () => {
        try {
            const newUnavilability = {
                startDate: startDate,
                endDate: endDate,
                accomodationId: localStorage.accommodationId,
            };
            unavilailityService.createUnavilability(newUnavilability).then(
                (resp) => {
                    if (resp.status === 200) {
                        toaster.push(
                            <Message showIcon type="success">
                                Successfully created unavilability!
                            </Message>,
                            { placement: 'topEnd' }
                        );
                        window.location.reload();
                    } else {
                        toaster.push(
                            <Message showIcon type="error">
                                Couldnt creat unavilability!
                            </Message>,
                            { placement: 'topEnd' }
                        );
                    }
                },
                () => {
                    toaster.push(
                        <Message showIcon type="error">
                            There is error while creating unavilability!
                        </Message>,
                        { placement: 'topEnd' }
                    );
                }
            );
        } catch (err) {
            if (scriptedRef.current) {
                toaster.push(
                    <Message showIcon type="error">
                        {err}
                    </Message>,
                    { placement: 'topEnd' }
                );
            }
        }
        setOpen(false);
    };

    return (
        <>
            <h2>Unavilability for accomodation</h2>

            <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
                Input dates when accomodation is unavilable
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Date from </TableCell>
                            <TableCell align="center">Date to</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.dateFrom}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.startDate}
                                </TableCell>
                                <TableCell align="center">{row.endDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Input date from when is unavilable and date to.
                    </DialogContentText>

                    <div>
                        <InputLabel htmlFor="outlined-adornment-city">Start date</InputLabel>
                        <OutlinedInput
                            type="date"
                            onChange={(value) => setStartDate(value['target'].value)}
                        />
                        <InputLabel htmlFor="outlined-adornment-city">End date</InputLabel>
                        <OutlinedInput
                            type="date"
                            onChange={(value) => setEndDate(value['target'].value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default UnavilabilityAccomodationTabel;
