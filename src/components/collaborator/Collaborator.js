import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  InputBase,
} from "@material-ui/core";
import React, { useState } from "react";
import "./CollaboratorCss.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { searchUserDetails } from "../../services/userServices";
import CheckIcon from "@material-ui/icons/Check";

const Collaborator = ({ setCollabUser, setShowCard, setIsCollabModalOpen, item }) => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  let userEmail = "unknown";
  let firstName = "unknown";
  let lastName = "unknown";
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (userData !== null) {
    userData.map((item) => {
      return (
        (userEmail = item.email),
        (firstName = item.firstName),
        (lastName = item.lastName)
      );
    });
  }

  const emailValidation = () => {
    var emailReg = /^[a-zA-Z]+[.+-]?[a-zA-Z0-9]+[@][a-zA-Z]{3,}[.][a-z]{2,4}[.]?[a-zA-Z]*[.,]?$/;
    if (!emailReg.test(searchEmail)) {
      setIsValidEmail(true);
      setErrorText("Invalid Email Id");
      return false;
    } else {
      setIsValidEmail(false);
      return true;
    }
  };

  const handleUserData = (value) => {
    if (emailValidation()) {
      let data = {
        searchWord: searchEmail,
      };
      searchUserDetails(data)
        .then((res) => {
          if (res.data.data.details.length !== 0) {
            res.data.data.details.map((item) =>
              setUserDetails([
                ...userDetails,
                {
                  firstName: item.firstName,
                  email: item.email,
                },
              ])
            );
            if(value === 'save'){
              setCollabUser(res.data.data.details)
              setShowCard('create_note')
            }
          } else {
            setIsValidEmail(true);
            setErrorText("user not found");
          }
        })
        .catch((err) => {
          console.warn("error", err);
        });
    }
  };
  return (
    <div className="collabMainContainer">
      <Card className="cardMainContainer">
        <CardContent>Collaborator</CardContent>
        <Divider />
        <CardContent className="userInfo">
          {firstName} {lastName} (Owner)
          <div className="userEmail">{userEmail}</div>
        </CardContent>
        {userDetails.length !== 0 && (
          <div>
            {userDetails.map((item, index) => (
              <div key={index} className="showUserEmailWithAvatar">
                <Avatar className="avatar">{item.firstName.slice(0, 1)}</Avatar>
                <div>{item.email}</div>
              </div>
            ))}
          </div>
        )}
        <CardContent className="inputContainer">
          <PersonAddIcon className="collabIcon" style={{ fontSize: 45 }} />
          <InputBase
            autoFocus
            placeholder="person or email to share with"
            className="collabInputEmail"
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <div className="checkIconContainer" onClick={() => handleUserData()}>
            <CheckIcon style={{ fontSize: 15 }} className="checkIcon" />
          </div>
        </CardContent>
        {isValidEmail && <div className="emailError">{errorText}</div>}
        <div className="collabButton">
          <Button color="primary" variant="text" onClick={() => item !== undefined ? setIsCollabModalOpen(false) : setShowCard("create_note")}>
            cancel
          </Button>
          <div onClick={() => item !== undefined ? setIsCollabModalOpen(false) : handleUserData('save')}>
          <Button color="primary" variant="text">
            save
          </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Collaborator;
