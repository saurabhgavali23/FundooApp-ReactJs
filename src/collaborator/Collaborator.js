import {
  Button,
  Card,
  CardContent,
  Divider,
  InputBase,
} from "@material-ui/core";
import React from "react";
import "../collaborator/CollaboratorCss.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const Collaborator = ({ setShowCard }) => {
  let userEmail = localStorage.getItem("userEmail");

  return (
    <div className="collabMainContainer">
      <Card className="cardMainContainer">
        <CardContent>Collaborator</CardContent>
        <Divider />
        <CardContent className="userInfo">
          Saurabh Gavali (Owner)
          <div className="userEmail">{userEmail}</div>
        </CardContent>
        <CardContent className="inputContainer">
          <PersonAddIcon className="collabIcon" style={{ fontSize: 45 }} />
          <InputBase
            placeholder="person or email to share with"
            className="collabInputEmail"
          />
        </CardContent>
        <div className="collabButton" onClick={() => setShowCard("take_note")}>
          <Button color="primary" variant="text">
            save
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Collaborator;
