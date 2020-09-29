import { Button, Grid, Input, Link } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../login/loginCss.css";
import { login } from "../services/userServices";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const Login = ({openSnackBar}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState(false);
  const [emailText, setEmailText] = useState('')
  const [passwordText, setPasswordText] = useState('')
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory();

  const validateEmailAddress = () => {
    const regexp3 = /^[a-zA-Z]+[.+-]?[a-zA-Z0-9]+[@][a-zA-Z]{3,}[.][a-z]{2,4}[.]?[a-zA-Z]*[.,]?$/;
    if (!regexp3.test(email)) {
      setEmailError(true);
      setEmailText('Invalid Email')
    } else {
      setEmailError(false);
      setEmailText("");
    }
  };

  const passwordValidation = () => {
    var passReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if (!passReg.test(password)) {
      setPasswordError(true);
      setPasswordText("Invalid Password")
    } else {
      setPasswordError(false);
      setPasswordText("")
    }
  };

 const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleData = () => {
    if(email!==null && password!==null){
      let data={
        email: email,
        password: password
      }
      login(data).then(res=>{
        if(res.status===401){
          openSnackBar("UnAuthorized User")
        }
        let userToken = res.data.id
        let userId = res.data.userId
        localStorage.setItem('userToken',userToken)
        localStorage.setItem('userId', userId)
        history.push('/dash-board')
       openSnackBar("Login Successfull")
      }).catch(err=>{
        openSnackBar("Login Faild")
      })
    }
  };

  return (
    <div className="container">
      <div className="formDivLogin">
        <div className="fundooTitle">FundooApp</div>
        <div className="signInTitle">SignIn</div>
          <div className="inputDiv1">
            <div className='emailContainer'>
            <Input
              className='emailInput'
              placeholder="Email Id"
              onBlur={validateEmailAddress}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />
            <div className="inputError">{emailError?emailText:null}</div>
            </div>
            <div className='passwordInput'>
            <Input
              id='password'
              type={showPassword?'text':'password'}
              placeholder="Password"
              onBlur={passwordValidation}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="password"
                        onClick={()=>handleClickShowPassword()}
                        edge="end"
                    >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
            labelWidth={80}
            />
            <div className="inputError">{passwordError?passwordText:null}</div>
            </div>
          </div>
          <div className="buttonDiv">
            <Button variant="contained" color="primary" onClick={handleData}>Login</Button>
          </div>
          <Grid container className="loginAnchor">
            <Grid item xs >
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
      </div>
    </div>
  );
};

export default Login;
