import React, { useEffect, useState } from "react";
import "./CreateNoteCss.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  InputBase,
  makeStyles,
} from "@material-ui/core";
import CollaboratorIcon from "@material-ui/icons/PersonAddOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import ArchiveFilled from "@material-ui/icons/Archive";
import ArchiveOutlined from "@material-ui/icons/ArchiveOutlined";
import { saveNoteLabels, saveNotes } from "../../services/NoteServices";
import Reminder from "../reminder/Reminder";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ColorList from "../color_list/ColorList";
import MoreOptions from "../more_options/MoreOptions";
import Pin from "../../images/Pin.png";
import PinOutlined from "../../images/PinOutlined.png";

const Styles = makeStyles({
  root: {
    padding: 0,
  },
});

const CreateNote = ({ setShowCard }) => {
  const classes = Styles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTimeChip, setDateTimeChip] = useState("");
  const [isArchived, setIsArchived] = useState(false);
  const [bgColor, setBgColor] = useState("#fff");
  const [showLabels, setShowLabels] = useState([]);
  const [isPined, setIsPined] = useState(false);
  var labelId = [];

  const saveNote = () => {
    if (title !== "" && description !== "") {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("reminder", dateTimeChip);
      formData.append("isPined", isPined)
      formData.append("isArchived", isArchived);
      formData.append("labelIdList", JSON.stringify(labelId));
      formData.append("color", bgColor);
      saveNotes(formData)
        .then((res) => {})
        .catch((err) => {
          console.warn("error", err);
        });
    }
  };

  useEffect(() => {
    let labels = [];
    let userId = localStorage.getItem("userId");

    if (showLabels.length !== 0) {
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
  }, [showLabels,labelId]);

  const handleDeleteChip = () => {
    setDateTimeChip("");
  };

  return (
    <div className="mainContainer">
      <Card className="cardContainer2" style={{ backgroundColor: bgColor }}>
        <CardContent
          className="subCardContainer2"
          classes={{ root: classes.root }}
        >
          <InputBase
            placeholder="Titile"
            className="inputBase"
            onChange={(e) => setTitle(e.target.value)}
            multiline
          />
          {isPined ? (
            <img
              src={Pin}
              style={{ width: '10px', height: '20px' }}
              alt="pin"
              onClick={() => setIsPined(!isPined)}
            />
          ) : (
            <img
              style={{ width: '20px', height: '20px' }}
              alt="unPin"
              src={PinOutlined}
              onClick={() => setIsPined(!isPined)}
            />
          )}
        </CardContent>
        <CardContent className="discription" classes={{ root: classes.root }}>
          <InputBase
            placeholder="Take a notes..."
            className="inputBase"
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
          {dateTimeChip !== "" ? (
            <Chip
              icon={<AccessTimeIcon />}
              label={dateTimeChip}
              clickable
              color="primary"
              onDelete={handleDeleteChip}
            />
          ) : null}
          {showLabels.length ? (
            <div>
              {showLabels.map((item, index) => (
                <Chip className="showLabel" key={index} label={item.value} />
              ))}
            </div>
          ) : null}
        </CardContent>
        <div className="actionStyle">
          <CardActions className="createOptions">
            <Reminder setDateTimeChip={setDateTimeChip} />
            <div className="iconStyle">
              <CollaboratorIcon onClick={() => setShowCard("collaborator")} />
            </div>
            <ColorList setBgColor={setBgColor} />
            <div>
              <ImageIcon className="iconStyle" />
            </div>
            <div onClick={() => setIsArchived(!isArchived)}>
              {isArchived ? (
                <ArchiveFilled className="iconStyle" />
              ) : (
                <ArchiveOutlined className="iconStyle" />
              )}
            </div>
            <MoreOptions setShowLabels={setShowLabels} />
          </CardActions>
          <CardActions onClick={() => setShowCard("take_note")}>
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
