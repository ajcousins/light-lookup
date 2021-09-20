import React, { useState } from "react";
import Panel from "./Panel";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { bodyColours } from "../panel-details/bodyColour";
import LightQuality from "./LightQuality";
import Dimensions from "./Dimensions";
import MountingConditions from "./MountingConditions";
import BodyColour from "./BodyColour";

export default function Dashboard() {
  const [ipRating, setIpRating] = useState("");

  const handleIpRatingChange = (e: SelectChangeEvent) => {
    setIpRating(e.target.value as string);
  };

  return (
    <div className='dashboard'>
      <Panel title='Mounting Condition' className='full-height'>
        <MountingConditions />
      </Panel>
      <Panel title='Body Colour' className='short-upper'>
        <BodyColour />
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
      <Panel title='Dimensions' className='full-height'>
        <Dimensions />
      </Panel>
      <Button variant='contained'>Search</Button>
    </div>
  );
}
