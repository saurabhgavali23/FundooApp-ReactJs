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
import ArchiveFilled from "@material-ui/icons/Archive";
import ArchiveOutlined from "@material-ui/icons/ArchiveOutlined";
import { saveNotes } from "../../services/NoteServices";
import Reminder from "../reminder/Reminder";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ColorList from "../color_list/ColorList";
import MoreOptions from "../more_options/MoreOptions";

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
  const [bgColor, setBgColor] = useState('#fff')
  const [showLabels, setShowLabels] = useState([])

  const saveNote = () => {
    if (title !== "" && description !== "") {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("reminder", dateTimeChip);
      formData.append("isArchived", isArchived);
      formData.append("color", bgColor);
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
      <Card className="cardContainer2" style={{ backgroundColor: bgColor }}>
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
            {showLabels.length ? 
              (<div>
                {showLabels.map((item,index)=>(
                  <Chip 
                    className="showLabel"
                    key={index}
                    label={item.value}
                  />
              ))}
              </div>):null}
        </CardContent>
        <div className="actionStyle">
          <CardActions style={{marginLeft: '3%'}}>
            <Reminder setDateTimeChip={setDateTimeChip}/>
            <CollaboratorIcon className="iconStyle" onClick={()=> setShowCard('collaborator')}/>
            <ColorList setBgColor={setBgColor}/>
            <ImageIcon className="iconStyle" />
            <div onClick={() => setIsArchived(!isArchived)}>
            {isArchived ? <ArchiveFilled className="iconStyle"/> : <ArchiveOutlined className="iconStyle"/>}
            </div>
            <MoreOptions setShowLabels={setShowLabels}/>
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
