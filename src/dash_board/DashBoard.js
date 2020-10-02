import {
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Appbar from "../app_bar/Appbar";
import ImageIcon from "@material-ui/icons/Image";
import ViewListIcon from "@material-ui/icons/ViewList";
import "../dash_board/DashBoardCss.css";
import CreateNote from "../create_note/CreateNote";

const DashBoard = () => {
  const [showCreateNote, setShowCreateNote] = useState(false);

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
        <CreateNote setShowCreateNote={setShowCreateNote}/>
        ) : null}
      </div>
    </div>
  );
};

export default DashBoard;
