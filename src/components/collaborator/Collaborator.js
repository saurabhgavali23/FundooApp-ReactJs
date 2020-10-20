import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import "./CollaboratorCss.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { searchUserDetails } from "../../services/userServices";
import CheckIcon from "@material-ui/icons/Check";
import { Autocomplete } from "@material-ui/lab";

const Collaborator = ({ setCollabUser, setShowCard, setIsCollabModalOpen, item }) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [displayUserDetails, setDisplayUserDetails] = useState([])

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

  const handleUserEmail = () => {
    userDetails.map((item)=>{
      if(item.email === searchEmail){
        let data = []
        data.push(item)
        setCollabUser(data)
      return (
        setDisplayUserDetails([
          ...displayUserDetails,
          {
            firstName: item.firstName,
            email: item.email,
          },
        ])
      );
      }
      return(
        item.email
      )
    })
  }

  const searchUserEmail = (value) => {
    if(value !== ''){
    let data = {
      searchWord: value,
    };
    searchUserDetails(data)
      .then((res) => {
        if (res.data.data.details.length !== 0) {
          setUserDetails(res.data.data.details)
        }
      })
      .catch((err) => {
        console.warn("error", err);
      });
    }
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
        {displayUserDetails.length !== 0 && (
          <div>
            {displayUserDetails.map((item, index) => (
              <div key={index} className="showUserEmailWithAvatar">
                <Avatar className="avatar">{item.firstName.slice(0, 1)}</Avatar>
                <div>{item.email}</div>
              </div>
            ))}
          </div>
        )}
        <CardContent className="inputContainer">
          <PersonAddIcon className="collabIcon" style={{ fontSize: 45 }} />
          <div style={{width: '80%'}}>
          <Autocomplete
            freeSolo
            style={{marginLeft: '5%', display: 'flex', alignItems: 'center'}}
            options={userDetails.map((options)=> options.email)}
            onChange={(event, value) => setSearchEmail(value)}
            renderInput={(params)=>(
            <TextField
            {...params}
            margin="normal"
            variant="standard"
            autoFocus
            placeholder="person or email to share with"
            onChange={(e) => searchUserEmail(e.target.value)}
            />
            )}
          />
          </div>
          <div className="checkIconContainer">
            <CheckIcon style={{ fontSize: 15 }} className="checkIcon" 
              onClick={()=> handleUserEmail()}
            />
          </div>
        </CardContent>
        <div className="collabButton">
          <Button color="primary" variant="text" onClick={() => item !== undefined ? setIsCollabModalOpen(false) : setShowCard("create_note")}>
            cancel
          </Button>
          <div onClick={() => item !== undefined ? setIsCollabModalOpen(false) : setShowCard('create_note')}>
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
