import { Button, Grid, Link, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { resetPassword } from "../services/userServices";
import "./ResetPasswordCss.css";

const ResetPassword = ({openSnackBar}) => {
 const [password, setPassword] = useState()
 const [passwordError, setPasswordError] = useState(false)
 const [confirmPassword, setConfirmPassword] = useState()
 const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const passwordValidation = () => {
    var passReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if (!passReg.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const confirmPasswordValidation = () =>{
      console.log("password", password, confirmPassword);
    if(confirmPassword===password){
        setConfirmPasswordError(false)
    }else{
    setConfirmPasswordError(true)
    }
  }

  const handleData = () => {
    if(password!==null && confirmPassword===password){
      const formData = new FormData()
      formData.append('newPassword', password)
      resetPassword(formData).then(res=>{
          console.log("response", res);
        if(res.status===200){
          openSnackBar('Email Sent Successfully')
        }
      }).catch(err=>{
        openSnackBar('Faild Sent Email')
      })
    }else{
      openSnackBar('Password required')
    }
  };

  return (
    <div className="container">
      <div className="formDiv1">
        <div className="fundooTitle">FundooApp</div>
        <div className="signInTitle">Reset Password</div>
          <div className="emailInputDiv">
            <TextField
              placeholder="New Password"
              onBlur={passwordValidation}
              style={{marginBottom: '5%'}}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError?'Invalid Password':null}
              required
            />
            <TextField
              placeholder="Confirm Password"
              onBlur={confirmPasswordValidation}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError}
              helperText={confirmPasswordError?'Password MissMatch':null}
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

export default ResetPassword;
