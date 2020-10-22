import {
  Backdrop,
  ClickAwayListener,
  createMuiTheme,
  Drawer,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  ThemeProvider,
} from "@material-ui/core";
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import IconButton from "@material-ui/core/IconButton";
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';
import MenuIcon from "@material-ui/icons/Menu";
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import NoteIcon from '@material-ui/icons/EmojiObjectsOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import React, { useEffect, useState } from "react";
import './DrawerCss.css'
import EditLabels from "../edit_labels/EditLabels";
import { getNoteLabelList } from "../../services/NoteServices";
import { Label } from "@material-ui/icons";

const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
        paper: {
            top: '10%',
        },
        paperAnchorDockedRight:{
          borderRight: 20
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

const NoteDrawer = ({setSelectCard}) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openEditLabels, setOpenEditLabels] = useState(false)
  const [labelList, setLabelList] = useState([])
  const [drawerLabelRefresh, setDrawerLabelRefresh] = useState(Math.random())

  useEffect(() => {
    getNoteLabelList().then(res=>{
        setLabelList(res.data.data.details);
      })
      .catch((err) => {
        console.warn("error", err);
      });
  }, [drawerLabelRefresh])

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
            <ListItem className="note" onClick={()=> setSelectCard('note')}>
              <ListItemIcon>
                <NoteIcon/>
              </ListItemIcon>
              <ListItemText>Note</ListItemText>
            </ListItem>
            <ListItem className="note" onClick={()=> setSelectCard('reminder')}>
              <ListItemIcon>
                <ReminderIcon/>
              </ListItemIcon>
              <ListItemText>Reminder</ListItemText>
            </ListItem>
            {labelList.length !== 0 && (
              labelList.map((item, index)=>(
            <ListItem key={index} className="note" onClick={()=> setSelectCard(item.label)}>
              <ListItemIcon>
                <Label/>
              </ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </ListItem>
              )))
            }
            <ListItem className="note" onClick={()=> setOpenEditLabels(!openEditLabels)}>
              <ListItemIcon>
               <EditIcon/>
              </ListItemIcon>
              <ListItemText>Edit labels</ListItemText>
            </ListItem>
            <ListItem className="note" onClick={()=> setSelectCard('isArchived')}>
              <ListItemIcon>
                <ArchiveIcon/>
              </ListItemIcon>
              <ListItemText>Archive</ListItemText>
            </ListItem>
            <ListItem className="note" onClick={()=> setSelectCard('Trash')}>
              <ListItemIcon>
                <TrashIcon/>
              </ListItemIcon>
              <ListItemText>Trash</ListItemText>
            </ListItem>
          </List>
        </div>
        </Drawer>
        </ThemeProvider>
        <div>
      <Modal
        open={openEditLabels}
        onClose={() => setOpenEditLabels(!openEditLabels) }
        closeAfterTransition
        className="modal"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEditLabels}>
            <EditLabels setOpenEditLabels={setOpenEditLabels} setDrawerLabelRefresh={setDrawerLabelRefresh}/>
        </Fade>
      </Modal>
      </div>
    </div>
    </ClickAwayListener>
  );
};

export default NoteDrawer;
