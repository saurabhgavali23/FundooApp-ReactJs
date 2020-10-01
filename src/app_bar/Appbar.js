import { AppBar, Button, Card, CardActions, CardContent, InputBase, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import "../app_bar/AppBarCss.css";
import Profile from "../profile/Profile";

const Appbar = () => {
const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="grow">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className="title" variant="h6" noWrap>
            FundooAap
          </Typography>
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase placeholder="Search" className="searchInput" />
          </div>
          <div className="profile" onClick={()=>setShowProfile(!showProfile)}>
            <Profile showProfile={showProfile}/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
