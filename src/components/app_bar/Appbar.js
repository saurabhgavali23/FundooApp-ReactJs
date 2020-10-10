import { AppBar, InputBase, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import "./AppBarCss.css";
import Profile from "../profile/Profile";
import NoteDrawer from "../drawer/NoteDrawer";

const Appbar = () => {

  return (
    <div className="grow">
      <AppBar position="static">
        <Toolbar>
          <div className="toolbarContainer">
          <div className="appBarMenuAndTitile">
          <NoteDrawer />
          <Typography variant="h6" noWrap>
            FundooAap
          </Typography>
          <div className="search">
            <div className="searchIcon">
            <SearchIcon style={{ fontSize: 20}}/>
            </div>
            <InputBase placeholder="Search" 
            className="searchInput" multiline 
            />
          </div>
          </div>
          <div className="profile">
            <Profile/>
          </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
