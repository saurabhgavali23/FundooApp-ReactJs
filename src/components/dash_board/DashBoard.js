import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import "./DashBoardCss.css";
import CreateNote from "../create_note/CreateNote";
import { getNoteList } from "../../services/NoteServices";
import DisplayCard from "../display_card/DisplayCard";
import Collaborator from "../collaborator/Collaborator"
import Appbar from "../app_bar/Appbar";

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
      <Appbar/>
      <div className="noteContainer">
        {showCard === 'take_note' ? (
          <Card
            className="cardContainer"
            onClick={() => setShowCard('create_note')}
          >
            <CardContent className="subCardContainer">
              <Typography className="noteTitle">Take a note...</Typography>
              <div className="imageCheckBoxContainer">
                <CheckBoxOutlinedIcon />
                <ImageIcon />
              </div>
            </CardContent>
          </Card>
        ) : null}
        {showCard === 'create_note' ? (
          <CreateNote setShowCard={setShowCard} />
        ) : null}
        {showCard === 'collaborator' ? (
          <Collaborator setShowCard={setShowCard}/>
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
