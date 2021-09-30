import React, { useState } from "react";
import { mountingTypes, getFormatted } from "../panel-details/mounting";

import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateMounting } from "../features/query/querySlice";

interface IState {
  buttonStatus: {
    [key: string]: boolean;
  };
}

export default function MountingConditions() {
  const [buttonStatus, setButtonStatus] = useState<IState["buttonStatus"]>({
    "ceiling-mounted": true,
    "ceiling-recessed": true,
    suspended: true,
    "wall-mounted": true,
    "wall-recessed": true,
    "track-mounted": true,
    "floor-mounted": true,
    "floor-recessed": true,
    freestanding: true,
    "node-systems": true,
    "linear-systems": true,
    "area-systems": true,
  });

  const mounting = useSelector((state: RootState) => state.query.mounting);
  const dispatch = useDispatch();

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    type: { img: string; kebab: string }
  ) => {
    // If there is nothing selected...
    if (!mounting) {
      dispatch(updateMounting(type.kebab));
      const keys = Object.keys(buttonStatus);
      const buttonStatusCopy = { ...buttonStatus };
      keys.forEach((key) => {
        if (type.kebab !== key) buttonStatusCopy[key] = false;
      });
      setButtonStatus(buttonStatusCopy);
    }

    // If this tile is already selected...
    else if (type.kebab === mounting) {
      dispatch(updateMounting(""));
      const keys = Object.keys(buttonStatus);
      const buttonStatusCopy = { ...buttonStatus };
      keys.forEach((key) => (buttonStatusCopy[key] = true));
      setButtonStatus(buttonStatusCopy);
    }

    // If this tile is not already selected...
    else if (type.kebab !== mounting) {
      dispatch(updateMounting(type.kebab));
      const keys = Object.keys(buttonStatus);
      const buttonStatusCopy = { ...buttonStatus };
      keys.forEach((key) => {
        if (type.kebab !== key) {
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
            style={{ display: "flex", alignItems: "center" }}
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              handleClick(event, type)
            }
            key={type.kebab}
          >
            <img
              className={
                buttonStatus[type.kebab]
                  ? type.kebab === mounting
                    ? "selected icons"
                    : "icons"
                  : "disabled icons"
              }
              src={type.img}
              alt={getFormatted(type.kebab)}
              id={getFormatted(type.kebab)}
            />
            <p className='label'>{getFormatted(type.kebab)}</p>
          </div>
        );
      })}
    </div>
  );
}
