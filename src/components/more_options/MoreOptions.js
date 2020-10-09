import React, { useState } from "react";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Card, CardContent, ClickAwayListener } from "@material-ui/core";
import "./MoreOptionsCss.css";
import Labels from "../labels/Labels";
const MoreOptions = () => {
  const [isMoreIcon, setIsMoreIcon] = useState(false);
  const [showAddLabel, setShowAddLabel] = useState(false);

  const handleOptions = () => {
    setShowAddLabel(!showAddLabel);
    setIsMoreIcon(!isMoreIcon);
  };

  const handleClickAway = () => {
    setShowAddLabel(false);
    setIsMoreIcon(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <MoreIcon
          className="moreIcon"
          onClick={() => setIsMoreIcon(!isMoreIcon)}
        />
        {isMoreIcon ? (
          <Card
            className="moreOptionCardContainer"
          >
            <CardContent
              className="moreOptionCardContent"
              onClick={() => handleOptions()}
            >
              Add label
            </CardContent>
          </Card>
        ) : null}
        {showAddLabel ? <Labels /> : null}
      </div>
    </ClickAwayListener>
  );
};

export default MoreOptions;
