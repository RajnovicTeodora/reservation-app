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
import { useToaster } from 'rsuite/toaster';
import { Message } from 'rsuite';
import accomoddationService from '../../../services/AccomoddationService';
import UserService from '../../../services/user.service';
import NotificationService from '../../../services/notification.service';

const CreateRequest = ({ ...others }) => {
    const theme = useTheme();
    let navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const toaster = useToaster();

    const createNotification = (accomodationId) => {
        accomoddationService.getHostUsernameByAccId(accomodationId, false).then(
            (res) => {
                //TODO check
                UserService.checkNotification(res.data).then((response) => {
                    if (response.data.type1) {
                        NotificationService.createNotification(response.data.userId, 1).then(
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

    return (
        <>
            <h2>Creating requests</h2>
            <Formik
                initialValues={{
                    guestNumber: '',
                    dateFrom: '',
                    dateTo: '',
                    accomodationId: localStorage.accommodationId,
                    username: localStorage.user.split('username":"')[1].split('"')[0],
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
                            accomodationId: localStorage.accommodationId,
                            dateFrom: values.dateFrom,
                            dateTo: values.dateTo,
                            username: values.username,
                        };
                        requestService.createRequest(newRequest).then(
                            (resp) => {
                                if (resp.response.status === 200) {
                                    toaster.push(
                                        <Message showIcon type="success">
                                            Successfully created request!
                                        </Message>,
                                        { placement: 'topEnd' }
                                    );
                                    createNotification(newRequest.accomodationId);
                                    navigate('/main');
                                    window.location.reload();
                                } else {
                                    toaster.push(
                                        <Message showIcon type="error">
                                            Couldnt create request!
                                        </Message>,
                                        { placement: 'topEnd' }
                                    );
                                }
                            },
                            (error) => {
                                setStatus({ success: false });
                                setErrors({ submit: error.response.data });
                                setSubmitting(false);
                                const resMessage = error.response.data;
                                toaster.push(
                                    <Message showIcon type="error" closable>
                                        {resMessage}
                                    </Message>,
                                    { placement: 'topEnd' }
                                );
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
