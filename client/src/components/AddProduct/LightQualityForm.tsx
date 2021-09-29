import React, { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import {
  temperatures,
  valueLabelFormat,
} from "../../panel-details/colour-temp";
import { cris } from "../../panel-details/cri";
import { CheckBoxes } from "./CheckBoxes";
import { beamFormat, beamValues } from "../../form-checks/beamAngleChecks";
import { useDispatch } from "react-redux";
import {
  updateColourTemp,
  updateCri,
  updateBeamAngles,
} from "../../features/addProduct/addProductSlice";

interface IState {
  formInput: {
    [key: string]: string;
  };
  inputErrors: {
    [key: string]: string;
  };
  colourTemp: {
    [key: string]: boolean;
  };
  cris: {
    [key: string]: boolean;
  };
}

export default function LightQualityForm({
  inputErrors,
  setInputErrors,
}: {
  inputErrors: {
    [key: string]: string;
  };
  setInputErrors: any;
}) {
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useState<IState["formInput"]>({
    "beam-angles": "",
  });
  // const [inputErrors, setInputErrors] = useState<IState["inputErrors"]>({
  //   "beam-angles": "",
  // });

  const [colourTemp, setColourTemp] = useState<IState["colourTemp"]>({
    "1800": false,
    "2000": false,
    "2200": false,
    "2400": false,
    "2700": false,
    "3000": false,
    "3500": false,
    "4000": false,
    "5000": false,
    "6500": false,
  });
  const [crisState, setCrisState] = useState<IState["cris"]>({
    "60": false,
    "70": false,
    "80": false,
    "90": false,
    "95": false,
    "100": false,
  });

  const handleColourTempChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColourTemp({
      ...colourTemp,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCriChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrisState({
      ...crisState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let formInputCopy = { ...formInput };
    let inputErrorsCopy = { ...inputErrors };
    if (event.target.name === "beam-angles") {
      formInputCopy["beam-angles"] = beamFormat(event.target.value);
      inputErrorsCopy["beam-angles"] = beamValues(event.target.value);
    }

    setFormInput(formInputCopy);
    setInputErrors(inputErrorsCopy);
  };

  useEffect(() => {
    const colourTempArr = Object.keys(colourTemp)
      .filter((val) => colourTemp[val])
      .map((val) => Number(val));
    dispatch(updateColourTemp(colourTempArr));
  }, [colourTemp, dispatch]);

  useEffect(() => {
    const criArr = Object.keys(crisState)
      .filter((val) => crisState[val])
      .map((val) => Number(val));
    dispatch(updateCri(criArr));
  }, [crisState, dispatch]);

  useEffect(() => {
    const beamVals = formInput["beam-angles"]
      .split(" ")
      .join("")
      .split(",")
      .filter((beam) => beam !== "" && Number(beam) <= 120 && Number(beam) > 0);
    const beamValsArr = beamVals.map((beam) => Number(beam));
    dispatch(updateBeamAngles(beamValsArr));
  }, [formInput, dispatch]);

  return (
    <>
      <h3 className='form-body__sub-heading'>Light Quality</h3>
      <CheckBoxes section='Colour Temperatures'>
        {temperatures.map((val) => {
          if (val.value === 0) return null;
          return (
            <div key={String(val.value)}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={colourTemp[String(val.value)]}
                    checked={colourTemp[String(val.value)]}
                    onChange={handleColourTempChange}
                    name={String(val.value)}
                  />
                }
                label={valueLabelFormat(val.value)}
              />
            </div>
          );
        })}
      </CheckBoxes>

      <CheckBoxes section='CRIs'>
        {cris.map((val) => {
          if (val.value === 0) return null;
          return (
            <div key={String(val.value)}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={crisState[String(val.value)]}
                    checked={crisState[String(val.value)]}
                    onChange={handleCriChange}
                    name={String(val.value)}
                  />
                }
                label={val.value}
              />
            </div>
          );
        })}
      </CheckBoxes>

      <div className='form-body__label' style={{ marginTop: "-1em" }}>
        Beam Angles:
      </div>
      <TextField
        error={inputErrors["beam-angles"] === "" ? false : true}
        onChange={handleInput}
        id='filled-search'
        label='Beam Angles'
        name='beam-angles'
        type='search'
        helperText={
          inputErrors["beam-angles"]
            ? inputErrors["beam-angles"]
            : 'Separate all available beam angles with commas. E.g. "15, 20, 25"'
        }
        value={formInput["beam-angles"]}
      />
    </>
  );
}
