import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import AuthCardWrapper from "../auth-forms/AuthCardWrapper";
import Logo from "../../../ui-component/Logo";

// project imports
import useScriptRef from "../../../hooks/useScriptRef";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import AuthService from "../../../services/auth.service";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = ({ ...others }) => {
  const theme = useTheme();
  let navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

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
              direction={matchDownSM ? "column-reverse" : "row"}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                  <Typography
                    color={theme.palette.secondary.main}
                    gutterBottom
                    variant={matchDownSM ? "h3" : "h2"}
                  >
                    Hi, Welcome Back
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="16px"
                    textAlign={matchDownSM ? "center" : "inherit"}
                  >
                    Enter your credentials to continue
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <>
              <Formik
                initialValues={{
                  email: "info@mailbase.com",
                  password: "123456",
                  submit: null,
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Must be a valid email")
                    .max(255)
                    .required("Email is required"),
                  password: Yup.string()
                    .max(255)
                    .required("Password is required"),
                })}
                onSubmit={async (
                  values,
                  { setErrors, setStatus, setSubmitting }
                ) => {
                  try {
                    AuthService.login(values.email, values.password).then(
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
                      error={Boolean(touched.email && errors.email)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="outlined-adornment-email-login">
                        Email Address
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Email Address"
                        inputProps={{}}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-email-login"
                        >
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel htmlFor="outlined-adornment-password-login">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password-login"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
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
                        label="Password"
                        inputProps={{}}
                      />
                      {touched.password && errors.password && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-password-login"
                        >
                          {errors.password}
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
                          Sign in
                        </Button>
                      </AnimateButton>
                    </Box>
                  </form>
                )}
              </Formik>
            </>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid item container direction="column" alignItems="center" xs={12}>
              <Typography
                component={Link}
                to="/register"
                variant="subtitle1"
                sx={{ textDecoration: "none" }}
              >
                Don&apos;t have an account?
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </AuthCardWrapper>
    </Grid>
  );
};

export default Login;
