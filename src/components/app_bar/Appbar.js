import { AppBar, InputBase, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import "./AppBarCss.css";
import Profile from "../profile/Profile";
import NoteDrawer from "../drawer/NoteDrawer";
import RefreshIcon from '@material-ui/icons/Refresh';

const Appbar = ({selectCard, setSelectCard, setRefresh}) => {

  var title = selectCard;
  if(title === 'note'){
    title = 'FundooAap'
  }
  else if(title === 'isArchived'){
    title = 'Archived'
  }

  return (
    <div className="grow">
      <AppBar position="static">
        <Toolbar>
          <div className="toolbarContainer">
          <div className="appBarMenuAndTitile">
          <NoteDrawer setSelectCard={setSelectCard}/>
          <Typography variant="h6" noWrap className="title">
            {title}
          </Typography>
          <div className="search">
            <div className="searchIcon">
            <SearchIcon style={{ fontSize: 30}}/>
            </div>
            <InputBase placeholder="Search" 
            className="searchInput" multiline 
            />
          </div>
          </div>
          <div className="refreshIcon" onClick={() => setRefresh(Math.random())}>
          <RefreshIcon style={{ fontSize: 30}}/>
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
