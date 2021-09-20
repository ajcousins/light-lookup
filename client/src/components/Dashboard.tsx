import React from "react";
import Panel from "./Panel";

import Button from "@mui/material/Button";

import LightQuality from "./LightQuality";
import Dimensions from "./Dimensions";
import MountingConditions from "./MountingConditions";
import BodyColour from "./BodyColour";
import IpRating from "./IpRating";

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <Panel title='Mounting Condition' className='full-height'>
        <MountingConditions />
      </Panel>
      <Panel title='Body Colour' className='short-upper'>
        <BodyColour />
      </Panel>
      <Panel title='IP Rating' className='short-lower'>
        <IpRating />
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
