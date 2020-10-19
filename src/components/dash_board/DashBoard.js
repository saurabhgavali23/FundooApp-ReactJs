import {
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import "./DashBoardCss.css";
import CreateNote from "../create_note/CreateNote";
import { getNoteList } from "../../services/NoteServices";
import DisplayCard from "../display_card/DisplayCard";
import Collaborator from "../collaborator/Collaborator";
import Appbar from "../app_bar/Appbar";

const DashBoard = () => {
  const [showCard, setShowCard] = useState("take_note");
  const [noteList, setNoteList] = useState([]);
  const [collabUser, setCollabUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectCard, setSelectCard] = useState('note')
  const [pinText, setPinText] = useState(false)
  const [refresh, setRefresh] = useState(Math.random())
  useEffect(() => {
    getNoteList()
      .then((res) => {
        setNoteList(res.data.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn("error", err);
      });
  }, [showCard,refresh]);

  return (
    <div>
      <Appbar selectCard={selectCard} setSelectCard={setSelectCard}/>
      <div className="noteContainer">
        {showCard === "take_note" ? (
          <Card
            className="cardContainer"
            onClick={() => setShowCard("create_note")}
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
        {showCard === "create_note" ? (
          <CreateNote collabUser={collabUser} setShowCard={setShowCard} />
        ) : null}
        {showCard === "collaborator" ? (
          <Collaborator
            setCollabUser={setCollabUser}
            setShowCard={setShowCard}
          />
        ) : null}
      </div>
      {isLoading ? (
        <div className="progressBar">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div>
          <Container className="displayCardContainer">
          {pinText ? <div className="pinText">Pin</div>: null}
           <Grid
              container
              style={{ flexGrow: 1 }}
              spacing={2}
              direction="row"
              alignItems="center"
            >
              {noteList.map((item, index) => {
                
                if(selectCard === 'note'){
                  return(
                    <div key={index} style={{padding: '0.5%'}}>
                      {item.isPined && item.isDeleted === false ?
                        <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh}/> : null}
                    </div>
                  )
                }
                if(selectCard === 'isArchived'){
                  return(
                    <div key={index} style={{padding: '0.5%'}}>
                      {item.isPined && item.isArchived && item.isDeleted === false ?
                        <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh}/> : null}
                    </div>
                  )
                }
                if(selectCard === 'Trash'){
                  return(
                    <div key={index} style={{padding: '0.5%'}}>
                    {item.isPined && item.isDeleted === true ?
                      <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh}/> : null}
                  </div>
                  )
                }
               return ( 
                 <div>
                   {false && 
                   <DisplayCard key={index} item={item}/>}
                </div>
                  )
                }
              )}
            </Grid>
            {pinText ? <div className="otherText">Other</div>: null}
            <Grid
              container
              style={{ flexGrow: 1 }}
              spacing={2}
              direction="row"
              alignItems="center"
            >
              {noteList.map((item, index) => {         
              if(selectCard === 'note'){
                return(
                  <div key={index} style={{padding: '0.5%'}}>
                    {!item.isPined && !item.isArchived && item.isDeleted === false ?
                    <DisplayCard key={index} item={item} setRefresh={setRefresh} />:null}
                  </div>
                )
              }

              if(selectCard === 'isArchived'){
                return(
                  <div key={index} style={{padding: '0.5%'}}>
                    {!item.isPined && item.isArchived && item.isDeleted === false?
                      <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh}/> : null}
                  </div>
                )
              }
              if(selectCard === 'Trash'){
                return(
                  <div key={index} style={{padding: '0.1%'}}>
                  {!item.isPined && item.isDeleted === true ?
                    <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh}/> : null}
                </div>
                )
              }
               return ( 
                   <DisplayCard key={index} item={item} />
                  )
                }
              )}
            </Grid>
            </Container>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
