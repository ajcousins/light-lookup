import React from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { bodyColours, getBodyColourHex } from "../panel-details/bodyColour";
import overlay from "../imgs/body-colour/overlay.svg";
import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateBodyColour } from "../features/query/querySlice";

export default function BodyColour() {
  const bodyColour = useSelector((state: RootState) => state.query.bodyColour);
  const dispatch = useDispatch();

  const handleBodyColourChange = (e: SelectChangeEvent) => {
    dispatch(updateBodyColour(e.target.value as string));
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
            <MenuItem value={colour.value} key={colour.value}>
              {colour.output}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
