import { AppBar, InputBase, makeStyles, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import "./AppBarCss.css";
import Profile from "../profile/Profile";
import NoteDrawer from "../drawer/NoteDrawer";

const Styles = makeStyles((theme)=>({
  search:{
    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
}))

const Appbar = () => {
  const classes = Styles()
const [showProfile, setShowProfile] = useState(false)
const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <div className="grow">
      <AppBar position="static">
        <Toolbar>
          <div className="appBarMenuAndTitile">
          <div onClick={()=> setOpenDrawer(!openDrawer)}>
          <NoteDrawer openDrawer={openDrawer}/>
          </div>
          <Typography className="title" variant="h6" noWrap>
            FundooAap
          </Typography>
          </div>
          <div className={classes.search}>
            <div className="searchIcon">
            <SearchIcon style={{ fontSize: 20}}/>
            </div>
            <InputBase placeholder="Search" 
            className="searchInput" multiline 
            />
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
