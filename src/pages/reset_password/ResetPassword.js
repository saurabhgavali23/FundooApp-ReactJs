import {
  Button,
  Grid,
  Link,
  TextField,
  Box,
  Container,
} from "@material-ui/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../services/userServices";
import styles from "./ResetPasswordStyle";

const ResetPassword2 = ({ openSnackBar }) => {
  const classes = styles();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const resetToken = useParams();

  const passwordValidation = () => {
    var passReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if (!passReg.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const confirmPasswordValidation = () => {
    if (confirmPassword === password) {
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(true);
    }
  };

  const handleData = () => {
    let token = resetToken.token;
    if (password !== undefined && confirmPassword === password) {
      let formData = new FormData();
      formData.append("newPassword", password);
      resetPassword(formData, token)
        .then((res) => {
          if (res.status === 200) {
            openSnackBar("Password Change Successfully");
          }
        })
        .catch((err) => {
          openSnackBar("Failed To Reset");
        });
    } else {
      openSnackBar("Password required");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.loginContainer}>
        <Box boxShadow={3}>
          <Box className={classes.title}>FundooApp</Box>
          <Box className={classes.title2}>Reset Password</Box>
          <form className={classes.formDivLogin}>
            <div className={classes.inputContainer}>
              <TextField
                placeholder="New Password"
                onBlur={passwordValidation}
                className={classes.passwordInput}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError ? "Invalid Password" : null}
                required
              />
              <TextField
                placeholder="Confirm Password"
                className={classes.passwordInput}
                onBlur={confirmPasswordValidation}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPasswordError}
                helperText={confirmPasswordError ? "Password MissMatch" : null}
                required
              />
            </div>
            <div className={classes.button}>
              <Grid container className={classes.link}>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    SignIn
                  </Link>
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" onClick={handleData}>
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </Container>
  );
};

export default ResetPassword2;
