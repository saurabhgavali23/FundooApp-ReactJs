import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import "./ProfileCss.css";
import {
  Avatar,
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
        <Avatar className="profileIcon">{userEmail.slice(0,1)}</Avatar>
      </IconButton>
      {showProfile ? (
        <div className="profileContainer">
          <Card>
            <CardContent className="profielCardContainer">
              <Avatar className="avatarIcon" >{userEmail.slice(0,1)}</Avatar>
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
