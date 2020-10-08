import React, { useState } from "react";
import ColorIcon from "@material-ui/icons/ColorLensOutlined";
import { Card } from "@material-ui/core";
import "./ColorListCss.css";

const ColorList = ({ setBgColor }) => {
  const [showColorList, setShowColorList] = useState(false);

  const DATA = [
    { title: "MAROON", id: "#800000" },
    { title: "WHITE", id: "#FFFFFF" },
    { title: "salmon5", id: "#CFAFAF" },
    { title: "dustyrose", id: "#D0C0C0" },
    { title: "indianred4", id: "#DBA9A9" },
    { title: "brown", id: "#DF9D9D" },
    { title: "OLIVE", id: "#808000" },
    { title: "LIME", id: "#00FF00" },
    { title: "GREEN", id: "#008000" },
    { title: "AQUA", id: "#00FFFF" },
    { title: "TEAL", id: "#008080" },
    { title: "NAVY", id: "#000080" },
    { title: "INDIANRED", id: "#CD5C5C" },
    { title: "rosybrown", id: "#CFAFAF" },
    { title: "indianred", id: "#EABCBC" },
    { title: "firebrick5", id: "#E69898" },
    { title: "strawberry", id: "#EDA2A2" },
    { title: "bloodred", id: "#FF6666" },
  ];

  const selectColor = (value) => {
    setBgColor(value);
  };

  return (
    <div>
      <ColorIcon onClick={() => setShowColorList(!showColorList)} className="colorIcon"/>
      {showColorList ? (
        <Card
          className="colorCardContainer"
          style={{ width: 200, height: 150 }}
        >
          {DATA.map((item, index) => (
            <button
              onClick={() => selectColor(item.id)}
              key={index}
              className="button"
              style={{ backgroundColor: item.id }}
            ></button>
          ))}
        </Card>
      ) : null}
    </div>
  );
};

export default ColorList;
