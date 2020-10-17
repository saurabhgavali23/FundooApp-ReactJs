import { Button, Card, Divider, Input, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import CheckIcon from "@material-ui/icons/Check";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import "./EditLabelsCss.css";
import { Label } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/EditOutlined";
import {
  getNoteLabelList,
  saveNoteLabels,
  updateNoteLables,
} from "../../services/NoteServices";

const EditLabels = ({ setOpenEditLabels }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editLabel, setEditLabel] = useState("");
  const [label, setLabel] = useState("");
  const [editLabelList, setEditLabelList] = useState([]);
  const [isLabel, setIsLabel] = useState(false);
  const [isLabelEditable, setIsLabelEditable] = useState(false);
  const [refresh, setRefresh] = useState(Math.random());
  const [itemIndex, setItemIndex] = useState("");
  const [editItemIndex, setEditItemIndex] = useState("");
  const [showLabelIndex, setShowLabelIndex] = useState("");
  const handleLabelList = () => {
    let userId = localStorage.getItem("userId");
    let data = {
      label: label,
      isDeleted: false,
      userId: userId,
    };
    saveNoteLabels(data)
      .then((res) => {
        setRefresh(Math.random());
        setLabel("");
      })
      .catch((err) => {
        console.warn("error", err);
      });
  };

  useEffect(() => {
    getNoteLabelList()
      .then((res) => {
        setEditLabelList(res.data.data.details);
      })
      .catch((err) => {
        console.warn("error", err);
      });
  }, [refresh]);

  const handleUpdateNoteLabel = (value) => {
    let data = {
      label: editLabel,
      id: value.id,
      userId: value.userId,
    };
    updateNoteLables(value.id, data)
      .then((res) => {
        setRefresh(Math.random());
      })
      .catch((err) => {
        console.warn("error", err);
      });
  };

  const toggleHover = (item, index) => {
    setItemIndex(index);
    if (editLabelList.indexOf(item) === index) {
      setIsLabel(true);
    } else {
      setIsLabel(false);
    }
  };

  const editLableToggleHover = (item, index) => {
    setEditItemIndex(index);
    setShowLabelIndex(index);
    if (editLabelList.indexOf(item) === index) {
      setEditLabel(item.label);
      return setIsLabelEditable(true);
    } else {
      return setIsLabelEditable(false);
    }
  };

  return (
    <div>
      <Card className="editCardContainer">
        <div className="editSubCardContainer">
          <Typography className="editTitle">Edit labels</Typography>
          <div className="editinputContainer">
            {!isEditable ? (
              <CloseOutlinedIcon
                className="editClearIcon"
                onClick={() => setIsEditable(!isEditable)}
              />
            ) : (
              <AddOutlinedIcon
                className="editClearIcon"
                onClick={() => setIsEditable(!isEditable)}
              />
            )}
            <Input
              value={label}
              placeholder="Create new label"
              className="input"
              disableUnderline={isEditable}
              disabled={isEditable}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={() => setIsEditable(!isEditable)}
            />
            <CheckIcon
              className="editCheckIcon"
              onClick={() => handleLabelList()}
            />
          </div>
          {editLabelList.length ? (
            <div className="editLablesContainer">
              {editLabelList.map((item, index) => (
                <div key={index} className="editLabels">
                  <div
                    className="labelIcon"
                    onMouseEnter={() => toggleHover(item, index)}
                    onMouseLeave={() => setIsLabel(false)}
                  >
                    {isLabel && itemIndex === index ? (
                      <DeleteIcon style={{ fontSize: "1rem" }} />
                    ) : (
                      <Label style={{ fontSize: "1rem" }} />
                    )}
                  </div>
                  <div className="editUpdateLabel">
                    <Input
                      value={
                        showLabelIndex === index
                          ? editLabel !== ""
                            ? editLabel
                            : item.label
                          : item.label
                      }
                      className="input"
                      disableUnderline={
                        !(isLabelEditable && editItemIndex === index)
                      }
                      disabled={!(isLabelEditable && editItemIndex === index)}
                      onChange={(e) => setEditLabel(e.target.value)}
                    />
                    {!(isLabelEditable && editItemIndex === index) ? (
                      <EditIcon
                        className="editIcon"
                        onClick={() => editLableToggleHover(item, index)}
                      />
                    ) : (
                      <CheckIcon
                        className="editCheckIcon"
                        onClick={() => handleUpdateNoteLabel(item)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <Divider />
        <div className="editButton">
          <Button
            color="primary"
            variant="text"
            onClick={() => setOpenEditLabels(false)}
          >
            Done
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EditLabels;
