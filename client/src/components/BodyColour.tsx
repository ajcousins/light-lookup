import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { bodyColours } from "../panel-details/bodyColour";
import overlay from "../imgs/body-colour/overlay.svg";

export default function BodyColour() {
  const [bodyColour, setBodyColour] = useState("");

  const handleBodyColourChange = (e: SelectChangeEvent) => {
    setBodyColour(e.target.value as string);
  };

  const getBodyColourHex = (colourString: string) => {
    const index = bodyColours.findIndex(
      (colour) => colour.value === colourString
    );
    return bodyColours[index].hex;
  };

  return (
    <div className='panel__body-colour-inner'>
      <div
        className='panel__body-colour-box'
        style={{ backgroundColor: getBodyColourHex(bodyColour) }}
      >
        {bodyColour && (
          <img src={overlay} style={{ height: "inherit" }} alt='body colour' />
        )}
        {bodyColour === "custom" && <div>?</div>}
      </div>
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
  );
}
