import {
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import "./LabelsCss.css";

const Labels = () => {
  const [label, setLabel] = useState("");
  const [addLabel, setAddLabel] = useState([]);
  const [isChecked, setIsChecked] = useState(Math.random());

  const handleLabels = () => {
    setAddLabel([...addLabel, { value: label, check: false }]);
  };

  const handleCheckedValue = (item, index) => {
    addLabel[index] = { ...addLabel[index], check: !item.check };
    setAddLabel(addLabel);
    setIsChecked(Math.random());
  };

  useEffect(() => {}, [isChecked]);

  return (
    <div>
      <Card className="labelCardContainer">
        <CardContent className="labelCardContent">Label note</CardContent>
        <div className="labelInput">
          <InputBase
            placeholder="Enter label name"
            className="labelBaseInput"
            style={{ fontSize: 15 }}
            onChange={(e) => setLabel(e.target.value)}
          />
          <SearchIcon style={{ fontSize: 15 }} />
        </div>
        <Divider />
        <div>
          {label !== "" ? (
            <div
              className="labelCreateLabelContainer"
              onClick={() => handleLabels()}
            >
              <AddIcon style={{ fontSize: 15 }} />
              <div className="createLabelText">Create {label}</div>
            </div>
          ) : null}
        </div>
        <div>
          {addLabel.length ? (
            <div>
              {addLabel.map((item, index) => (
                <div key={index} className="labelCheckBoxContainer">
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={item.check}
                        onChange={() => handleCheckedValue(item, index)}
                        color="primary"
                      />
                    }
                    label={item.value}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default Labels;
