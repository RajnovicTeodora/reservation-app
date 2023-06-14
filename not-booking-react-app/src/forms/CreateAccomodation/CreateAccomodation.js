// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Switch 
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../hooks/useScriptRef';
import AnimateButton from '../../ui-component/extended/AnimateButton';

//services
import accomoddationService from '../../services/AccomoddationService';
import {useState} from 'react';
const CreateAccomodation = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedPhotos(files);
  };

  return (
    <>

      <Formik
        initialValues={{
          name: '',
          maxGuest: -1,
          minGuest: -1,
          automaticApproal: true,
          benefits: "",
          street: "",
          number: "",
          city: "",
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().min(2).required('Name is required'),
          maxGuest: Yup.number().max(100).min(1).required('Maximum guest number is required'),
          street: Yup.string().required('Street is required'),
          city: Yup.string().required('City is required'),
          number: Yup.string().required('Number is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          
          try {
            selectedPhotos.forEach((photo, index) => {
               let fileReader = new FileReader();
               fileReader.readAsDataURL(photo);
               fileReader.onload = (event) => {
               listPhotos.push(event.target.result);      
              }
             
            });
            const newAccomodation = { 
            name: values.name,
            maxGuest: values.maxGuest,
            minGuest: values.minGuest,
            automaticApproal: values.automaticApproal,
            benefits: values.benefits,
            listPhotos:listPhotos,
            addres: {
              street: values.street,
              number: values.number,
              city: values.city}
            }
            const request = accomoddationService.createAccomodation(newAccomodation); 
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
            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-name">Name of accomodation</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Name of accomodation"
                inputProps={{}}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="standard-weight-helper-text-name">
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <br/>
            <FormControl fullWidth error={Boolean(touched.maxGuest && errors.maxGuest)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-maxGuest">Maximum number of guests</InputLabel>
              <OutlinedInput
                id="outlined-adornment-maxGuest"
                type="number"
                value={values.maxGuest}
                name="maxGuest"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Maximum number of guests"
                inputProps={{}}
              />
              {touched.maxGuest && errors.maxGuest && (
                <FormHelperText error id="standard-weight-helper-textmaxGuest">
                  {errors.maxGuest}
                </FormHelperText>
              )}
            </FormControl>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <br/>
            <FormControl fullWidth error={Boolean(touched.minGuest && errors.minGuest)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-maxGuest">Minimum number of guests</InputLabel>
              <OutlinedInput
                id="outlined-adornment-minGuest"
                type="number"
                value={values.minGuest}
                name="minGuest"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Minimum number of guests"
                inputProps={{}}
              />
              {touched.minGuest && errors.minGuest && (
                <FormHelperText error id="standard-weight-helper-text-minGuest">
                  {errors.minGuest}
                </FormHelperText>
              )}
            </FormControl>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <br/>
            <FormControl fullWidth error={Boolean(touched.automaticApproal && errors.automaticApproal)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-automaticApproal">Automatic approval</InputLabel>
              <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
              <br/><br/>
              <Switch
                id="outlined-adornment-automaticApproal"
                value={values.automaticApproal}
                name="automaticApproal"
                onChange={handleChange}
                label="Automatic approal"
                inputProps={{}}
              />
              {touched.automaticApproal && errors.automaticApproal && (
                <FormHelperText error id="standard-weight-helper-text-automaticApproal">
                  {errors.automaticApproal}
                </FormHelperText>
              )}
            </FormControl>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <br/>
            <FormControl fullWidth error={Boolean(touched.benefits && errors.benefits)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-benefits">Benefits of accomodation</InputLabel>
              <OutlinedInput
                id="outlined-adornment-benefits"
                type="text"
                value={values.benefits}
                name="benefits"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Benefits of accomodation"
                inputProps={{}}
              />
              {touched.benefits && errors.benefits && (
                <FormHelperText error id="standard-weight-helper-text-benefits">
                  {errors.benefits}
                </FormHelperText>
              )}
            </FormControl>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <br/>
            <FormControl fullWidth error={Boolean(touched.street && errors.street)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-street">street of accomodation</InputLabel>
              <OutlinedInput
                id="outlined-adornment-street"
                type="text"
                value={values.street}
                name="street"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Street"
                inputProps={{}}
              />
              {touched.street && errors.street && (
                <FormHelperText error id="standard-weight-helper-text-street">
                  {errors.street}
                </FormHelperText>
              )}
            </FormControl>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <br/>
            <FormControl fullWidth error={Boolean(touched.number && errors.number)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-number">Number in street</InputLabel>
              <OutlinedInput
                id="outlined-adornment-number"
                type="text"
                value={values.number}
                name="number"
                onBlur={handleBlur}
                onChange={handleChange}
                label="number"
                inputProps={{}}
              />
              {touched.number && errors.number && (
                <FormHelperText error id="standard-weight-helper-text-number">
                  {errors.number}
                </FormHelperText>
              )}
            </FormControl>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <br/>
            <FormControl fullWidth error={Boolean(touched.city && errors.city)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-city">City</InputLabel>
              <OutlinedInput
                id="outlined-adornment-city"
                type="text"
                value={values.city}
                name="city"
                onBlur={handleBlur}
                onChange={handleChange}
                label="city"
                inputProps={{}}
              />
              {touched.city && errors.city && (
                <FormHelperText error id="standard-weight-helper-text-city">
                  {errors.city}
                </FormHelperText>
              )}
            </FormControl>

             <input type="file" multiple onChange={handleFileChange} />

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
    </>
  );
};

export default CreateAccomodation;
