import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AuthCardWrapper from '../auth-forms/AuthCardWrapper';
import Logo from '../../../ui-component/Logo';

// project imports
import useScriptRef from '../../../hooks/useScriptRef';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import AuthService from '../../../services/auth.service';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ================================|| AUTH3 - REGISTER  ||================================ //

const Register = ({ ...others }) => {
    const theme = useTheme();
    let navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const scriptedRef = useScriptRef();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                        <Link to="#">
                            <Logo />
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction={matchDownSM ? 'column-reverse' : 'row'}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid item>
                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                    <Typography
                                        color={theme.palette.secondary.main}
                                        gutterBottom
                                        variant={matchDownSM ? 'h3' : 'h2'}
                                    >
                                        Welcome To Registration
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                    username: '',
                                    name: '',
                                    surname: '',
                                    country: '',
                                    city: '',
                                    street: '',
                                    streetNum: '',
                                    role: '',
                                    submit: null,
                                }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string()
                                        .email('Must be a valid email')
                                        .max(255)
                                        .required('Email is required'),
                                    password: Yup.string()
                                        .max(255)
                                        .required('Password is required'),
                                    surname: Yup.string().max(255).required('Surname is required'),
                                    name: Yup.string().max(255).required('Name is required'),
                                    username: Yup.string()
                                        .max(255)
                                        .required('Username is required'),
                                    role: Yup.string().max(5).required('Role is required'),
                                    country: Yup.string().max(255).required('Country is required'),
                                    city: Yup.string().max(255).required('City is required'),
                                    street: Yup.string().max(255).required('Street is required'),
                                    streetNum: Yup.number()
                                        .min(1)
                                        .required('Street num is required'),
                                })}
                                onSubmit={async (
                                    values,
                                    { setErrors, setStatus, setSubmitting }
                                ) => {
                                    try {
                                        console.log(
                                            values.username,
                                            values.password,
                                            values.name,
                                            values.surname,
                                            values.email,
                                            values.role,
                                            values.country,
                                            values.city,
                                            values.street,
                                            values.streetNum
                                        );
                                        AuthService.register(
                                            values.username,
                                            values.password,
                                            values.name,
                                            values.surname,
                                            values.email,
                                            values.role,
                                            values.country,
                                            values.city,
                                            values.street,
                                            values.streetNum
                                        ).then(
                                            () => {
                                                navigate('/login');
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
                                        <Grid container spacing={matchDownSM ? 0 : 2}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.name && errors.name)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-name-register">
                                                        First Name
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-name-register"
                                                        name="name"
                                                        type="text"
                                                        value={values.name}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        inputProps={{}}
                                                    />
                                                    {touched.name && errors.name && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-name-register"
                                                        >
                                                            {errors.name}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(
                                                        touched.surname && errors.surname
                                                    )}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-surname-register">
                                                        Last Name
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-surname-register"
                                                        name="surname"
                                                        type="text"
                                                        value={values.surname}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        inputProps={{}}
                                                    />
                                                    {touched.surname && errors.surname && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-surname-register"
                                                        >
                                                            {errors.surname}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={matchDownSM ? 0 : 2}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.email && errors.email)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-email-register">
                                                        Email Address
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-email-register"
                                                        type="email"
                                                        value={values.email}
                                                        name="email"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        inputProps={{}}
                                                    />
                                                    {touched.email && errors.email && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text--register"
                                                        >
                                                            {errors.email}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(
                                                        touched.password && errors.password
                                                    )}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-password-register">
                                                        Password
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-password-register"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={values.password}
                                                        name="password"
                                                        label="Password"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={
                                                                        handleClickShowPassword
                                                                    }
                                                                    onMouseDown={
                                                                        handleMouseDownPassword
                                                                    }
                                                                    edge="end"
                                                                    size="large"
                                                                >
                                                                    {showPassword ? (
                                                                        <Visibility />
                                                                    ) : (
                                                                        <VisibilityOff />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        inputProps={{}}
                                                    />
                                                    {touched.password && errors.password && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-password-register"
                                                        >
                                                            {errors.password}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={matchDownSM ? 0 : 2}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(
                                                        touched.username && errors.username
                                                    )}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-username-register">
                                                        Username
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-username-register"
                                                        type="username"
                                                        value={values.username}
                                                        name="username"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        inputProps={{}}
                                                    />
                                                    {touched.username && errors.username && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text--register"
                                                        >
                                                            {errors.username}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.role && errors.role)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel
                                                        htmlFor="outlined-adornment-role-register"
                                                        style={{ display: 'contents' }}
                                                    >
                                                        User Type{' '}
                                                    </InputLabel>
                                                    <RadioGroup
                                                        id="outlined-adornment-role-register"
                                                        name="role"
                                                        onChange={handleChange}
                                                        value={values.role}
                                                        onBlur={handleBlur}
                                                        row
                                                    >
                                                        <FormControlLabel
                                                            value="HOST"
                                                            control={<Radio />}
                                                            label="Host"
                                                        />
                                                        <FormControlLabel
                                                            value="GUEST"
                                                            control={<Radio />}
                                                            label="Guest"
                                                        />
                                                    </RadioGroup>
                                                    {touched.role && errors.role && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text--register"
                                                        >
                                                            {errors.role}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid container spacing={matchDownSM ? 0 : 2}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(
                                                        touched.country && errors.country
                                                    )}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-country-register">
                                                        Country
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-country-register"
                                                        name="country"
                                                        type="text"
                                                        value={values.country}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        inputProps={{}}
                                                    />
                                                    {touched.country && errors.country && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-name-register"
                                                        >
                                                            {errors.country}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.city && errors.city)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-city-register">
                                                        City
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-city-register"
                                                        name="city"
                                                        type="text"
                                                        value={values.city}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        inputProps={{}}
                                                    />
                                                    {touched.city && errors.city && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-city-register"
                                                        >
                                                            {errors.city}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={matchDownSM ? 0 : 2}>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.street && errors.street)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-street-register">
                                                        Street Name
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-street-register"
                                                        name="street"
                                                        type="text"
                                                        value={values.street}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        inputProps={{}}
                                                    />
                                                    {touched.street && errors.street && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-street-register"
                                                        >
                                                            {errors.street}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(
                                                        touched.streetNum && errors.streetNum
                                                    )}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-streetNum-register">
                                                        Street Number
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-streetNum-register"
                                                        name="streetNum"
                                                        type="number"
                                                        value={values.streetNum}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        inputProps={{}}
                                                    />
                                                    {touched.streetNum && errors.streetNum && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-streetNum-register"
                                                        >
                                                            {errors.streetNum}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        {errors.submit && (
                                            <Box sx={{ mt: 3 }}>
                                                <FormHelperText error>
                                                    {errors.submit}
                                                </FormHelperText>
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
                                                    Sign up
                                                </Button>
                                            </AnimateButton>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                        </>
                    </Grid>
                </Grid>
            </AuthCardWrapper>
        </Grid>
    );
};

export default Register;
