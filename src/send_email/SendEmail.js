import { Button, Grid, Link, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { sendEmail } from "../services/userServices";
import "./SendEmailCss.css";

const SendEmail = ({openSnackBar}) => {
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
    if(email!==null){
      let data={
        email: email
      }
      sendEmail(data).then(res=>{
        if(res.status===200){
          openSnackBar('Email Sent Successfully')
        }
      }).catch(err=>{
        openSnackBar('Faild Sent Email')
      })
    }else{
      openSnackBar('Email Id required')
    }
  };

  return (
    <div className="container">
      <div className="formDiv1">
        <div className="fundooTitle">FundooApp</div>
        <div className="signInTitle">Enter your recovery email</div>
          <div className="emailInputDiv">
            <TextField
              placeholder="Email Id"
              onBlur={validateEmailAddress}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError?'Invalid Email':null}
              required
            />
            </div>
          <div className="buttonDiv">
            <Button variant="contained" className="button1" 
            onClick={handleData}>Submit</Button>
          </div>
          <Grid container className="resetAnchor">
            <Grid item xs >
                <Link href="/login" variant="body2">
                    SignIn
                </Link>
            </Grid>
          </Grid>
      </div>
    </div>
  );
};

export default SendEmail;
