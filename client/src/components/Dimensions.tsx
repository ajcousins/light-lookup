import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
// import DimensionModel from "../imgs/dimensions/DimensionModel";
import ThreeObj from "./ThreeObj";

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function Dimensions() {
  const [length, setLength] = useState<
    number | string | Array<number | string>
  >(250);
  const [width, setWidth] = useState<number | string | Array<number | string>>(
    250
  );
  const [height, setHeight] = useState<
    number | string | Array<number | string>
  >(250);

  const handleLengthChange = (
    e: Event | null,
    newValue: number | number[] | null
  ) => {
    if (typeof newValue === "number") setLength(newValue);
  };

  const handleWidthChange = (
    e: Event | null,
    newValue: number | number[] | null
  ) => {
    if (typeof newValue === "number") setWidth(newValue);
  };

  const handleHeightChange = (
    e: Event | null,
    newValue: number | number[] | null
  ) => {
    if (typeof newValue === "number") setHeight(newValue);
  };

  const handleLengthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLength(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleWidthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWidth(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleHeightInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHeight(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (length < 0) {
      setLength(0);
    } else if (length > 100) {
      setLength(100);
    }
  };

  return (
    <div className='panel__light-quality-inner'>
      <div className='panel__tile'>
        <div className='panel__dimensions-box'>
          <ThreeObj length={length} width={width} height={height} />
        </div>
        <Box sx={{ width: 250 }}>
          <p className='label'>Max Length</p>
          <div className='panel__dimension-tile'>
            <Slider
              aria-label='Default'
              defaultValue={250}
              valueLabelFormat={(val) => `${val}mm`}
              // // getAriaValueText={valuetext}
              // step={null}
              valueLabelDisplay='auto'
              // marks={temperatures}
              min={1}
              max={500}
              // value={length}
              onChange={handleLengthChange}
              // color='secondary'
              size='small'
              name='length'
              value={typeof length === "number" ? length : 0}
            />
            <Input
              value={length}
              size='small'
              onChange={handleLengthInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 1,
                max: 500,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </div>
          <p className='label'>Max Width</p>
          <div className='panel__dimension-tile'>
            <Slider
              aria-label='Default'
              defaultValue={250}
              valueLabelFormat={(val) => `${val}mm`}
              valueLabelDisplay='auto'
              min={1}
              max={500}
              onChange={handleWidthChange}
              size='small'
              name='width'
              value={typeof width === "number" ? width : 0}
            />
            <Input
              value={width}
              size='small'
              onChange={handleWidthInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 1,
                max: 500,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </div>

          <p className='label'>Max Height</p>
          <div className='panel__dimension-tile'>
            <Slider
              aria-label='Default'
              defaultValue={250}
              valueLabelFormat={(val) => `${val}mm`}
              valueLabelDisplay='auto'
              min={1}
              max={500}
              onChange={handleHeightChange}
              size='small'
              name='height'
              value={typeof height === "number" ? height : 0}
            />
            <Input
              value={height}
              size='small'
              onChange={handleHeightInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 1,
                max: 500,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </div>
        </Box>
      </div>
    </div>
  );
}
