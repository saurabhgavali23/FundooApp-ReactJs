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
import { uploadUserProfile } from "../../services/userServices";
import { useEffect } from "react";

const Profile = () => {
  const [showProfile, setShowProfile] = useState(false)
  const [displayImage, setDisplayImage] = useState('')
  const [imageRefresh, setImageRefresh] = useState(Math.random())
  let userEmail = 'abcd@gmail.com'
  let userData = JSON.parse(localStorage.getItem("userData"))
  let history = useHistory();

  useEffect(() => {
    setDisplayImage(localStorage.getItem('userImage'))
  }, [imageRefresh])

  if(userData !== null){
    userData.map((item)=>(
      userEmail = item.email
    ))
  }
  
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  const handleUploadImage = e => {
    if(e.target.files.length){

      const formData = new FormData()
      formData.append("file", e.target.files[0])

      uploadUserProfile(formData).then(
        () => { setImageRefresh(Math.random()) }
      )
    }
  }
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
        <Avatar className="profileIcon" src={displayImage} alt={userEmail.slice(0,1)} />
      </IconButton>
      {showProfile ? (
        <div className="profileContainer">
          <Card>
            <CardContent className="profielCardContainer">
              <div className="avatarContainer">
              <input
                id="upload-button"
                type="file"
                style={{display: 'none'}}
                name="myImage"
                accept="image/x-png,image/gif,image/jpeg" 
                onChange={handleUploadImage}
              />
              <label htmlFor="upload-button">
              <Avatar className="avatarIcon" src={displayImage} alt={userEmail.slice(0,1)}/>
              </label>
              </div>
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
