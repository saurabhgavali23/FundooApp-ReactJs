import {
  Button,
  Card,
  CardActions,
  CardContent,
  InputBase,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Appbar from "../app_bar/Appbar";
import ReminderIcon from "@material-ui/icons/Notifications";
import CollaboratorIcon from "@material-ui/icons/PersonAdd";
import ImageIcon from "@material-ui/icons/Image";
import ColorIcon from "@material-ui/icons/ColorLens";
import ArchiveIcon from "@material-ui/icons/Archive";
import MoreIcon from "@material-ui/icons/MoreVert";
import ViewListIcon from "@material-ui/icons/ViewList";
import "../dash_board/DashBoardCss.css";

const DashBoard = () => {
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <Appbar />
      <div className="noteContainer">
        {showCreateNote === false ? (
          <Card
            className="cardContainer"
            onClick={() => setShowCreateNote(!showCreateNote)}
          >
            <CardContent className="subCardContainer">
              <Typography>Take a notes...</Typography>
              <div>
                <ViewListIcon />
                <ImageIcon />
              </div>
            </CardContent>
          </Card>
        ) : null}
        {showCreateNote === true ? (
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
              <CardActions onClick={() => setShowCreateNote(!showCreateNote)}>
                <Button color="primary" variant="text">
                  close
                </Button>
              </CardActions>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default DashBoard;
