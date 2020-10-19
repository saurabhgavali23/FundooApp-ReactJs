import { Avatar, Backdrop, Card, CardContent, Chip, Fade, Grid, Modal } from "@material-ui/core";
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
  updateNoteArchive,
  updateNoteColor,
  updateNotePin,
} from "../../services/NoteServices";
import CreateNote from "../create_note/CreateNote";

const DisplayCard = ({ item, setPinText }) => {
  const [isHover, setIsHover] = useState(false);
  const [isArchived, setIsArchived] = useState(item.isArchived);
  const [isPined, setIsPined] = useState(item.isPined);
  const [bgColor, setBgColor] = useState("");
  const [itemBgColor, setItemBgColor] = useState(item.color);
  const [isModalOpen, setIsModalOpen] = useState(false)
  var noteId = [];
  noteId.push(item.id);

  const handleNotePin = (value) => {
    setIsPined(value);
    let data = {
      isPined: value,
      noteIdList: noteId,
    };
    updateNotePin(data).catch((err) => {
      console.warn("error", err);
    });
  };

  const handleNoteArchive = (value) => {
    setIsArchived(value);
    let data = {
      isArchived: value,
      noteIdList: noteId,
    };
    updateNoteArchive(data).catch((err) => {
      console.warn("error", err);
    });
  };

  useEffect(() => {
    if(item.isPined || item.isArchived) {
      setPinText(item.isPined)
    }
  }, [item.isPined, setPinText, item.isArchived])

  useEffect(() => {
    if (bgColor !== "") {
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
  }, [bgColor, noteId]);

  return (
    <div className="createMainContainer">
      <Grid item>
        <Card
          style={{ height: 200, width: 200, backgroundColor: itemBgColor }}
          className="createCardContainer"
          onMouseEnter={() => setIsHover(!isHover)}
          onMouseLeave={() => setIsHover(!isHover)}
        >
          <div className="displayCardContainerwithOption">
            <div className="createCardContent" onClick={() => setIsModalOpen(!isModalOpen)}>
              <CardContent className="createCardHeaderContend">
                {item.title}
                {isHover && (
                  <div>
                    {isPined ? (
                      <img
                        src={Pin}
                        style={{ width: "20px", height: "15px" }}
                        alt="pin"
                        onClick={() => handleNotePin(!isPined)}
                      />
                    ) : (
                      <img
                        style={{ width: "20px", height: "15px" }}
                        alt="unPin"
                        src={PinOutlined}
                        onClick={() => handleNotePin(!isPined)}
                      />
                    )}
                  </div>
                )}
              </CardContent>
              <CardContent className="createContentStyle">
                {item.description}
              </CardContent>
              <div>
                {item.noteLabels !== undefined
                  ? item.noteLabels.map((item, index) => (
                      <Chip label={item.label} key={index} />
                    ))
                  : null}
              </div>
              <div>
                {item.collaborators !== undefined &&
                  item.collaborators.map((item, index) => (
                    <Avatar key={index}>{item.firstName.slice(0, 1)}</Avatar>
                  ))}
              </div>
            </div>
            <div>
              {isHover && (
                <div className="options">
                  <Reminder />
                  <CollaboratorIcon />
                  <ColorList setBgColor={setBgColor} />
                  <ImageIcon />
                  <div>
                    {isArchived ? (
                      <ArchiveFilled
                        className="iconStyle"
                        onClick={() => handleNoteArchive(!isArchived)}
                      />
                    ) : (
                      <ArchiveOutlined
                        className="iconStyle"
                        onClick={() => handleNoteArchive(!isArchived)}
                      />
                    )}
                  </div>
                  <MoreOptions item={item}/>
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
            <CreateNote item={item} setIsModalOpen={setIsModalOpen}/>
        </Fade>
      </Modal>
      </div>
    </div>
  );
};

export default DisplayCard;
