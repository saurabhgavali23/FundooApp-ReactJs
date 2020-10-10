import { Card, CardContent, Chip, Grid } from "@material-ui/core";
import React from "react";
import './DisplayCardCss.css'

const DisplayCard = ({ item }) => {
  return (
      <div className="createMainContainer">
      <Grid item >
        <Card style={{ height: 200, width: 200, backgroundColor: item.color}} className="createCardContainer">
          <div className="createCardContent">
            <CardContent className="createCardHeaderContend">
              {item.title}
            </CardContent>
            <CardContent className="createContentStyle">{item.description}</CardContent>
            <div>
              {item.noteLabels !== undefined ? (
                item.noteLabels.map((item,index)=>(
                  <Chip
                    label={item.label}
                    key={index}
                  />
                ))
              ):null}
            </div>
          </div>
        </Card>
      </Grid>
      </div>
  );
};

export default DisplayCard;
