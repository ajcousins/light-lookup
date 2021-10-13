import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { sliderStyle } from "../panel-details/custom-styles";
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
import CircleBeam from "../imgs/colour-temp/ColourTempCirlce";

export default function LightQuality() {
  const dispatch = useDispatch();
  const [diffuse, setDiffuse] = useState(false);
  const [beamAngle, setBeamAngle] = useState(0);

  const colourTemp = useSelector((state: RootState) => state.query.colourTemp);
  const cri = useSelector((state: RootState) => state.query.cri);
  // const beamAngle = useSelector((state: RootState) => state.query.beamAngle);

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
      setBeamAngle(newValue);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateBeamAngle(beamAngle));
    }, 1000);
    return () => clearTimeout(timer);
  }, [beamAngle, dispatch]);

  return (
    <div className='panel__light-quality-inner'>
      <div className='panel__tile'>
        <div className='panel__colour-temp-box'>
          <CircleBeam colour={hexColour(colourTemp)} />
          <div className='panel__icon-status-text'>
            {colourTemp ? `${colourTemp}K` : ""}
          </div>
        </div>
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
            sx={sliderStyle}
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
            <div
              style={{
                // backgroundColor: "#7c7c7c",
                height: "inherit",
                border: "1px solid #9d9d9d",
              }}
            />
          )}
          <div className='panel__icon-status-text' style={{ color: "white" }}>
            {cri ? (cri === 100 ? "100 CRI" : `≥ ${cri} CRI`) : ""}
          </div>
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
            sx={sliderStyle}
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
          <div className='panel__icon-status-text'>
            {diffuse ? "DIFFUSE" : beamAngle ? `${beamAngle}°` : ""}
          </div>
        </div>
        <Box sx={{ width: 250 }}>
          <p className='label'>Beam Angle</p>
          <Slider
            aria-label='Default'
            // defaultValue={70}
            valueLabelFormat={(val) => `${val}°`}
            valueLabelDisplay='auto'
            min={1}
            max={120}
            value={beamAngle}
            onChange={handleBeamAngleChange}
            size='small'
            disabled={diffuse}
            sx={sliderStyle}
          />
          <div className='panel__tile__bottom-bar'>
            <button
              className={!beamAngle ? "outline" : ""}
              onClick={() => {
                setBeamAngle(0);
                setDiffuse(false);
              }}
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
