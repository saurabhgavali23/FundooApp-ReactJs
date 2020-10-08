import React, { useState } from "react";
import "./CreateNoteCss.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CollaboratorIcon from "@material-ui/icons/PersonAddOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import ColorIcon from "@material-ui/icons/ColorLensOutlined";
import ArchiveFilled from "@material-ui/icons/Archive";
import ArchiveOutlined from "@material-ui/icons/ArchiveOutlined";
import MoreIcon from "@material-ui/icons/MoreVert";
import { saveNotes } from "../../services/NoteServices";
import Reminder from "../reminder/Reminder";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const Styles = makeStyles({

  root:{
    padding: 0
  }
})

const CreateNote = ({ setShowCard }) => {
  const classes = Styles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTimeChip, setDateTimeChip] = useState('')
  const [isArchived, setIsArchived] = useState(false)

  const saveNote = () => {
    if (title !== "" && description !== "") {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("reminder", dateTimeChip);
      formData.append("isArchived", isArchived)
      saveNotes(formData)
        .then((res) => {})
        .catch((err) => {
          console.warn("error", err);
        });
    }
  };

  const handleDeleteChip = () =>{
    setDateTimeChip('')
  }
  return (
    <div className="mainContainer">
      <Card className="cardContainer2">
        <CardContent className="subCardContainer2" classes={{root: classes.root}}>
            <InputBase
              placeholder="Titile"
              className="inputBase"
              onChange={(e) => setTitle(e.target.value)}
              multiline
            />
            <Typography>Pin</Typography>
          </CardContent>
          <CardContent className="discription" classes={{root: classes.root}}>
          <InputBase
            placeholder="Take a notes..."
            className="inputBase"
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
          {dateTimeChip!==''?
            (<Chip
              icon={<AccessTimeIcon/>}
              label={dateTimeChip}
              clickable
              color="primary"
              onDelete={handleDeleteChip}
            />):null}
        </CardContent>
        <div className="actionStyle">
          <CardActions style={{marginLeft: '3%'}}>
            <Reminder setDateTimeChip={setDateTimeChip}/>
            <CollaboratorIcon className="iconStyle" onClick={()=> setShowCard('collaborator')}/>
            <ColorIcon className="iconStyle" />
            <ImageIcon className="iconStyle" />
            <div onClick={() => setIsArchived(!isArchived)}>
            {isArchived ? <ArchiveFilled className="iconStyle"/> : <ArchiveOutlined className="iconStyle"/>}
            </div>
            <MoreIcon className="iconStyle" />
          </CardActions>
          <CardActions onClick={() => setShowCard('take_note')}>
            <Button color="primary" variant="text" onClick={saveNote}>
              close
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

export default CreateNote;
