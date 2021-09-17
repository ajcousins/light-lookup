import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  temperatures,
  valueLabelFormat,
  hexColour,
} from "../panel-details/colour-temp";
import { cris, criImg, criLabelFormat } from "../panel-details/cri";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import BeamAngle from "../imgs/beam-angle/BeamAngle";

export default function LightQuality() {
  const [colourTemp, setColourTemp] = useState<number>(0);
  const [cri, setCri] = useState<number>(0);
  const [beamAngle, setBeamAngle] = useState<number>(0);
  const [diffuse, setDiffuse] = useState(false);

  const handleColourTempChange = (e: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setColourTemp(newValue);
    }
  };

  const handleCriChange = (e: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setCri(newValue);
    }
  };

  const handleBeamAngleChange = (e: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setBeamAngle(newValue);
    }
  };
  return (
    <div className='panel__light-quality-inner'>
      <div className='panel__tile'>
        <div
          className='panel__colour-temp-box'
          style={{ backgroundColor: hexColour(colourTemp) }}
        />
        <Box sx={{ width: 250 }}>
          <p className='label'>Colour Temperature</p>
          <Slider
            // aria-label='Small Steps'
            defaultValue={3000}
            valueLabelFormat={valueLabelFormat}
            // getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay='auto'
            marks={temperatures}
            min={1800}
            max={6500}
            value={colourTemp}
            onChange={handleColourTempChange}
            // color='secondary'
            size='small'
          />
        </Box>
      </div>
      <div className='panel__tile'>
        <div className='panel__cri-box'>
          <img src={criImg(cri)} alt='CRI' />
        </div>
        <Box sx={{ width: 250 }}>
          <p className='label'>Minimum Colour Rendering Index</p>
          <Slider
            // aria-label='Small Steps'
            defaultValue={80}
            valueLabelFormat={criLabelFormat}
            // getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay='auto'
            marks={cris}
            min={60}
            max={100}
            value={cri}
            onChange={handleCriChange}
            // color='secondary'
            size='small'
          />
        </Box>
      </div>
      <div className='panel__tile'>
        <div
          className='panel__colour-temp-box'
          // style={{ backgroundColor: hexColour(colourTemp) }}
        >
          <BeamAngle value={diffuse ? 200 : beamAngle} />
        </div>
        <Box sx={{ width: 250 }}>
          <p className='label'>Beam Angle</p>
          <Slider
            aria-label='Default'
            defaultValue={70}
            valueLabelFormat={(val) => `${val}°`}
            // // getAriaValueText={valuetext}
            // step={null}
            valueLabelDisplay='auto'
            // marks={temperatures}
            min={1}
            max={120}
            value={beamAngle}
            onChange={handleBeamAngleChange}
            // color='secondary'
            size='small'
            disabled={diffuse}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "-0.75em",
              // justifyContent: "right",
              // marginRight: 0,
              // marginLeft: "auto",
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label=''
              // value='check'
              onChange={() => {
                setDiffuse(!diffuse);
              }}
            />

            <div className='label' style={{ marginLeft: "-2em" }}>
              Diffuse
            </div>
          </div>
          {/* <ToggleButton
                value='check'
                selected={diffuse}
                onChange={() => {
                  setDiffuse(!diffuse);
                }}
              >
                Diffuse
              </ToggleButton> */}
        </Box>
      </div>
    </div>
  );
}
