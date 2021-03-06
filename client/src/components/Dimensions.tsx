import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { sliderStyle } from "../panel-details/custom-styles";
import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
import ThreeObj from "./ThreeObj";
import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMaxLength,
  updateMaxWidth,
  updateMaxHeight,
} from "../features/query/querySlice";

interface IState {
  activeFace: {
    [key: string]: boolean;
  };
}

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function Dimensions() {
  const dispatch = useDispatch();
  const length = useSelector((state: RootState) => state.query.maxLength);
  const width = useSelector((state: RootState) => state.query.maxWidth);
  const height = useSelector((state: RootState) => state.query.maxHeight);

  const [activeFace, setActiveFace] = useState<IState["activeFace"]>({
    length: false,
    width: false,
    height: false,
  });

  const handleLengthChange = (
    e: Event | null,
    newValue: number | number[] | null
  ) => {
    if (typeof newValue === "number") dispatch(updateMaxLength(newValue));
  };

  const handleWidthChange = (
    e: Event | null,
    newValue: number | number[] | null
  ) => {
    if (typeof newValue === "number") dispatch(updateMaxWidth(newValue));
  };

  const handleHeightChange = (
    e: Event | null,
    newValue: number | number[] | null
  ) => {
    if (typeof newValue === "number") dispatch(updateMaxHeight(newValue));
  };

  const handleLengthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateMaxLength(Number(event.target.value)));
  };

  const handleWidthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateMaxWidth(Number(event.target.value)));
  };

  const handleHeightInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateMaxHeight(Number(event.target.value)));
  };

  const handleBlur = (dimension: number, label: string) => {
    if (dimension < 0) {
      switch (label) {
        case "length":
          dispatch(updateMaxLength(1));
          break;
        case "width":
          dispatch(updateMaxWidth(1));
          break;
        case "height":
          dispatch(updateMaxHeight(1));
          break;
      }
    } else if (dimension > 100) {
      switch (label) {
        case "length":
          dispatch(updateMaxLength(500));
          break;
        case "width":
          dispatch(updateMaxWidth(500));
          break;
        case "height":
          dispatch(updateMaxHeight(500));
          break;
      }
    }
  };

  const handleResize = (face: string, action: string) => {
    const activeFaceCopy: { [key: string]: boolean } = { ...activeFace };
    if (action === "down") {
      activeFaceCopy[face] = true;
      setActiveFace(activeFaceCopy);
    } else if (action === "up") {
      activeFaceCopy[face] = false;
      setActiveFace(activeFaceCopy);
    }
  };

  return (
    <div className='panel__light-quality-inner'>
      <div className='panel__tile'>
        <div className='panel__dimensions-box'>
          <ThreeObj
            length={length}
            width={width}
            height={height}
            activeFace={activeFace}
          />
        </div>
        <Box sx={{ width: 250 }}>
          <p className='label'>Max Length</p>
          <div
            className='panel__dimension-tile'
            onMouseDown={() => handleResize("length", "down")}
            onMouseUp={() => handleResize("length", "up")}
          >
            <Slider
              aria-label='Default'
              defaultValue={250}
              valueLabelFormat={(val) => `${val}mm`}
              valueLabelDisplay='auto'
              min={1}
              max={500}
              onChange={handleLengthChange}
              size='small'
              name='length'
              value={typeof length === "number" ? length : 0}
              sx={sliderStyle}
            />
            <Input
              value={length}
              size='small'
              onChange={handleLengthInputChange}
              onBlur={() => handleBlur(length, "length")}
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
          <div
            className='panel__dimension-tile'
            onMouseDown={() => handleResize("width", "down")}
            onMouseUp={() => handleResize("width", "up")}
          >
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
              sx={sliderStyle}
            />
            <Input
              value={width}
              size='small'
              onChange={handleWidthInputChange}
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
          <div
            className='panel__dimension-tile'
            onMouseDown={() => handleResize("height", "down")}
            onMouseUp={() => handleResize("height", "up")}
          >
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
              sx={sliderStyle}
            />
            <Input
              value={height}
              size='small'
              onChange={handleHeightInputChange}
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
