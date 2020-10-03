import { Card, CardContent, Grid } from "@material-ui/core";
import React from "react";
import '../display_card/DisplayCardCss.css'

const DisplayCard = ({ item }) => {
  return (
      <div className="createMainContainer">
      <Grid item >
        <Card style={{ height: 200, width: 200}}>
          <div className="createCardContent">
            <CardContent className="createCardHeaderContend">
              {item.title}
            </CardContent>
            <CardContent className="createContentStyle">{item.description}</CardContent>
          </div>
        </Card>
      </Grid>
      </div>
  );
};

export default DisplayCard;