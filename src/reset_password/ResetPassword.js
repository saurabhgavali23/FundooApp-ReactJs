import React, { useState } from "react";
import { sendEmail } from "../services/userServices";
import "./ResetPasswordCss.css";

const ResetPassword = ({openSnackBar}) => {
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
            <input type="submit" value="Submit" className="button1" 
            onClick={handleData}/>
          </div>
          <div className="anchor">
            <a href="/">SignIn</a>
          </div>
      </div>
    </div>
  );
};

export default ResetPassword;
