import { AppBar, InputBase, makeStyles, Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
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

  return (
    <div className="grow">
      <AppBar position="static">
        <Toolbar>
          <div className="appBarMenuAndTitile">
          <NoteDrawer />
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
          <div className="profile">
            <Profile/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
