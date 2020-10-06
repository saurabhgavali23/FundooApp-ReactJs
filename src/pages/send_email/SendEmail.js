import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { sendEmail } from "../../services/userServices";
import styles from "./SendEmailStyles";

const SendEmail2 = ({ openSnackBar }) => {
  const classes = styles();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);

  const validateEmailAddress = () => {
    const regexp3 = /^[a-zA-Z]+[.+-]?[a-zA-Z0-9]+[@][a-zA-Z]{3,}[.][a-z]{2,4}[.]?[a-zA-Z]*[.,]?$/;
    if (!regexp3.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleData = () => {
    if (email !== undefined) {
      let data = {
        email: email,
      };
      sendEmail(data)
        .then((res) => {
          if (res.status === 200) {
            openSnackBar("Email Sent Successfully");
          }
        })
        .catch((err) => {
          openSnackBar("Faild Sent Email");
        });
    } else {
      openSnackBar("Email Id required");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.loginContainer}>
        <Box boxShadow={3}>
          <Box className={classes.title}>FundooApp</Box>
          <Box className={classes.title2}>Send Email</Box>
          <form className={classes.formDivLogin}>
            <div className={classes.inputContainer}>
              <TextField
                placeholder="Email"
                className={classes.emailInput}
                onBlur={validateEmailAddress}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? "Invalid Email" : null}
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

export default SendEmail2;
