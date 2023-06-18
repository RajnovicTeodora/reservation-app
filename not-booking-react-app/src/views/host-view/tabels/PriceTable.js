import React, { useState, useEffect } from 'react';
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import useScriptRef from '../../../hooks/useScriptRef';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import priceService from '../../../services/PriceService';

const PriceTable = ({ ...others }) => {
  const theme = useTheme();
  let navigate = useNavigate();
  const scriptedRef = useScriptRef();

  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('PER_GUEST');
  const [startDate, setStartDate] = React.useState();
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await priceService.getListPricesByAccomodationId();
        setRows(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  const handleChange = (date) => {
    setStartDate(date);
    console.log(date);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <h2>Prices for accomodation</h2>
    
    <Button startIcon={<AddIcon />} onClick={handleClickOpen}>New pricee</Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" >Date from </TableCell>
            <TableCell align="center" >Date to</TableCell>
            <TableCell align="center" >Price </TableCell>
            <TableCell align="center" >Paying per</TableCell>
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
              <TableCell component="th" scope="row" align="center">{row.price}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input new price. 
          </DialogContentText>
          <Formik
            initialValues={{
              status: "PER_GUEST",
              price: 0,
            }}
            validationSchema={Yup.object().shape({
              price: Yup.number().min(0).required('Price is required'),
              
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              
              try {
                if(!status){
                  setStatus('PER_GUEST');
                }
                const newPrice = { 
                startDate: startDate,
                status: status,
                price: values.price,
                accomodationId: "1"
                }
                console.log(startDate)
                const request = priceService.createPrice(newPrice).then(
                  () => {
                    navigate("/main");
                    window.location.reload();
                  },
                  (error) => {
                    console.log(error);
                    const resMessage = error.response.data;

                    setStatus({ success: false });
                    setErrors({ submit: resMessage });
                    setSubmitting(false);
                  }
                );


                if (scriptedRef.current) {
                  setStatus({ success: true });
                  setSubmitting(false);
                }
              } catch (err) {
                console.error(err);
                if (scriptedRef.current) {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }
            }}
          >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others} >
            <InputLabel htmlFor="outlined-adornment-city">Start date</InputLabel>
            <OutlinedInput type="date" onChange={(value)=>setStartDate(value['target'].value)}/>
            
            <br/>
            <FormControl>
            
            <FormLabel id="demo-radio-buttons-group-label">selects how to charge you</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="PER_GUEST"
              name="radio-buttons-group"
            >
              <FormControlLabel value="PER_GUEST" onClick={()=> setStatus("PER_GUEST")} control={<Radio />}  label="per guest" />
              <FormControlLabel value="PER_PLACE" onClick={()=> setStatus("PER_PLACE")} control={<Radio />} label="per place" />
            </RadioGroup>
            <FormControl fullWidth error={Boolean(touched.price && errors.price)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-price">price</InputLabel>
              <OutlinedInput
                id="outlined-adornment-price"
                type="number"
                value={values.price}
                name="price"
                onBlur={handleBlur}
                onChange={handleChange}
                label="price"
                inputProps={{}}
              />
              {touched.price && errors.price && (
                <FormHelperText error id="standard-weight-helper-textprice">
                  {errors.price}
                </FormHelperText>
              )}
            </FormControl>
          </FormControl>
          {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Save
                </Button>
              </AnimateButton>
            </Box>
          </form>
          )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
export default PriceTable;