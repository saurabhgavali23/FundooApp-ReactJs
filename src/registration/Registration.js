import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { userRegistration } from "../services/userServices";
import styles from "./RegistrationStyle";

const Registration2 = ({ openSnackBar }) => {
  const classes = styles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const validateEmailAddress = () => {
    const regexp3 = /^[a-zA-Z]+[.+-]?[a-zA-Z0-9]+[@][a-zA-Z]{3,}[.][a-z]{2,4}[.]?[a-zA-Z]*[.,]?$/;
    if (!regexp3.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const passwordValidation = () => {
    var passReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if (!passReg.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const confirmPasswordValidation = () => {
    if (confirmPassword !== password) {
      setIsEnabled(false);
      setConfirmPasswordError(true);
    } else {
      setIsEnabled(true);
      setConfirmPasswordError(false);
    }
  };

  const handleData = () => {
    if (firstName && lastName && email && password !== undefined) {
      let data = {
        firstName: firstName,
        lastName: lastName,
        service: "advance",
        email: email,
        password: password,
      };
      userRegistration(data)
        .then((res) => {
          if (res.status === 422) {
            openSnackBar("User Already Register");
          } else {
            openSnackBar(res.data.data.message);
          }
        })
        .catch((err) => {
          openSnackBar("Registration Faild");
        });
    } else {
      openSnackBar("All Fields are Required");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.loginContainer}>
        <Box boxShadow={3}>
          <Box className={classes.title}>FundooApp</Box>
          <Box className={classes.titleRegister}>Registration</Box>
          <form className={classes.formDivLogin}>
            <div className={classes.inputContainer}>
              <div className={classes.firstAndLastNameContainer}>
                <TextField
                  className={classes.firstAndLastName}
                  placeholder="FirstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <TextField
                  className="firstAndLastName"
                  placeholder="LastName"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <TextField
                placeholder="Email"
                className={classes.emailInput}
                onBlur={validateEmailAddress}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? "Invalid Email" : null}
              />
              <TextField
                className={classes.passwordInput}
                placeholder="Password"
                type="password"
                onBlur={passwordValidation}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError ? "Invalid Password" : null}
              />
              <TextField
                type="password"
                placeholder="Confirm Password"
                className={classes.passwordInput}
                style={{ marginBottom: "5%" }}
                onBlur={confirmPasswordValidation}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                error={confirmPasswordError}
                helperText={confirmPasswordError ? "Password Mismatch" : null}
              />
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isEnabled ? false : true}
                  onClick={handleData}
                >
                  Register
                </Button>
              </div>
            </div>
            <Grid container className={classes.link}>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  SignIn
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </Container>
  );
};

export default Registration2;
