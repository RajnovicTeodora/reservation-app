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
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../../hooks/useScriptRef';
import AnimateButton from '../../../ui-component/extended/AnimateButton';

//services
import requestService from '../../../services/RequestService';
// import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const CreateRequest = ({ ...others }) => {
    const theme = useTheme();
    let navigate = useNavigate();
    const scriptedRef = useScriptRef();

    return (
        <>
            <Formik
                initialValues={{
                    guestNumber: '',
                    dateFrom: '',
                    dateTo: '',
                }}
                validationSchema={Yup.object().shape({
                    guestNumber: Yup.number().max(100).min(1).required('Guest number is required'),
                    dateFrom: Yup.date().required('Date from is required'),
                    dateTo: Yup.date().required('Date to is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const newRequest = {
                            guestNumber: values.guestNumber,
                            requestStatus: 'PENDING',
                            isDeleted: false,
                            accomodationId: '1', //todo vezano za accomodation
                            dateFrom: values.dateFrom,
                            dateTo: values.dateTo,
                        };
                        requestService.createRequest(newRequest).then(
                            () => {
                                navigate('/main');
                                window.location.reload();
                            },
                            (error) => {
                                setStatus({ success: false });
                                setErrors({ submit: error.response.data });
                                setSubmitting(false);
                            }
                        );

                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
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
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.guestNumber && errors.guestNumber)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-guestNumber">
                                Number of guests
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-guestNumber"
                                type="number"
                                value={values.guestNumber}
                                name="guestNumber"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Number of guests"
                                inputProps={{}}
                            />
                            {touched.guestNumber && errors.guestNumber && (
                                <FormHelperText error id="standard-weight-helper-textguestNumber">
                                    {errors.guestNumber}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <br />
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-dateFrom">Date from</InputLabel>
                            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                            <br />
                            <br />
                            <OutlinedInput
                                id="outlined-adornment-dateFrom"
                                type="date"
                                value={values.dateFrom}
                                name="dateFrom"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.dateFrom && errors.dateFrom && (
                                <FormHelperText error id="standard-weight-helper-text-dateFrom">
                                    {errors.dateFrom}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <br />
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-dateTo">Date to</InputLabel>
                            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                            <br />
                            <br />
                            <OutlinedInput
                                id="outlined-adornment-dateTo"
                                type="date"
                                value={values.dateTo}
                                name="dateTo"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.dateTo && errors.dateTo && (
                                <FormHelperText error id="standard-weight-helper-text-dateTo">
                                    {errors.dateTo}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
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

export default CreateRequest;
