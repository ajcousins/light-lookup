import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { sliderStyle } from "../panel-details/custom-styles";
import {
  temperatures,
  valueLabelFormat,
  cttImg,
} from "../panel-details/colour-temp";
import { cris, criImg, criLabelFormat } from "../panel-details/cri";
import BeamAngle from "../imgs/beam-angle/BeamAngle";
import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import {
  updateColourTemp,
  updateCri,
  updateBeamAngle,
  // updateLumenOutput //<----- TO DO
} from "../features/query/querySlice";
import beamAngleTextColour from "../panel-details/beam-angle";

export default function LightQuality() {
  const dispatch = useDispatch();
  const [diffuse, setDiffuse] = useState(false);
  const [beamAngle, setBeamAngle] = useState(0);
  const [lumenOutput, setLumenOutput] = useState(0);

  const colourTemp = useSelector((state: RootState) => state.query.colourTemp);
  const cri = useSelector((state: RootState) => state.query.cri);

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

  const handleLumenOutputChange = (e: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setLumenOutput(newValue);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateBeamAngle(beamAngle));
      // dispatch(updateLumenOutput(lumenOutput)); //<---- TO DO
    }, 1000);
    return () => clearTimeout(timer);
  }, [beamAngle, lumenOutput, dispatch]);

  return (
    <div className='panel__light-quality-inner'>
      <div className='panel__tile'>
        <div className='panel__colour-temp-box'>
          {colourTemp ? (
            <img src={cttImg(colourTemp)} alt='CTT' />
          ) : (
            <div
              style={{
                height: "inherit",
                border: "1px solid #9d9d9d",
              }}
            />
          )}
          <div className='panel__icon-status-text' style={{ color: "white" }}>
            {colourTemp ? `${colourTemp} K` : ""}
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
        <div className='panel__beam-angle-box'>
          <BeamAngle value={diffuse ? 200 : beamAngle} />
          <div
            className='panel__icon-status-text'
            style={{ color: beamAngleTextColour(beamAngle) }}
          >
            {diffuse ? "DIFFUSE" : beamAngle ? `${beamAngle}°` : ""}
          </div>
        </div>
        <Box sx={{ width: 250 }}>
          <p className='label'>Beam Angle</p>
          <Slider
            aria-label='Default'
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
      <div className='panel__tile'>
        <div className='panel__beam-angle-box'>
          <BeamAngle value={diffuse ? 200 : beamAngle} />
          <div
            className='panel__icon-status-text'
            style={{ color: beamAngleTextColour(beamAngle) }}
          >
            {diffuse ? "DIFFUSE" : beamAngle ? `${beamAngle}°` : ""}
          </div>
        </div>
        <Box sx={{ width: 250 }}>
          <p className='label'>Lumen Output</p>
          <Slider
            aria-label='Default'
            // valueLabelFormat={(val) => `${val}°`}
            valueLabelDisplay='auto'
            min={1}
            max={3000}
            value={lumenOutput}
            onChange={handleLumenOutputChange}
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
