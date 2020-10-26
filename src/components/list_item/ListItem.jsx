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
      setItemList([...itemList, { itemName: items, status: "open" }]);
    }
  };

  const handleCheckItems = (item, index) => {
    itemList[index] = {
      ...itemList[index],
      status: item.status === "open" ? "close" : "open",
    };
    setItemList(itemList);
    setIsChecked(Math.random());
  };

  const handleRemovedItems = (item) => {
    var array = [...itemList];
    var index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
      setItemList(array);
    }
  };

  useEffect(() => {}, [isChecked]);

  return (
    <div>
      {itemList.length !== 0 && (
        <div>
          {itemList.map((item, index) => (
            <div key={index} className="checkItemsContainer">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={item.status === "open" ? false : true}
                    onChange={() => handleCheckItems(item, index)}
                    color="primary"
                  />
                }
                label={item.itemName}
              />
              <CloseIcon
                onClick={() => handleRemovedItems(item)}
                className="listItemCloseIcon"
              />
            </div>
          ))}
        </div>
      )}
      <Divider />
      <div className="listItemContainer">
        <Add />
        <InputBase
          value={items}
          className="inputBase"
          placeholder="List item"
          onChange={(e) => setItems(e.target.value)}
          onKeyPress={(event) => handleItemList(event)}
        />
        {items !== '' &&
            <CloseIcon className="listItemCloseIcon" onClick={() => setItems("")} />}
      </div>
      <Divider />
    </div>
  );
};

export default ListItem;
