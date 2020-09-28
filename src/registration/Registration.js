import React, { useState } from 'react'
import "../registration/registerCss.css";

const Registration = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState()
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [confirmPasswordText, setConfirmPasswordText] = useState('')

  const validateEmailAddress = () => {
    const regexp3 = /^[a-zA-Z]+[.+-]?[a-zA-Z0-9]+[@][a-zA-Z]{3,}[.][a-z]{2,4}[.]?[a-zA-Z]*[.,]?$/;
    if (!regexp3.test(email)) {
      setEmailError(true);
      setEmailText("Invalid Email Id");
    } else {
      setEmailError(false);
      setEmailError("");
    }
  };

  const passwordValidation = () => {
    var passReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if (!passReg.test(password)) {
      setPasswordError(true);
      setPasswordText("Invalid Password");
    } else {
      setPasswordError(false);
    }
  };

  const confirmPasswordValidation = () =>{
      if(confirmPassword!==password){
        setConfirmPasswordError(true)
        setConfirmPasswordText("Password dose not match")
      }else{
          setConfirmPasswordError(false)
          setConfirmPasswordText('')
      }
  }

  const handleData = () => {
    
  };

  return (
    <div className="container">
      <div className="formDiv">
        <div className="fundooTitle">FundooApp</div>
        <div className="signInTitle">Registration</div>
        <form onSubmit={handleData}>
          <div className="inputDiv">
         <div className="firstAndLastNameContainer">
         <input
            className="firstAndLastName"
              placeholder="FirstName"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
             <input
             className="firstAndLastName"
              placeholder="LastName"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
         </div>
            <input
              placeholder="Email Id"
              className="input"
              onBlur={validateEmailAddress}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError ? <div className="inputError">{emailText}</div> : null}
            <input
              type="password"
              placeholder="Password"
              className="input"
              onBlur={passwordValidation}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError ? <div className="inputError">{passwordText}</div> : null}
            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
              onBlur={confirmPasswordValidation}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPasswordError ? <div className="inputError">{confirmPasswordText}</div> : null}
          </div>
          <div className="buttonDiv">
            <input type="submit" value="Register" className="button" />
          </div>
          <div className="anchor">
            <a href="/">SignIn</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;

