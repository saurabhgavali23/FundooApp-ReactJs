import { Avatar, Card, CardContent, Chip, Grid } from "@material-ui/core";
import React, { useState } from "react";
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
import { updateNoteArchive, updateNotePin } from "../../services/NoteServices";

const DisplayCard = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  const [isArchived, setIsArchived] = useState(item.isArchived);
  const [isPined, setIsPined] = useState(item.isPined);
  var noteId = []
  noteId.push(item.id)

  const handleNotePin = (value) => {
    setIsPined(value)
    let data = {
      isPined: value,
      noteIdList: noteId
    }
    updateNotePin(data).catch(err=>{
      console.warn("error", err);
    })
  }

  const handleNoteArchive = (value) => {
    setIsArchived(value)
    let data = {
      isArchived: value,
      noteIdList: noteId
    }
    updateNoteArchive(data).catch(err=>{
      console.warn("error", err);
    })
  }

  return (
    <div className="createMainContainer">
      <Grid item>
        <Card
          style={{ height: 200, width: 200, backgroundColor: item.color }}
          className="createCardContainer"
          onMouseEnter={() => setIsHover(!isHover)}
          onMouseLeave={() => setIsHover(!isHover)}
        >
          <div className="displayCardContainerwithOption">
            <div className="createCardContent">
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
                {item.collaborators !== undefined && (
                  item.collaborators.map((item,index)=>(
                  <Avatar key={index}>{item.firstName.slice(0,1)}</Avatar>
                  ))
                )}
              </div>
            </div>
            <div>
              {isHover && (
                <div className="options">
                  <Reminder />
                  <CollaboratorIcon />
                  <ColorList />
                  <ImageIcon />
                  <div>
                    {isArchived ? (
                      <ArchiveFilled className="iconStyle" onClick={() => handleNoteArchive(!isArchived)}/>
                    ) : (
                      <ArchiveOutlined className="iconStyle" onClick={() => handleNoteArchive(!isArchived)}/>
                    )}
                  </div>
                  <MoreOptions />
                </div>
              )}
            </div>
          </div>
        </Card>
      </Grid>
    </div>
  );
};

export default DisplayCard;
