import { AppBar, Card, CardContent, Container, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import "../user_authorization/UserAuthentication.css";

const UserAuthorization = () => {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" noWrap>
            FundooApp
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Grid container className="gridContainer" alignItems="center">
          <Grid item xs={12}>
            <Grid
              container
              justify="center"
              spacing={2}
              className="subGridContainer"
            >
              <Grid item>
                <Card className="paper">
                  <CardContent className="headerText">
                    price: $99 per month
                  </CardContent>
                  <CardContent className="serviceText">advance</CardContent>
                  <div className="bulletPointdiv">
                    <div className="bulletPoint">{"\u2022"}</div>
                    <div className="priceTag">$99/month</div>
                  </div>
                  <div className="bulletPointdiv">
                    <div className="bulletPoint">{"\u2022"}</div>
                    <div className="priceTag">
                      Ability to add title, description, images, labels,
                      checklist and colors
                    </div>
                  </div>
                </Card>
              </Grid>
              <Grid item>
                <Card className="paper">
                  <CardContent className="headerText">
                    price: $49 per month
                  </CardContent>
                  <CardContent className="serviceText">basic</CardContent>
                  <div className="bulletPointdiv">
                    <div className="bulletPoint">{"\u2022"}</div>
                    <div className="priceTag">$49/month</div>
                  </div>
                  <div className="bulletPointdiv">
                    <div className="bulletPoint">{"\u2022"}</div>
                    <div className="priceTag">
                      Ability to add only title and description
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserAuthorization;
