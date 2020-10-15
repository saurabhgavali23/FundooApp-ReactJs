import { Button, Card, Divider, Input, Typography } from "@material-ui/core";
import React, { useState } from "react";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import CheckIcon from "@material-ui/icons/Check";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import "./EditLabelsCss.css";
import { Label } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/EditOutlined";

const EditLabels = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [editLabel, setEditLabel] = useState("");
  const [editLabelList, setEditLabelList] = useState([]);
  const [isLabel, setIsLabel] = useState(true);
  const [isLabelEditable, setIsLabelEditable] = useState(true);

  const handleLabelList = () => {
    setEditLabelList([...editLabelList, { label: editLabel }]);
    setEditLabel("");
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
              value={editLabel}
              placeholder="Create new label"
              className="input"
              disableUnderline={isEditable}
              disabled={isEditable}
              onChange={(e) => setEditLabel(e.target.value)}
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
                    onMouseEnter={() => setIsLabel(!isLabel)}
                    onMouseLeave={() => setIsLabel(!isLabel)}
                  >
                    {isLabel ? (
                      <Label style={{ fontSize: "1rem" }} />
                    ) : (
                      <DeleteIcon style={{ fontSize: "1rem" }} />
                    )}
                  </div>
                  <div className="editUpdateLabel">
                    <Input
                      value={item.label}
                      className="input"
                      disableUnderline={isLabelEditable}
                      disabled={isLabelEditable}
                      onChange={(e) => setEditLabel(e.target.value)}
                    />
                    {isLabelEditable ? (
                      <EditIcon className="editIcon" />
                    ) : (
                      <CheckIcon className="editCheckIcon" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <Divider />
        <div className="editButton">
          <Button color="primary" variant="text">
            Done
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EditLabels;
