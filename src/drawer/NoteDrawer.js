import {
    Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ArchiveIcon from '@material-ui/icons/Archive';
import IconButton from "@material-ui/core/IconButton";
import ReminderIcon from '@material-ui/icons/Notifications';
import MenuIcon from "@material-ui/icons/Menu";
import TrashIcon from '@material-ui/icons/Delete';
import NoteIcon from '@material-ui/icons/EmojiObjects';
import React from "react";
import '../drawer/DrawerCss.css'

const NoteDrawer = ({ openDrawer }) => {

  return (
    <div>
      <IconButton
        edge="start"
        className="menuButton"
        color="inherit"
        aria-label="open drawer"
      >
        <MenuIcon />
      </IconButton>
      <div >
        <Drawer open={openDrawer} 
        className="drawer"
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
            <Divider/>
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
      </div>
    </div>
  );
};

export default NoteDrawer;
