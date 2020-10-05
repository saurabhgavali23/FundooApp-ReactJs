import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Appbar from "../app_bar/Appbar";
import ImageIcon from "@material-ui/icons/Image";
import ViewListIcon from "@material-ui/icons/ViewList";
import "../dash_board/DashBoardCss.css";
import CreateNote from "../create_note/CreateNote";
import { getNoteList } from "../services/NoteServices";
import DisplayCard from "../display_card/DisplayCard";

const DashBoard = () => {
  const [showCard, setShowCard] = useState('take_note');
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    getNoteList().then((res) => {
      setNoteList(res.data.data.data);
    });
  }, []);

  return (
    <div>
      <Appbar />
      <div className="noteContainer">
        {showCard === 'take_note' ? (
          <Card
            className="cardContainer"
            onClick={() => setShowCard('create_note')}
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
        {showCard === 'create_note' ? (
          <CreateNote setShowCard={setShowCard} />
        ) : null}
      </div>
      <div>
        <Container className="displayCardContainer">
          <Grid
            container
            style={{ flexGrow: 1}}
            spacing={2}
            direction="row"
            alignItems="center"
          >
            {noteList.map((item, index) => (
              <DisplayCard key={index} item={item}/>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default DashBoard;
