import React, { useState } from "react";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Card, CardContent, ClickAwayListener } from "@material-ui/core";
import "./MoreOptionsCss.css";
import Labels from "../labels/Labels";
import { trashNotes } from "../../services/NoteServices";
const MoreOptions = ({item, setShowLabels}) => {
  const [isMoreIcon, setIsMoreIcon] = useState(false);
  const [showAddLabel, setShowAddLabel] = useState(false);
  let noteId = []
  noteId.push(item !== undefined ? item.id : null)

  const handleOptions = () => {
    setShowAddLabel(!showAddLabel);
    setIsMoreIcon(!isMoreIcon);
  };

  const handleClickAway = () => {
    setShowAddLabel(false);
    setIsMoreIcon(false);
  };

  const handleTrashNotes = (value) => {
    let data={
      isDeleted: value,
      noteIdList: noteId
    }
    trashNotes(data).then(
    ).catch(err=>{
      console.warn("error",err);
    })
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <MoreIcon
          className="moreIcon"
          onClick={() => setIsMoreIcon(!isMoreIcon)}
        />
        {isMoreIcon ? (
          <Card
            className="moreOptionCardContainer"
          >
            {item === undefined &&
              <CardContent
              className="moreOptionCardContent"
              onClick={() => handleOptions()}
            >
              Add label
            </CardContent>}
            {(item !== undefined && item.isDeleted === false) &&
              <CardContent
              className="moreOptionCardContent"
              onClick={() => handleOptions()}
            >
              Add label
            </CardContent>}
            {(item !== undefined && item.isDeleted === false) &&(
                <CardContent
                className="deleteOption"
                onClick={() => handleTrashNotes(true)}
                >
                  Delete note
                </CardContent>
            )}
            {(item !== undefined && item.isDeleted === true) &&(
                <CardContent
                className="deleteOption"
                onClick={() => handleTrashNotes(false)}
                >
                  Restore
                </CardContent>
            )}
            {(item !== undefined && item.isDeleted === true) &&(
                <CardContent
                className="deleteOption"
                >
                  Delete permanetaly
                </CardContent>
            )}
          </Card>
        ) : null}
        {showAddLabel ? <Labels setShowLabels={setShowLabels} /> : null}
      </div>
    </ClickAwayListener>
  );
};

export default MoreOptions;
