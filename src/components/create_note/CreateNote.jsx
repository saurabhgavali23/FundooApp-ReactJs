import React, { useEffect, useState } from "react";
import "./CreateNoteCss.css";
import {
  Avatar,
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Fade,
  InputBase,
  makeStyles,
  Modal,
} from "@material-ui/core";
import CollaboratorIcon from "@material-ui/icons/PersonAddOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import ArchiveFilled from "@material-ui/icons/Archive";
import ArchiveOutlined from "@material-ui/icons/ArchiveOutlined";
import { addCollaborator, addNoteLabels, addReminder, saveNoteLabels, saveNotes, updateNoteArchive, updateNoteColor, updateNoteTitleDescription } from "../../services/NoteServices";
import Reminder from "../reminder/Reminder";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ColorList from "../color_list/ColorList";
import MoreOptions from "../more_options/MoreOptions";
import Pin from "../../images/Pin.png";
import PinOutlined from "../../images/PinOutlined.png";
import Collaborator from "../collaborator/Collaborator";
import moment from "moment";
import ListItem from "../list_item/ListItem";


const Styles = makeStyles({
  root: {
    padding: 0,
  },
});

const CreateNote = ({ collabUser, setShowCard, item, setIsModalOpen, setRefresh, setShowCheckBox, showCheckBox }) => {
  const classes = Styles();
  const [title, setTitle] = useState(item !== undefined ? item.title : '');
  const [description, setDescription] = useState(item !== undefined ? item.description : '');
  const [dateTimeChip, setDateTimeChip] = useState("");
  const [displayDateTime, setDisplayDateTime] = useState("")
  const [isArchived, setIsArchived] = useState(item !== undefined ? item.isArchived : false);
  const [bgColor, setBgColor] = useState("");
  const [itemBgColor, setItemBgColor] = useState(item !== undefined ? item.color : null);
  const [showLabels, setShowLabels] = useState([]);
  const [isPined, setIsPined] = useState(item !== undefined ? item.isPined : false);
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false)
  const [addCollabUser, setAddCollabUser] = useState([])
  const [saveItemList, setSaveItemList] = useState([])
  var labelId = [];
  var noteId = [];
  noteId.push(item !== undefined ? item.id : null);

  useEffect(() => {
    if(item === undefined){
      setItemBgColor(bgColor)
    }
    if (bgColor !== "" && item !== undefined) {
      setItemBgColor(bgColor);
      let data = {
        color: bgColor,
        noteIdList: noteId,
      };
      updateNoteColor(data).catch((err) => {
        console.warn("error", err);
      });
      setBgColor("");
    }
  }, [bgColor, noteId, itemBgColor, item]);

  const saveNote = () => {
    setShowCheckBox(true)
    if (title !== '') {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("checklist", JSON.stringify(saveItemList))
      formData.append("reminder", dateTimeChip);
      formData.append("isPined", isPined)
      formData.append("isArchived", isArchived);
      formData.append("labelIdList", JSON.stringify(labelId));
      formData.append("collaberators", JSON.stringify(collabUser))
      formData.append("color", bgColor);
      saveNotes(formData)
        .catch((err) => {
          console.warn("error", err);
        });
    }
  };

  useEffect(() => {
   if(item !== undefined && addCollabUser.length !== 0){
      let data = ''
      addCollabUser.map(item => data = item)
      addCollaborator(item.id, data).catch(err=>{
        console.log("error", err);
      })
   }
  }, [addCollabUser, item])

  useEffect(() => {
    if(item !== undefined && dateTimeChip !== ''){
      let data = {
        reminder: dateTimeChip,
        noteIdList: noteId
      }
      addReminder(data).catch(err=>{
        console.warn("error", err);
      })
    }
  }, [dateTimeChip, item, noteId])

  const updateNotes = () => {
    let formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('noteId', item.id)
    updateNoteTitleDescription(formData).then(
      ()=> {setRefresh(Math.random)}
    )
    .catch(err=>{
      console.warn("error", err);
    })
  }

  useEffect(() => {
    let updateLabels = [];

    if(showLabels.length !== 0 && item !== undefined){
      showLabels.map((item) => updateLabels.push(item.value));
      let data = {
      label: updateLabels.toString(),
      isDeleted: false,
      userId: item.userId,
    };
    addNoteLabels(item.id, data)
      .catch((err) => {
        console.warn("error", err);
      });
    }
  }, [showLabels, item, setRefresh])

  useEffect(() => {
    let labels = [];
    let userId = localStorage.getItem("userId");

    if (showLabels.length !== 0 && item === undefined) {
      showLabels.map((item) => labels.push(item.value));
      let data = {
        label: labels.toString(),
        isDeleted: false,
        userId: userId,
      };
      saveNoteLabels(data)
        .then((res) => {
          labelId.push(res.data.id);
        })
        .catch((err) => {
          console.warn("error", err);
        });
    }
  }, [showLabels,labelId, item]);

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

  const handleDeleteChip = () => {
    setDisplayDateTime("");
  };

  const handleDateAndTime = (value) =>{
    let todaysDate = new Date().toString()
    if(value.slice(0, 7) === todaysDate.slice(0, 7)){
        return ('today '+moment(value).format("LT"))
    }
   return (value.slice(4,10)+', '+moment(value).format("LT"))
  }

  return (
    <div className="mainContainer">
      <Card className="cardContainer2" style={{ backgroundColor: itemBgColor }}>
        <CardContent
          className="subCardContainer2"
          classes={{ root: classes.root }}
        >
          <InputBase
            value={title}
            placeholder="Titile"
            className="inputBase"
            onChange={(e) => setTitle(e.target.value)}
            multiline
          />
          {isPined ? (
            <img
              src={Pin}
              style={{ width: '20px', height: '15px', cursor: 'pointer' }}
              alt="pin"
              onClick={() => setIsPined(!isPined)}
            />
          ) : (
            <img
              style={{ width: '20px', height: '15px', cursor: 'pointer' }}
              alt="unPin"
              src={PinOutlined}
              onClick={() => setIsPined(!isPined)}
            />
          )}
        </CardContent>
        <CardContent className="discription" classes={{ root: classes.root }}>
         {showCheckBox || item !== undefined?
          <InputBase
            value={description}
            placeholder="Take a notes..."
            className="inputBase"
            onChange={(e) => setDescription(e.target.value)}
            multiline
          /> :(
            item === undefined &&
            <ListItem setSaveItemList={setSaveItemList}/>
          )}
          {displayDateTime !== "" ? (
            <Chip
              icon={<AccessTimeIcon />}
              label={displayDateTime}
              clickable
              className="createDisplayDateTime"
              onDelete={handleDeleteChip}
            />
          ) : null}
          {item !== undefined && displayDateTime === ""
            ? item.reminder.map((item, index)=>{
              let data = handleDateAndTime(item)
              return(
                <Chip 
                  avatar={<AccessTimeIcon/>}
                  key={index} 
                  label={data}/>
                )})
            : null
          }
          {showLabels.length ? (
            <div>
              {showLabels.map((item, index) => (
                <Chip className="showLabel" key={index} label={item.value} />
              ))}
            </div>
          ) : null}
          {item !== undefined && showLabels.length === 0 ? (
            <div>
              {item.noteLabels.map((item, index) => (
                <Chip className="showLabel" key={index} label={item.label} />
              ))}
            </div>
          ) : null}
          {collabUser !== undefined && (
            <div>
              {collabUser.map((item,index)=>(
                <Avatar key={index}>{item.firstName.slice(0,1)}</Avatar>
              ))}
            </div>
          )}
          {item !== undefined && collabUser === undefined ? (
            <div>
              {item.collaborators.map((item,index)=>(
                <Avatar key={index}>{item.firstName.slice(0,1)}</Avatar>
              ))}
            </div>
          ) : null}
          {addCollabUser !== undefined && (
            <div>
              {addCollabUser.map((item,index)=>(
                <Avatar key={index}>{item.firstName.slice(0,1)}</Avatar>
              ))}
            </div>
          )}
        </CardContent>
        <div className="actionStyle">
          <CardActions className="createOptions">
            <div className="iconMargin">
            <Reminder setDateTimeChip={setDateTimeChip} setDisplayDateTime={setDisplayDateTime} />
            </div>
            <div className="iconMargin">
              <CollaboratorIcon className="iconStyle" onClick={() => item !== undefined ? setIsCollabModalOpen(true) : setShowCard("collaborator")} />
            </div>
            <div className="iconMargin">
            <ColorList setBgColor={setBgColor} />
            </div>
            <div className="iconMargin">
              <ImageIcon className="iconStyle" />
            </div>
            <div className="iconMargin" onClick={() => item !==undefined ? handleNoteArchive(!isArchived) : setIsArchived(!isArchived)}>
              {isArchived ? (
                <ArchiveFilled className="iconStyle" />
              ) : (
                <ArchiveOutlined className="iconStyle" />
              )}
            </div>
            <MoreOptions setShowLabels={setShowLabels} setShowCheckBox={setShowCheckBox}/>
          </CardActions>
          <CardActions onClick={() => item !== undefined ? setIsModalOpen(false) : setShowCard("take_note")}>
            <Button color="primary" variant="text" onClick={item !== undefined ? updateNotes : saveNote}>
              close
            </Button>
          </CardActions>
        </div>
      </Card>
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
            <Collaborator item={item} setIsCollabModalOpen={setIsCollabModalOpen} setAddCollabUser={setAddCollabUser}/>
        </Fade>
      </Modal>
      </div>
    </div>
  );
};

export default CreateNote;
