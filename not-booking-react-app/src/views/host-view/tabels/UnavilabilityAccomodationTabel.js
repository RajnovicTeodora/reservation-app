import * as React from 'react';
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
import {
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import unavilailityService from '../../../services/UnavilabilityService';
import { useNavigate } from 'react-router-dom';
import useScriptRef from '../../../hooks/useScriptRef';

const UnavilabilityAccomodationTabel = ({ ...others }) => {

  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [rows, setRows] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  let navigate = useNavigate();
  const scriptedRef = useScriptRef();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await unavilailityService.getListUnavilabilityByAccomodationId();
        console.log(response);
        setRows(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };


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
      accomodationId:'648ebee63073a2143b4f95bf'
      }
      const request = unavilailityService.createUnavilability(newUnavilability).then(
        () => {
          navigate("/main");
          window.location.reload();
        },
        (error) => {
          console.log(error);
          const resMessage = error.response.data;
          console.log(resMessage)
        }
      );
    } catch (err) {
      if (scriptedRef.current) {
        console.log(err.message)
      }
    }
    setOpen(false);
  };

  return (
    <>
    <h2>Unavilability for accomodation</h2>
    
    <Button startIcon={<AddIcon />} onClick={handleClickOpen}>Input dates when accomodation is unavilable</Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" >Date from </TableCell>
            <TableCell align="center" >Date to</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.dateFrom}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">{row.startDate}</TableCell>
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
            <OutlinedInput type="date" onChange={(value)=>setStartDate(value['target'].value)}/>
            <InputLabel htmlFor="outlined-adornment-city">End date</InputLabel>
            <OutlinedInput type="date" onChange={(value)=>setEndDate(value['target'].value)}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
export default UnavilabilityAccomodationTabel;