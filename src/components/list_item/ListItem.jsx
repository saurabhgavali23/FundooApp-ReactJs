import React from "react";
import { Add } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import {
  Divider,
  FormControlLabel,
  InputBase,
  Checkbox,
} from "@material-ui/core";
import "../list_item/ListItemCss.css";
import { useState } from "react";
import { useEffect } from "react";

const ListItem = ({ setShowCheckBox }) => {
  const [itemList, setItemList] = useState([]);
  const [items, setItems] = useState("");
  const [isChecked, setIsChecked] = useState(Math.random());

  const handleItemList = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13 && items !== "") {
      setItemList([...itemList, { value: items, check: false }]);
    }
  };

  const handleCheckItems = (item, index) => {
    itemList[index] = { ...itemList[index], check: !item.check };
    setItemList(itemList);
    setIsChecked(Math.random());
  };

  useEffect(() => {}, [isChecked]);

  return (
    <div>
      {itemList.length !== 0 && (
        <div>
          {itemList.map((item, index) => (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={item.check}
                    onChange={() => handleCheckItems(item, index)}
                    color="primary"
                  />
                }
                label={item.value}
              />
            </div>
          ))}
        </div>
      )}
      <Divider />
      <div className="listItemContainer">
        <Add />
        <InputBase
          className="inputBase"
          placeholder="List item"
          onChange={(e) => setItems(e.target.value)}
          onKeyPress={(event) => handleItemList(event)}
        />
        <CloseIcon
          className="listItemCloseIcon"
          onClick={() => setShowCheckBox(true)}
        />
      </div>
      <Divider />
    </div>
  );
};

export default ListItem;
