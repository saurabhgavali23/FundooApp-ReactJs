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
  const [searchNote, setSearchNote] = useState('')

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
      <Appbar selectCard={selectCard} 
      setSelectCard={setSelectCard} setRefresh={setRefresh} setSearchNote={setSearchNote}/>
      <div className="noteContainer">
        {(showCard === "take_note" && selectCard !== 'Trash' && searchNote === '') ? (
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
          <CreateNote collabUser={collabUser} setShowCard={setShowCard} setRefresh={setRefresh}/>
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
           {searchNote === '' ?
             <Grid
              container
              className="gridContainer"
              spacing={2}
              direction="row"
              alignItems="center"
            >
              {noteList.map((item, index) => {
                
                if(selectCard === 'note'){
                  return(
                    <React.Fragment key={index}>
                      {item.isPined && item.isDeleted === false ?
                        <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh}/> : null}
                    </React.Fragment>
                  )
                }
                if(selectCard === 'isArchived'){
                  return(
                    <React.Fragment key={index}>
                      {item.isPined && item.isArchived && item.isDeleted === false ?
                        <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh}/> : null}
                    </React.Fragment>
                  )
                }
                if(selectCard === 'Trash'){
                  return(
                    <React.Fragment key={index}>
                    {item.isPined && item.isDeleted === true ?
                      <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh}/> : null}
                  </React.Fragment>
                  )
                }
                if(selectCard === 'Reminder'){
                  return(
                    <React.Fragment key={index}>
                    {item.isPined && item.reminder !== undefined && item.isDeleted === false && item.isArchived === false ?
                      item.reminder.map((reminderIndex)=>(
                        <DisplayCard key={reminderIndex} item={item} setPinText={setPinText} setRefresh={setRefresh}/>
                      )): null
                    }
                  </React.Fragment>
                  )
                }
               return ( 
                 <React.Fragment key={index}>
                   {false && 
                   <DisplayCard key={index} item={item}/>}
                </React.Fragment>
                  )
                }
              )}
            </Grid> : null}
            {pinText ? <div className="otherText">Other</div>: null}
            {searchNote === '' ?
              <Grid
              container
              spacing={2}
              direction="row"
              alignItems="center"
              className="gridContainer"
            >
              {noteList.map((item, index) => {         
              if(selectCard === 'note'){
                return(
                  <React.Fragment key={index}>
                    {!item.isPined && !item.isArchived && item.isDeleted === false ?
                    <DisplayCard key={index} item={item} setRefresh={setRefresh} setPinText={setPinText} />:null}
                  </React.Fragment>
                )
              }

              if(selectCard === 'isArchived'){
                return(
                  <React.Fragment key={index}>
                    {!item.isPined && item.isArchived && item.isDeleted === false?
                      <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh}/> : null}
                  </React.Fragment>
                )
              }
              if(selectCard === 'Trash'){
                return(
                  <React.Fragment key={index}>
                  {!item.isPined && item.isDeleted === true ?
                    <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh}/> : null}
                  </React.Fragment>
                )
              }
              if(selectCard === 'Reminder'){
                return(
                  <React.Fragment key={index}>
                  {!item.isPined && item.reminder !== undefined && item.isDeleted === false && item.isArchived === false ?
                    item.reminder.map((reminderIndex)=>(
                      <DisplayCard key={reminderIndex} item={item} setPinText={setPinText} setRefresh={setRefresh}/>
                    )): null
                  }
                </React.Fragment>
                )
              }
               return ( 
                 <React.Fragment key={index}>
                   {item.noteLabels.map((labelItem,labelIndex)=>{
                     if(labelItem.label === selectCard){
                      return(
                        <DisplayCard key={labelIndex} item={item} setRefresh={setRefresh} setPinText={setPinText}/>
                      )
                    }
                    return(
                      <div key={labelIndex}>
                        {false &&
                      <DisplayCard key={index} item={item} />}
                      </div>
                    )
                    })}
                </React.Fragment>
                  )
                }
              )}
            </Grid> : null}
            {searchNote !== '' ?
              <Grid
              container
              className="gridContainer"
              spacing={2}
              direction="row"
              alignItems="center"
            >
              { noteList.map((searchItem, searchIndex)=>{
                return(
                  <React.Fragment key={searchIndex}>
                    {searchItem.title.includes(searchNote) && searchItem.isDeleted === false ?
                    <DisplayCard item={searchItem} setPinText={setPinText}/>: null
                    }
                  </React.Fragment>
                )
              })}
            </Grid>: null}
            </Container>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
