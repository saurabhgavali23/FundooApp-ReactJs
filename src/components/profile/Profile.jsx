import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "./ProfileCss.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  ClickAwayListener,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [showProfile, setShowProfile] = useState(false)
  let userEmail = 'abcd@gmail.com'
  let userData = JSON.parse(localStorage.getItem("userData"))
  if(userData !== null){
    userData.map((item,index)=>(
      userEmail = item.email
    ))
  }
  let history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <ClickAwayListener onClickAway={()=>setShowProfile(false)}>
    <div className="profileIconContainer">
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        className="profileButton"
        onClick={()=>setShowProfile(!showProfile)}
      >
        <AccountCircle className="profileIcon"/>
      </IconButton>
      {showProfile ? (
        <div className="profileContainer">
          <Card>
            <CardContent className="profielCardContainer">
              <AccountCircle className="profileIcon" />
              <Typography style={{ fontSize: 15 }} gutterBottom>
                {userEmail}
              </Typography>
            </CardContent>
            <CardActions className="cardActions">
              <Button
                size="small"
                variant="text"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </CardActions>
          </Card>
        </div>
      ) : null}
    </div>
    </ClickAwayListener>
  );
};

export default Profile;
