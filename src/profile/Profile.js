import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "../profile/ProfileCss.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Profile = ({ showProfile }) => {
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
    <div>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle style={{ fontSize: 30 }} />
      </IconButton>
      {showProfile ? (
        <div className="profileContainer">
          <Card>
            <CardContent className="cardContainer">
              <AccountCircle className="profileIcon" />
              <Typography style={{ fontSize: 15 }} gutterBottom>
                {userEmail}
              </Typography>
            </CardContent>
            <CardActions className="cardActions">
              <Button
                size="small"
                variant="contained"
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
  );
};

export default Profile;
