import { Typography } from "@material-ui/core";
import React from "react";
import "../note_features/NoteFeatures.css";
import FeatureTabPanel from "../tab_panel/FeatureTabPanel";

const NoteFeatures = () => {
  return (
    <div className="featureMainContainer">
      <div className="featureHeaderText">
        <Typography variant="body1" className="featureTitleText1">
          Advance Pack Details
        </Typography>
        <Typography variant="body1" className="featureTitleText2">
          $99/monthe
        </Typography>
      </div>
      <div>
        <FeatureTabPanel />
      </div>
    </div>
  );
};

export default NoteFeatures;
