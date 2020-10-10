import {
  ClickAwayListener,
  createMuiTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@material-ui/core";
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import IconButton from "@material-ui/core/IconButton";
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';
import MenuIcon from "@material-ui/icons/Menu";
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import NoteIcon from '@material-ui/icons/EmojiObjectsOutlined';
import React, { useState } from "react";
import './DrawerCss.css'

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
        paper: {
            top: '10%',
        },
        paperAnchorDockedLeft:{
          borderRight: 0
        }
    },
    MuiPaper: {
        root: {
            backgroundColor: 'transparent'
        }
    },
    MuiListItem:{
      gutters:{
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
      }
    }
}
})

const NoteDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <ClickAwayListener onClickAway={() => setOpenDrawer(false)}>
    <div>
      <ThemeProvider theme={theme}>
      <IconButton
        edge="start"
        className="menuButton"
        color="inherit"
        aria-label="open drawer"
        onClick={()=> setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
        <Drawer open={openDrawer} 
        id="drawer-container"
        variant="persistent"
        >
        <div className="list">
        <List>
            <ListItem className="note">
              <ListItemIcon>
                <NoteIcon/>
              </ListItemIcon>
              <ListItemText>Note</ListItemText>
            </ListItem>
            <ListItem className="note">
              <ListItemIcon>
                <ReminderIcon/>
              </ListItemIcon>
              <ListItemText>Reminder</ListItemText>
            </ListItem>
            <ListItem className="note">
              <ListItemIcon>
                <ArchiveIcon/>
              </ListItemIcon>
              <ListItemText>Archive</ListItemText>
            </ListItem>
            <ListItem className="note">
              <ListItemIcon>
                <TrashIcon/>
              </ListItemIcon>
              <ListItemText>Trash</ListItemText>
            </ListItem>
          </List>
        </div>
        </Drawer>
        </ThemeProvider>
    </div>
    </ClickAwayListener>
  );
};

export default NoteDrawer;
