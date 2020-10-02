import React, { useState } from "react";
import "../create_note/CreateNoteCss.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  InputBase,
  Typography,
} from "@material-ui/core";
import ReminderIcon from "@material-ui/icons/Notifications";
import CollaboratorIcon from "@material-ui/icons/PersonAdd";
import ImageIcon from "@material-ui/icons/Image";
import ColorIcon from "@material-ui/icons/ColorLens";
import ArchiveIcon from "@material-ui/icons/Archive";
import MoreIcon from "@material-ui/icons/MoreVert";
import { saveNotes } from "../services/NoteServices";

const CreateNote = ({ setShowCreateNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const saveNote = () => {
    if (title !== "" && description !== "") {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      saveNotes(formData)
        .then((res) => {})
        .catch((err) => {
          console.warn("error", err);
        });
    }
  };
  return (
    <div className="mainContainer">
      <Card className="cardContainer2">
        <CardContent className="subCardContainer2">
          <div className="inputBaseDiv">
            <InputBase
              placeholder="Titile"
              className="inputBase"
              onChange={(e) => setTitle(e.target.value)}
              multiline
            />
            <Typography>Pin</Typography>
          </div>
          <InputBase
            placeholder="Take a notes"
            className="inputBase"
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
        </CardContent>
        <div className="actionStyle">
          <CardActions>
            <ReminderIcon className="iconStyle" />
            <CollaboratorIcon className="iconStyle" />
            <ColorIcon className="iconStyle" />
            <ImageIcon className="iconStyle" />
            <ArchiveIcon className="iconStyle" />
            <MoreIcon className="iconStyle" />
          </CardActions>
          <CardActions onClick={() => setShowCreateNote(false)}>
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
