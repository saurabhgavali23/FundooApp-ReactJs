import {
  AppBar,
  Backdrop,
  Card,
  CardContent,
  Container,
  Fade,
  Grid,
  Modal,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import NoteFeatures from "../note_features/NoteFeatures";
import "../user_authorization/UserAuthentication.css";

const UserAuthorization = () => {
  const [openModal, setOpenModal] = useState(false);
  const [serviceText, setServiceText] = useState("");
  const [priceText, setPriceText] = useState("");

  const handelText = (value) => {
    setOpenModal(!openModal);
    if (value === "advance") {
      setServiceText("Advanced");
      setPriceText("$99/month");
    } else {
      setServiceText("Basic");
      setPriceText("$49/month");
    }
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" noWrap>
            FundooApp
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="mainHomeContainer">
        <Grid container className="gridHomeContainer" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" className="offerText">
              fundooNotes offered. Choose below service to Register.
            </Typography>
            <Grid
              container
              justify="center"
              spacing={2}
              className="subGridContainer"
            >
              <Grid item>
                <Card className="paper" onClick={() => handelText("advance")}>
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
                <Typography className="cartText">ADD TO CART</Typography>
              </Grid>
              <Grid item>
                <Card className="paper" onClick={() => handelText("basic")}>
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
                <Typography className="cartText">ADD TO CART</Typography>
              </Grid>
            </Grid>
            <Grid item className="linkText">
              <Link to="/login">{"Sign in insted"}</Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
        closeAfterTransition
        className="modal"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <NoteFeatures
            serviceText={serviceText}
            priceText={priceText}
            setOpenModal={setOpenModal}
          />
        </Fade>
      </Modal>
    </div>
  );
};

export default UserAuthorization;
