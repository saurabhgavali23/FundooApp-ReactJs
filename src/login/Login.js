import { Box, Button, Container, Grid, Input, Link } from "@material-ui/core";
import React, { useState } from "react";
import styles from "./loginStyles";
import { login } from "../services/userServices";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

const Login2 = ({ openSnackBar }) => {
  const classes = styles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmailAddress = () => {
    const regexp3 = /^[a-zA-Z]+[.+-]?[a-zA-Z0-9]+[@][a-zA-Z]{3,}[.][a-z]{2,4}[.]?[a-zA-Z]*[.,]?$/;
    if (!regexp3.test(email)) {
      setEmailError(true);
      setEmailText("Invalid Email");
    } else {
      setEmailError(false);
      setEmailText("");
    }
  };

  const passwordValidation = () => {
    var passReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if (!passReg.test(password)) {
      setPasswordError(true);
      setPasswordText("Invalid Password");
    } else {
      setPasswordError(false);
      setPasswordText("");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleData = () => {
    if (email !== undefined && password !== undefined) {
      let data = {
        email: email,
        password: password,
      };
      login(data)
        .then((res) => {
          if (res.status === 401) {
            openSnackBar("UnAuthorized User");
          }
          let userEmail = res.data.email
          let userToken = res.data.id;
          let userId = res.data.userId;
          localStorage.setItem("userToken", userToken);
          localStorage.setItem("userId", userId);
          localStorage.setItem("userEmail", userEmail)
          openSnackBar("Login Successfull");
        })
        .catch((err) => {
          openSnackBar("Login Faild");
        });
    } else {
      openSnackBar("All Fields are Requred");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.loginContainer}>
        <Box boxShadow={3}>
          <Box className={classes.title}>FundooApp</Box>
          <Box className={classes.title2}>SignIn</Box>
          <form className={classes.formDivLogin}>
            <div className={classes.inputContainer}>
              <div className={classes.emailContainer}>
                <Input
                  placeholder="Email"
                  className={classes.emailInput}
                  onBlur={validateEmailAddress}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                />
                <div className={classes.inputError}>
                  {emailError ? emailText : null}
                </div>
              </div>
              <div className={classes.passwordContainer}>
                <Input
                  className={classes.passwordInput}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  onBlur={passwordValidation}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="password"
                        onClick={() => handleClickShowPassword()}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelwidth={80}
                />
                <div className={classes.inputError}>
                  {passwordError ? passwordText : null}
                </div>
              </div>
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleData}
                >
                  Login
                </Button>
              </div>
            </div>
            <Grid container className={classes.link}>
              <Grid item xs>
                <Link href="/send-email" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </Container>
  );
};

export default Login2;
