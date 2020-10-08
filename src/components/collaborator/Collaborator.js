import {
  Button,
  Card,
  CardContent,
  Divider,
  InputBase,
} from "@material-ui/core";
import React from "react";
import "./CollaboratorCss.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const Collaborator = ({ setShowCard }) => {
  let userEmail = 'unknown'
  let firstName = 'unknown'
  let lastName = 'unknown'
  let userData = JSON.parse(localStorage.getItem("userData"))
  if(userData !== null){
      userData.map((item)=>{
         return(
            userEmail = item.email,
            firstName = item.firstName,
            lastName = item.lastName
         )
      })
  }
  return (
    <div className="collabMainContainer">
      <Card className="cardMainContainer">
        <CardContent>Collaborator</CardContent>
        <Divider />
        <CardContent className="userInfo">
          {firstName} {lastName} (Owner)
          <div className="userEmail">{userEmail}</div>
        </CardContent>
        <CardContent className="inputContainer">
          <PersonAddIcon className="collabIcon" style={{ fontSize: 45 }} />
          <InputBase
            placeholder="person or email to share with"
            className="collabInputEmail"
          />
        </CardContent>
        <div className="collabButton" onClick={() => setShowCard("create_note")}>
          <Button color="primary" variant="text">
            save
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Collaborator;
