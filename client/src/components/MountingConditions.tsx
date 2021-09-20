import React, { useState } from "react";
import { mountingTypes } from "../panel-details/mounting";

interface IState {
  buttonStatus: {
    [key: string]: boolean;
  };
}

export default function MountingConditions() {
  const [buttonStatus, setButtonStatus] = useState<IState["buttonStatus"]>({
    "Ceiling Mounted": true,
    "Ceiling Recessed": true,
    Suspended: true,
    "Wall Mounted": true,
    "Wall Recessed": true,
    "Track Mounted": true,
    "Floor / Surface Mounted": true,
    "Floor Recessed": true,
    Freestanding: true,
    "Node Systems": true,
    "Linear Systems": true,
    "Area Systems": true,
  });

  const [selected, setSelected] = useState("");

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    type: { type: string; img: string }
  ) => {
    // If there is nothing selected...
    if (!selected) {
      setSelected(type.type);
      const keys = Object.keys(buttonStatus);
      const buttonStatusCopy = { ...buttonStatus };
      keys.forEach((key) => {
        if (type.type !== key) buttonStatusCopy[key] = false;
      });
      setButtonStatus(buttonStatusCopy);
    }

    // If this tile is already selected...
    else if (type.type === selected) {
      setSelected("");
      const keys = Object.keys(buttonStatus);
      const buttonStatusCopy = { ...buttonStatus };
      keys.forEach((key) => (buttonStatusCopy[key] = true));
      setButtonStatus(buttonStatusCopy);
    }

    // If this tile is not already selected...
    else if (type.type !== selected) {
      setSelected(type.type);
      const keys = Object.keys(buttonStatus);
      const buttonStatusCopy = { ...buttonStatus };
      keys.forEach((key) => {
        if (type.type !== key) {
          buttonStatusCopy[key] = false;
        } else buttonStatusCopy[key] = true;
      });
      setButtonStatus(buttonStatusCopy);
    }
  };

  return (
    <div className='panel__mounting-inner'>
      {mountingTypes.map((type) => {
        return (
          <div
            className='panel__tile panel__mounting-tile'
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              handleClick(event, type)
            }
          >
            <img
              className={
                buttonStatus[type.type]
                  ? type.type === selected
                    ? "selected"
                    : ""
                  : "disabled"
              }
              src={type.img}
              alt={type.type}
              id={type.type}
            />
            <p className='label'>{type.type}</p>
          </div>
        );
      })}
    </div>
  );
}
