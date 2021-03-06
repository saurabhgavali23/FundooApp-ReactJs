import { Avatar, Backdrop, Card, CardContent, Checkbox, Chip, Fade, FormControlLabel, Grid, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./DisplayCardCss.css";
import Reminder from "../reminder/Reminder";
import CollaboratorIcon from "@material-ui/icons/PersonAddOutlined";
import ColorList from "../color_list/ColorList";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import ArchiveFilled from "@material-ui/icons/Archive";
import ArchiveOutlined from "@material-ui/icons/ArchiveOutlined";
import MoreOptions from "../more_options/MoreOptions";
import Pin from "../../images/Pin.png";
import PinOutlined from "../../images/PinOutlined.png";
import {
  addCollaborator,
  addReminder,
  updateNoteArchive,
  updateNoteColor,
  updateNotePin,
  updateNoteItemList,
} from "../../services/NoteServices";
import CreateNote from "../create_note/CreateNote";
import Collaborator from "../collaborator/Collaborator";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from "moment";

const DisplayCard = ({ item, setPinText, setRefresh, isGrid }) => {
  const [isHover, setIsHover] = useState(false);
  const [isArchived, setIsArchived] = useState(item.isArchived);
  const [isPined, setIsPined] = useState(item.isPined);
  const [bgColor, setBgColor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false)
  const [addCollabUser, setAddCollabUser] = useState([])
  const [dateTimeChip, setDateTimeChip] = useState("");
  var noteId = [];
  noteId.push(item.id);

  useEffect(() => {
    if(item !== undefined && addCollabUser.length !== 0){
      let data = ''
      addCollabUser.map(item => data = item)
      addCollaborator(item.id, data).then(
        () => {setRefresh(Math.random())}
      ).catch(err=>{
        console.log("error", err);
      })
   }
  }, [addCollabUser, setRefresh, item])

  const handleNotePin = (value) => {
    setIsPined(value);
    let data = {
      isPined: value,
      noteIdList: noteId,
    };
    updateNotePin(data).then(
      () => {setRefresh(Math.random())}
    )
    .catch((err) => {
      console.warn("error", err);
    });
  };

  const handleNoteArchive = (value) => {
    setIsArchived(value);
    let data = {
      isArchived: value,
      noteIdList: noteId,
    };
    updateNoteArchive(data).then(
      () => {setRefresh(Math.random())}
    ).catch((err) => {
      console.warn("error", err);
    });
  };

  useEffect(() => {
    if(item.isPined){
      setPinText(item.isPined)
    }else{
      setPinText(item.isPined)
    }
  }, [item.isPined, setPinText])

  useEffect(() => {
    if (bgColor !== "") {
      let data = {
        color: bgColor,
        noteIdList: noteId,
      };
      updateNoteColor(data).then(
        () => {setRefresh(Math.random())}
      )
      .catch((err) => {
        console.warn("error", err);
      });
      setBgColor("");
    }
  }, [bgColor, noteId, setRefresh]);

  useEffect(() => {
    if(dateTimeChip !== ""){
      let data = {
        reminder: dateTimeChip,
        noteIdList: noteId
      }
      addReminder(data).then(
        () => {setRefresh(Math.random())}
      )
      .catch(err=>{
        console.warn("error", err);
      })
    }
    setDateTimeChip("")
  }, [dateTimeChip, noteId, setRefresh])

  const handleDateAndTime = (value) =>{
    let todaysDate = new Date().toString()
    if(value.slice(0, 7) === todaysDate.slice(0, 7)){
        return ('today '+moment(value).format("LT"))
    }
   return (value.slice(4,10)+', '+moment(value).format("LT"))
  }

  const handleNoteItemList = (item) => {
    let data = {itemName: item.itemName, 
      status: item.status === "close" ? "open" : "close" }

      updateNoteItemList(item.notesId, item.id, data)
      .then(
        () => {setRefresh(Math.random())}
      ).catch(err=>{
        console.warn("error", err);
      })
  }

  return (
    <div className="createMainContainer">
      <Grid item>
        <Card
          style={{backgroundColor: item.color}}
          className="createCardContainer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className={isGrid ? "displayCardContainerwithOption" : "gridDisplayCardContainerwithOption"}>
            <div className={isGrid ? "createCardContent" : "gridCreateCardContent"} >
              <CardContent className={isGrid ? "createCardHeaderContent" : "gridCreateCardHeaderContent"}>
                {item.title}
                {isHover && (
                  <div>
                    {isPined ? (
                      <img
                        src={Pin}
                        style={{ width: "20px", height: "15px"}}
                        className="pinIcon"
                        alt="pin"
                        onClick={() => handleNotePin(!isPined)}
                      />
                    ) : (
                      <img
                        style={{ width: "20px", height: "15px"}}
                        className="pinIcon"
                        alt="unPin"
                        src={PinOutlined}
                        onClick={() => handleNotePin(!isPined)}
                      />
                    )}
                  </div>
                )}
              </CardContent>
              <div onClick={() => setIsModalOpen(!isModalOpen)}>
              <CardContent className={isGrid ? "createContentStyle" : "girdCreateContentStyle"}>
                {item.description}
              </CardContent>
              <div>
                {item.reminder !== undefined
                  ? item.reminder.map((item, index)=>{
                    let data = handleDateAndTime(item)
                    return(
                      <Chip 
                        avatar={<AccessTimeIcon/>}
                        key={index} 
                        className="displayReminder"
                        label={data}/>
                      )})
                  : null
                }
              </div>
              <div>
                {item.noteLabels !== undefined
                  ? item.noteLabels.map((item, index) => (
                      <Chip label={item.label} key={index} style={{margin: '1%'}} />
                    ))
                  : null}
              </div>
              <div>
                {item.collaborators !== undefined &&
                  item.collaborators.map((item, index) => (
                    <Avatar key={index} style={{margin: '1%'}}>
                      {item.firstName.slice(0, 1)}</Avatar>
                  ))}
              </div>
              </div>
              <div>
                {item.noteCheckLists !== undefined && (
                  item.noteCheckLists.map((item, index)=>(
                    <div key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          className="displayItemsCheckBox"
                          size="small"
                          checked={item.status === "open" ? false : true}
                          onChange={() => handleNoteItemList(item)}
                          color="primary"
                        />
                      }
                      label={
                        item.status === "close" ? 
                      <strike>{item.itemName}</strike> : item.itemName }
                    />
                  </div>
                  ))
                )}
              </div>
            </div>
            <div>
              {isHover && (
                <div className={isGrid ? "options" : "gridOptions"}>
                  <Reminder setDateTimeChip={setDateTimeChip} item={item}/>
                  <CollaboratorIcon style={{ cursor: 'pointer', fontSize: '1.7rem' }} 
                  onClick={() => setIsCollabModalOpen(!isCollabModalOpen)}/>
                  <ColorList setBgColor={setBgColor} />
                  <ImageIcon style={{ fontSize: '1.7rem' }}/>
                  <div>
                    {isArchived ? (
                      <ArchiveFilled
                        style={{ fontSize: '1.7rem' }}
                        onClick={() => handleNoteArchive(!isArchived)}
                      />
                    ) : (
                      <ArchiveOutlined
                        style={{ fontSize: '1.7rem' }}
                        onClick={() => handleNoteArchive(!isArchived)}
                      />
                    )}
                  </div>
                  <MoreOptions item={item} setRefresh={setRefresh}/>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Grid>
      <div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        className="modal"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
            <CreateNote item={item} setIsModalOpen={setIsModalOpen} setRefresh={setRefresh}/>
        </Fade>
      </Modal>
      </div>
      <div>
      <Modal
        open={isCollabModalOpen}
        onClose={() => setIsCollabModalOpen(!isCollabModalOpen)}
        className="modal"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isCollabModalOpen}>
            <Collaborator item={item} setIsCollabModalOpen={setIsCollabModalOpen} setAddCollabUser={setAddCollabUser} />
        </Fade>
      </Modal>
      </div>
    </div>
  );
};

export default DisplayCard;
