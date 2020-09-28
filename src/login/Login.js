import React, { useState } from "react";
import "../login/loginCss.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const validateEmailAddress = () => {
    console.log("emailvalue", email);
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
    console.log("validatepassowrd", password);
    var passReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if (!passReg.test(password)) {
      setPasswordError(true);
      setPasswordText("Invalid Password");
    } else {
      setPasswordError(false);
    }
  };

  const handleData = () => {
    console.log("email", email);
    console.log("password", password);
  };

  return (
    <div className="container">
      <div className="formDiv">
        <div className="fundooTitle">FundooApp</div>
        <div className="signInTitle">SignIn</div>
        <form onSubmit={handleData}>
          <div className="inputDiv">
            <input
              placeholder="Email Id"
              className="emailInput"
              onBlur={validateEmailAddress}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError ? <div className="inputError">{emailText}</div> : null}
            <input
              type="password"
              placeholder="Password"
              className="passwordInput"
              onBlur={passwordValidation}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError ? <div className="inputError">{passwordText}</div> : null}
          </div>
          <div className="buttonDiv">
            <input type="submit" value="Login" className="button" />
          </div>
          <div className="anchor">
            <a href="/signUp">Create New Account</a>
            <a href="/signUp">Forgot Password</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
