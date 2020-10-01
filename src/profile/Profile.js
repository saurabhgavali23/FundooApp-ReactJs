import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import '../profile/ProfileCss.css'
import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";

const Profile = ({showProfile}) => {
    let userEmail = localStorage.getItem('userEmail');
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
      { showProfile?
        (<div className="profileContainer">
        <Card>
            <CardContent className="cardContainer">
            <AccountCircle className="profileIcon" />
                <Typography style={{fontSize: 15}} gutterBottom>
                   {userEmail}
                </Typography>
            </CardContent>
            <CardActions className="cardActions">
                <Button size="small" variant="contained" color="primary">Logout</Button>
            </CardActions>
        </Card>
    </div>): null}
    </div>
  );
};

export default Profile;
