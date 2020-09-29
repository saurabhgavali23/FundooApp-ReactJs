import { Button, Grid, Link, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import "../registration/registerCss.css";
import { userRegistration } from '../services/userServices';

const Registration = ({openSnackBar}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState()
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const history = useHistory();

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

  const confirmPasswordValidation = () =>{
      if(confirmPassword!==password){
        setIsEnabled(false)
        setConfirmPasswordError(true)
      }else{
          setIsEnabled(true)
          setConfirmPasswordError(false) 
      }
  }

  const handleData = () => {
    
    if(firstName && lastName && email && password !== null){
      let data={
        firstName: firstName,
        lastName: lastName,
        service: "advance",
        email: email,
        password: password
      }
      userRegistration(data).then(res=>{
        if(res.status===422){
          openSnackBar("User Already Register")
        }else{
        openSnackBar(res.data.data.message)
        history.push('/');
        }
      }).catch(err=>{
        openSnackBar('Registration Faild')
      })
    }else{
      openSnackBar('All Fields are Required')
    }
  };

  return (
    <div className="container">
      <div className="formDiv">
        <div className="fundooTitle">FundooApp</div>
        <div className="signInTitle">Registration</div>
          <div className="inputDiv">
         <div className="firstAndLastNameContainer">
          <TextField
              className="firstAndLastName"
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
              placeholder="Email Id"
              style={{marginBottom: '5%'}}
              onBlur={validateEmailAddress}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={emailError}
              helperText={emailError?'Invalid Email':null}
            />
            <TextField
              type="password"
              placeholder="Password"
              style={{marginBottom: '5%'}}
              onBlur={passwordValidation}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={passwordError}
              helperText={passwordError?'Invalid Password':null}
            />
            <TextField
              type="password"
              placeholder="Confirm Password"
              style={{marginBottom: '5%'}}
              onBlur={confirmPasswordValidation}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={confirmPasswordError}
              helperText={confirmPasswordError?'Password Mismatch':null}
            />
          </div>
          <div className="buttonDiv">
            <Button variant="contained" color='primary'
            disabled={isEnabled?false:true}
              onClick={handleData}
            >Register</Button>
          </div>
          <Grid container className="loginAnchor">
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

export default Registration;

