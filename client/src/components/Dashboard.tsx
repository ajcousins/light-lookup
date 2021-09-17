import React, { useState } from "react";
import Panel from "./Panel";
import { mountingTypes } from "../panel-details/mounting";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { bodyColours } from "../panel-details/bodyColour";
import LightQuality from "./LightQuality";

export default function Dashboard() {
  const [bodyColour, setBodyColour] = useState("");
  const [ipRating, setIpRating] = useState("");

  const handleBodyColourChange = (e: SelectChangeEvent) => {
    setBodyColour(e.target.value as string);
  };

  const handleIpRatingChange = (e: SelectChangeEvent) => {
    setIpRating(e.target.value as string);
  };

  // useEffect(() => {
  //   console.log("colourTemp:", colourTemp);
  //   console.log("diffuse:", diffuse);
  // }, [colourTemp, diffuse]);

  return (
    <div className='dashboard'>
      <Panel title='Mounting Condition' className='full-height'>
        <div className='panel__mounting-inner'>
          {mountingTypes.map((type) => {
            return (
              <div className='panel__tile'>
                <img src={type.img} alt={type.type} />
                <p className='label'>{type.type}</p>
              </div>
            );
          })}
        </div>
      </Panel>
      <Panel title='Body Colour' className='short-upper'>
        <div className='panel__body-colour-inner'>
          <div className='panel__body-colour-box' />
          <FormControl variant='standard'>
            <Select
              labelId='body-colour-label'
              id='body-colour'
              value={bodyColour}
              label='Body Colour'
              onChange={handleBodyColourChange}
              size='small'
            >
              {bodyColours.map((colour) => (
                <MenuItem value={colour.value}>{colour.output}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Panel>
      <Panel title='IP Rating' className='short-lower'>
        <div className='panel__ip-rating-inner'>
          <div className='panel__ip-rating-box' />
          <FormControl variant='standard'>
            <Select
              labelId='ip-rating-label'
              id='ip-rating'
              value={ipRating}
              label='IP Rating'
              onChange={handleIpRatingChange}
              size='small'
            >
              {bodyColours.map((colour) => (
                <MenuItem value={colour.value}>{colour.output}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Panel>
      <Panel title='Light Quality' className='full-height'>
        <LightQuality />
      </Panel>
      <Panel title='Dimensions' className='full-height' />
      <Button variant='contained'>Search</Button>
    </div>
  );
}

// const valueLabelFormat = (value: number) => {
//   return `${value} K`;
// };
