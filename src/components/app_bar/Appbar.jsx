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
import { useEffect, useState } from "react";
import ClearIcon from '@material-ui/icons/Clear';

const Appbar = ({selectCard, setSelectCard, setRefresh, setSearchNote, setIsGrid, isGrid}) => {
  const [match, setMatch] = useState(window.innerWidth)
  const [showSearchBar, setShowSearchBar] = useState(true)
  const breakpoint = 360

  useEffect(() => {
     const handler = () => setMatch(window.innerWidth)
     window.addEventListener("resize", handler)
     return () => window.removeEventListener("resize", handler)
  },[])

  var title = selectCard;
  if(title === 'note'){
    title = 'FundooAap'
  }
  else if(title === 'isArchived'){
    title = 'Archived'
  }

  return (
    <div className="grow">
      <AppBar position="fixed" className="appBar">
        <Toolbar>
          <div className="toolbarContainer">
          <div className="appBarMenuAndTitile">
          <NoteDrawer setSelectCard={setSelectCard}/>
          <Typography variant="h6" noWrap className="title">
            {title}
          </Typography>
          {match === breakpoint ?
          <div>
            {showSearchBar ? 
            <div className="mobiSearchIcon"
             onClick={() => setShowSearchBar(!showSearchBar)}>
             <SearchIcon style={{ fontSize: 30}}/> 
            </div> :
            <div className="mobiSearch">
              <InputBase placeholder="Search" 
                className="mobiSearchInput" multiline 
                onChange={(e) => setSearchNote(e.target.value)}
              />
              <ClearIcon className="clearIcon"
                onClick={() => setShowSearchBar(!showSearchBar)}
              />
            </div>
            }
          </div> :
          <div className="search">
            <div className="searchIcon">
            <SearchIcon style={{ fontSize: '1rem'}}/>
            </div>
            <InputBase placeholder="Search" 
            className="searchInput" multiline 
            onChange={(e) => setSearchNote(e.target.value)}
            />
          </div>}
          </div>
          <div className="refreshIcon" onClick={() => setRefresh(Math.random())}>
          <RefreshIcon style={{ fontSize: '2rem'}}/>
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
