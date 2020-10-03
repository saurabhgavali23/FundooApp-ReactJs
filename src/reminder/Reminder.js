import React, { useState } from "react";
import ReminderIcon from "@material-ui/icons/Notifications";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../reminder/ReminderCss.css";
import { Button, Card, CardContent, Divider, Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import moment from "moment";

const Reminder = ({setDateTimeChip}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showReminder, setShowReminder] = useState(false);
  const [showDateTime, setShowDateTime] = useState(false);

  const handleDateChange = (day) => {
    setShowDateTime(false)
    setShowReminder(false)
    let time = ''
    let date = ''
    if(day === 'today'){
        date = moment(selectedDate).format("MMM Do YY")
        time = '8:00PM'
    }else if(day === 'tomorrow'){
        date = moment(selectedDate).add(1,'day').format("MMM Do YY")
        time = '8:00AM'
    }
    else{
        date = moment(selectedDate).format("MMM Do YY")
        time = moment(selectedDate).format("LT")
    }
    setDateTimeChip(date+' '+time)
  };

  return (
    <div>
      <ReminderIcon
        className="reminderContainer"
        onClick={() => setShowReminder(!showReminder)}
      />
      {showReminder ? (
        <div className="dateTimeContainer">
          <Card style={{ width: 300, height: 220 }}>
            <div className="dateTimeCardContainer">
              <CardContent className="dateTimeCardContentReminder">
                Reminder:
              </CardContent>
              <CardContent className="dateTimeCardContentStyle">
                <div className="dateTimeSubCardcontentStyle"
                    onClick={()=>handleDateChange('today')}
                >
                  Later Today
                  <div>8:00PM</div>
                </div>
                <div className="dateTimeSubCardcontentStyle"
                    onClick={()=>handleDateChange('tomorrow')}
                >
                  Tomorrow
                  <div>8:00AM</div>
                </div>
                <div
                  className="pickDateTimeLabel"
                  onClick={() => setShowDateTime(!showDateTime)}
                >
                  <AccessTimeIcon style={{ marginRight: "4%" }} />
                  Pick date & time
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      ) : null}
      {showDateTime ? (
        <div style={{ position: "absolute" }}>
          <Card style={{ width: 300, height: 250 }}>
            <CardContent
              className="dateTimePickerContainer"
              onClick={() => setShowDateTime(!showDateTime)}
            >
              <ArrowBackIcon style={{ marginRight: "7%" }} />
              <div>Pick date & time</div>
            </CardContent>
            <Divider />
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar={false}
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <div className="saveButton">
                <Button color="primary" variant="text" onClick={()=>handleDateChange()}>
                  save
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default Reminder;
