import React, { useState } from "react";
import "./ResetPasswordCss.css";

const ResetPassword = () => {
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);
  const [emailText, setEmailText] = useState("");

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

  const handleData = () => {
  };

  return (
    <div className="container">
      <div className="formDiv1">
        <div className="fundooTitle">FundooApp</div>
        <div className="signInTitle">Enter your recovery email</div>
        <form onSubmit={handleData}>
          <div className="emailInputDiv">
            <input
              placeholder="Email Id"
              className="emailInput1"
              onBlur={validateEmailAddress}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError ? <div className="inputError">{emailText}</div> : null}
            </div>
          <div className="buttonDiv">
            <input type="submit" value="Submit" className="button1" />
          </div>
          <div className="anchor">
            <a href="/">SignIn</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
