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
import Trash from '../../images/trash.png'
import ReminderImage from "../../images/reminder.png"

const DashBoard = () => {
  const [showCard, setShowCard] = useState("take_note");
  const [noteList, setNoteList] = useState([]);
  const [collabUser, setCollabUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectCard, setSelectCard] = useState('note')
  const [pinText, setPinText] = useState(false)
  const [refresh, setRefresh] = useState(Math.random())
  const [searchNote, setSearchNote] = useState('')
  const [isGrid, setIsGrid] = useState(true)
  const [showCheckBox, setShowCheckBox] = useState(true)
  let count = 0
  let itemCount = 0
  let reminderArray = []

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

  const handleSearchNote = (title) => {
    if(title !== searchNote){
      count = count + 1 
    }
    return count
  }

  const handleReminderArray = (reminderLength, value) => {
    if(reminderLength === value){
      count = count + 1
    }
    return count
  }

  const handleItemLength = (itemLength, value) => {
    if(itemLength === value){
      itemCount = itemCount + 1
    }
    return itemCount
  }

  const handleFalseNote = (value) =>{
    if(value === false){
      count = count + 1
    }
    return count
  }

  const handleTrueNote = (value) =>{
    if(value === true){
      itemCount = itemCount + 1
    }
    return itemCount
  }

  return (
    <div>
      <Appbar selectCard={selectCard} 
      setSelectCard={setSelectCard} setRefresh={setRefresh} 
      setSearchNote={setSearchNote} setIsGrid={setIsGrid} isGrid={isGrid}/>
      <div className="noteContainer">
        {(showCard === "take_note" && selectCard !== 'Trash' && searchNote === '') ? (
          <Card
            className="cardContainer"
            onClick={() => setShowCard("create_note")}
          >
            <CardContent className="subCardContainer">
              <Typography className="noteTitle">Take a note...</Typography>
              <div className="imageCheckBoxContainer">
                <CheckBoxOutlinedIcon onClick={() => setShowCheckBox(false)}
                 style={{ cursor: 'pointer' }}/>
                <ImageIcon />
              </div>
            </CardContent>
          </Card>
        ) : null}
        {showCard === "create_note" ? (
          <CreateNote collabUser={collabUser} setShowCard={setShowCard} 
          setRefresh={setRefresh} setShowCheckBox={setShowCheckBox} showCheckBox={showCheckBox}/>
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
                      {item.isPined && item.isDeleted === false && !item.isArchived ?
                        <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh} isGrid={isGrid}/> : null}
                    </React.Fragment>
                  )
                }
                if(selectCard === 'isArchived'){
                  return(
                    <React.Fragment key={index}>
                      {item.isPined && item.isArchived && item.isDeleted === false ?
                        <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh} isGrid={isGrid}/> : null}
                    </React.Fragment>
                  )
                }
                if(selectCard === 'Trash'){
                  return(
                    <React.Fragment key={index}>
                    {item.isPined && item.isDeleted === true ?
                      <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh} isGrid={isGrid}/> : null}
                  </React.Fragment>
                  )
                }
                if(selectCard === 'Reminder'){
                  return(
                    <React.Fragment key={index}>
                    {item.isPined && item.reminder !== undefined && item.isDeleted === false && item.isArchived === false ?
                      item.reminder.map((reminderIndex)=>(
                      <DisplayCard key={reminderIndex} item={item} setPinText={setPinText} setRefresh={setRefresh} isGrid={isGrid}/>
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
                    <DisplayCard key={index} item={item} setRefresh={setRefresh} setPinText={setPinText} isGrid={isGrid}/>:null}
                  </React.Fragment>
                )
              }

              if(selectCard === 'isArchived'){
                return(
                  <React.Fragment key={index}>
                    {!item.isPined && item.isArchived && item.isDeleted === false?
                      <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh} isGrid={isGrid}/> : 
                        <React.Fragment>
                          {handleFalseNote(item.isArchived) === noteList.length - handleTrueNote(item.isArchived) &&
                           <div className="searchText">Archive note not found</div>
                          }
                        </React.Fragment>
                      }
                  </React.Fragment>
                )
              }
              if(selectCard === 'Trash'){
                return(
                  <React.Fragment key={index}>
                  {!item.isPined && item.isDeleted === true ?
                    <DisplayCard key={index} item={item} setPinText={setPinText} setRefresh={setRefresh} isGrid={isGrid}/> : 
                    <React.Fragment>
                      {handleFalseNote(item.isDeleted) === noteList.length - handleTrueNote(item.isDeleted) &&
                      <div className="trashContainer">
                        <img src={Trash} alt="trash" 
                        className="trashImage"
                        style={{width: '200px', height: '200px'}}/>
                      <div className="trashText">Trash note not found</div>  
                      </div>
                      }
                  </React.Fragment>
                    }
                  </React.Fragment>
                )
              }
              if(selectCard === 'Reminder'){
                return(
                  <React.Fragment key={index}>
                  {!item.isPined && item.reminder !== undefined && item.isDeleted === false && item.isArchived === false ?
                    item.reminder.map((reminderIndex)=>{
                      reminderArray.push(item)
                     return (<DisplayCard key={reminderIndex} item={item} setPinText={setPinText} setRefresh={setRefresh} isGrid={isGrid}/>)
                    }): <React.Fragment>
                      {
                        handleReminderArray(reminderArray.length, 0) === noteList.length - handleItemLength(item.reminder.length, 1) && 
                         <div className="trashContainer">
                           <img src={ReminderImage} 
                           alt="reminder"
                           className="trashImage"
                           style={{width: '200px', height: '200px'}}/>
                            <div className="trashText">Reminder note not found</div>
                         </div>
                      }
                    </React.Fragment>
                  }
                </React.Fragment>
                )
              }
               return ( 
                 <React.Fragment key={index}>
                   {item.noteLabels.map((labelItem,labelIndex)=>{
                     if(labelItem.label === selectCard){
                      return(
                        <DisplayCard key={labelIndex} item={item} setRefresh={setRefresh} setPinText={setPinText} isGrid={isGrid}/>
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
                    <DisplayCard item={searchItem} setPinText={setPinText} isGrid={isGrid}/>: 
                    <React.Fragment>
                      {handleSearchNote(searchItem.title) === noteList.length && 
                        <div className="searchText">No matching results.</div>
                      }
                    </React.Fragment>
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
