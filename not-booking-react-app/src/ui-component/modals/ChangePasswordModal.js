// material-ui
import { useTheme } from "@mui/material/styles";
import useScriptRef from "../../hooks/useScriptRef";
import Modal, {
  useModalState,
  modalAnimation,
} from "react-simple-modal-provider";
import "./modal.scss";
import { IconKey, IconX } from "@tabler/icons";
import UserService from "../../services/user.service";
import { useState } from "react";
import { Message } from "rsuite";
import { useToaster } from "rsuite/toaster";

import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePasswordModal = ({ children, others }) => {
  const toaster = useToaster();
  const [isOpen, setOpen] = useModalState();

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const scriptedRef = useScriptRef();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Modal
      id={"ChangePasswordModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}
      duration={250}
      animation={modalAnimation.scaleUp}
      draggable={false}
    >
      <div className="custom-modal">
        <div className="custom-x-button-modal">
          <button
            type="button"
            className="custom-x-button"
            onClick={() => setOpen(false)}
          >
            <IconX />
          </button>
        </div>
        <div className="flex-disp">
          <div className="custom-modal-icon">
            <IconKey className="custom-icon" />
          </div>
          <div className="custom-text-modal">
            <h3 className="custom-text">Change Password</h3>
          </div>
        </div>
        <div className="flex-disp" style={{ justifyContent: "center" }}>
          <>
            <Formik
              initialValues={{
                oldPass: "",
                newPass: "",
                submit: null,
              }}
              validationSchema={Yup.object().shape({
                oldPass: Yup.string()
                  .max(255)
                  .required("Old Password is required"),
                newPass: Yup.string()
                  .max(255)
                  .required("New Password is required"),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  UserService.changePassword(
                    values.oldPass,
                    values.newPass
                  ).then(
                    (response) => {
                      toaster.push(
                        <Message showIcon type="success">
                          {response.data}
                        </Message>,
                        { placement: "topEnd" }
                      );
                      setOpen(false);
                    },
                    (error) => {
                      toaster.push(
                        <Message showIcon type="error" closable>
                          {error.response.data}
                        </Message>,
                        { placement: "topEnd" }
                      );

                      setStatus({ success: false });
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
                        error={Boolean(touched.oldPass && errors.oldPass)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-oldPass">
                          Old Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-oldPass"
                          type={showOldPassword ? "text" : "password"}
                          value={values.oldPass}
                          name="oldPass"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowOldPassword}
                                onMouseDown={handleMouseDownOldPassword}
                                edge="end"
                                size="large"
                              >
                                {showOldPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Old Password"
                          inputProps={{}}
                        />
                        {touched.oldPass && errors.oldPass && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-oldPass"
                          >
                            {errors.oldPass}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.newPass && errors.newPass)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-newPass">
                          New Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-newPass"
                          type={showNewPassword ? "text" : "password"}
                          value={values.newPass}
                          name="newPass"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowNewPassword}
                                onMouseDown={handleMouseDownNewPassword}
                                edge="end"
                                size="large"
                              >
                                {showNewPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="New Password"
                          inputProps={{}}
                        />
                        {touched.newPass && errors.newPass && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-newPass"
                          >
                            {errors.newPass}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <div style={{ textAlignLast: "right" }}>
                    <button
                      className="ok-button"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      type="button"
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
