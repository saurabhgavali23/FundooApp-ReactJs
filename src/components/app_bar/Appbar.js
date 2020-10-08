import { AppBar, InputBase, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import "./AppBarCss.css";
import Profile from "../profile/Profile";
import NoteDrawer from "../drawer/NoteDrawer";

const Appbar = () => {
const [showProfile, setShowProfile] = useState(false)
const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div className="grow">
      <AppBar position="static">
        <Toolbar>
          <div onClick={()=> setOpenDrawer(!openDrawer)}>
          <NoteDrawer openDrawer={openDrawer}/>
          </div>
          <Typography className="title" variant="h6" noWrap>
            FundooAap
          </Typography>
          <div className="search">
            <SearchIcon className="searchIcon" />
            <InputBase placeholder="Search" className="searchInput" multiline />
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
