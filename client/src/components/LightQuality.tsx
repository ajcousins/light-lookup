import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  temperatures,
  valueLabelFormat,
  hexColour,
} from "../panel-details/colour-temp";
import { cris, criImg, criLabelFormat } from "../panel-details/cri";
import BeamAngle from "../imgs/beam-angle/BeamAngle";
import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  updateColourTemp,
  updateCri,
  updateBeamAngle,
} from "../features/query/querySlice";

export default function LightQuality() {
  const dispatch = useDispatch();
  const [diffuse, setDiffuse] = useState(false);

  const colourTemp = useSelector((state: RootState) => state.query.colourTemp);
  const cri = useSelector((state: RootState) => state.query.cri);
  const beamAngle = useSelector((state: RootState) => state.query.beamAngle);

  const handleColourTempChange = (e: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch(updateColourTemp(newValue));
    }
  };

  const handleCriChange = (e: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch(updateCri(newValue));
    }
  };

  const handleBeamAngleChange = (e: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch(updateBeamAngle(newValue));
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
          <div className='panel__tile__bottom-bar'>
            <button
              className={!colourTemp ? "outline" : ""}
              onClick={() => dispatch(updateColourTemp(0))}
            >
              RESET
            </button>
          </div>
        </Box>
      </div>
      <div className='panel__tile'>
        <div className='panel__cri-box'>
          {cri ? (
            <img src={criImg(cri)} alt='CRI' />
          ) : (
            <div style={{ backgroundColor: "#a0a0a0", height: "inherit" }} />
          )}
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
          <div className='panel__tile__bottom-bar'>
            <button
              className={!cri ? "outline" : ""}
              onClick={() => dispatch(updateCri(0))}
            >
              RESET
            </button>
          </div>
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
          <div className='panel__tile__bottom-bar'>
            <button
              className={!beamAngle ? "outline" : ""}
              onClick={() => dispatch(updateBeamAngle(0))}
            >
              RESET
            </button>
            <button
              onClick={() => {
                setDiffuse(!diffuse);
              }}
              className={diffuse ? "outline" : ""}
            >
              DIFFUSE
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
}
