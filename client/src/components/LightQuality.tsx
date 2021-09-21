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
import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { updateColourTemp } from "../features/query/querySlice";

export default function LightQuality() {
  const dispatch = useDispatch();
  const [cri, setCri] = useState<number>(0);
  const [beamAngle, setBeamAngle] = useState<number>(0);
  const [diffuse, setDiffuse] = useState(false);

  const colourTemp = useSelector((state: RootState) => state.query.colourTemp);

  const handleColourTempChange = (e: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch(updateColourTemp(newValue));
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
            defaultValue={3000}
            valueLabelFormat={valueLabelFormat}
            step={null}
            valueLabelDisplay='auto'
            marks={temperatures}
            min={1800}
            max={6500}
            value={colourTemp}
            onChange={handleColourTempChange}
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
            defaultValue={80}
            valueLabelFormat={criLabelFormat}
            step={null}
            valueLabelDisplay='auto'
            marks={cris}
            min={60}
            max={100}
            value={cri}
            onChange={handleCriChange}
            size='small'
          />
        </Box>
      </div>
      <div className='panel__tile'>
        <div className='panel__colour-temp-box'>
          <BeamAngle value={diffuse ? 200 : beamAngle} />
        </div>
        <Box sx={{ width: 250 }}>
          <p className='label'>Beam Angle</p>
          <Slider
            aria-label='Default'
            defaultValue={70}
            valueLabelFormat={(val) => `${val}°`}
            valueLabelDisplay='auto'
            min={1}
            max={120}
            value={beamAngle}
            onChange={handleBeamAngleChange}
            size='small'
            disabled={diffuse}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "-0.75em",
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label=''
              onChange={() => {
                setDiffuse(!diffuse);
              }}
            />

            <div className='label' style={{ marginLeft: "-2em" }}>
              Diffuse
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
