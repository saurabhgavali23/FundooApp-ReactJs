import { AppBar, InputBase, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import "./AppBarCss.css";
import Profile from "../profile/Profile";
import NoteDrawer from "../drawer/NoteDrawer";
import RefreshIcon from '@material-ui/icons/Refresh';
import ListIcon from '@material-ui/icons/ViewAgendaOutlined';
import GridOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import { useState } from "react";

const Appbar = ({selectCard, setSelectCard, setRefresh, setSearchNote}) => {
  const [isGrid, setIsGrid] = useState(false)

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
            onChange={(e) => setSearchNote(e.target.value)}
            />
          </div>
          </div>
          <div className="refreshIcon" onClick={() => setRefresh(Math.random())}>
          <RefreshIcon style={{ fontSize: 30}}/>
          </div>
          <div className="listAndGridViewContainer">
            {isGrid ?
              <ListIcon 
              style={{ fontSize: '1.8rem'}}
              onClick={ () => setIsGrid(!isGrid)}/>:
              <GridOutlinedIcon 
              style={{ fontSize: '2.2rem'}}
              onClick={ () => setIsGrid(!isGrid)}/>
            }
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
