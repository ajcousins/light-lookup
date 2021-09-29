import React, { useState, useEffect } from "react";
import { mountingTypes, getFormatted } from "../../panel-details/mounting";
import { bodyColours } from "../../panel-details/bodyColour";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CheckBoxes } from "./CheckBoxes";
import TextField from "@mui/material/TextField";
import { ipFormat, ipValues } from "../../form-checks/ipRatingChecks";
import { useDispatch } from "react-redux";
import {
  updateMounting,
  updateBodyColour,
  updateIpParticle,
  updateIpMoisture,
} from "../../features/addProduct/addProductSlice";

interface IState {
  formInput: {
    [key: string]: string;
  };
  inputErrors: {
    [key: string]: string;
  };
  mounting: {
    [key: string]: boolean;
  };
  bodyColour: {
    [key: string]: boolean;
  };
}

export default function PhysicalAttributesForm({
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
    "ip-ratings": "",
  });

  const [mounting, setMounting] = useState<IState["mounting"]>({
    "ceiling-mounted": false,
    "ceiling-recessed": false,
    suspended: false,
    "wall-mounted": false,
    "wall-recessed": false,
    "track-mounted": false,
    "floor-mounted": false,
    "floor-recessed": false,
    freestanding: false,
    "node-systems": false,
    "linear-systems": false,
    "area-systems": false,
  });
  const [bodyColour, setBodyColour] = useState<IState["bodyColour"]>({
    black: false,
    grey: false,
    white: false,
    brown: false,
    green: false,
    bronze: false,
    brass: false,
    "brushed-steel": false,
    "polished-steel": false,
    anthracite: false,
    custom: false,
  });

  const handleMountingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMounting({
      ...mounting,
      [event.target.name]: event.target.checked,
    });
  };

  const handleBodyColourChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBodyColour({
      ...bodyColour,
      [event.target.name]: event.target.checked,
    });
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let formInputCopy = { ...formInput };
    let inputErrorsCopy = { ...inputErrors };
    if (event.target.name === "ip-ratings") {
      formInputCopy["ip-ratings"] = ipFormat(event.target.value);
      inputErrorsCopy["ip-ratings"] = ipValues(event.target.value);
    }

    setFormInput(formInputCopy);
    setInputErrors(inputErrorsCopy);
  };

  // set global state
  useEffect(() => {
    const mountingArr = Object.keys(mounting).filter(
      (condition) => mounting[condition]
    );
    dispatch(updateMounting(mountingArr));
  }, [mounting, dispatch]);

  useEffect(() => {
    const bodyColourArr = Object.keys(bodyColour).filter(
      (colour) => bodyColour[colour]
    );
    dispatch(updateBodyColour(bodyColourArr));
  }, [bodyColour, dispatch]);

  useEffect(() => {
    const ips = formInput["ip-ratings"]
      .split(" ")
      .join("")
      .split(",")
      .filter((ip) => ip !== "")
      .filter((ip) => ip.length === 2);
    const ipParticleArr = ips.map((ip) => Number(ip.charAt(0)));
    const ipMoistureArr = ips.map((ip) => Number(ip.charAt(1)));
    dispatch(updateIpParticle(ipParticleArr));
    dispatch(updateIpMoisture(ipMoistureArr));
  }, [formInput, dispatch]);

  return (
    <>
      <h3 className='form-body__sub-heading'>Physical Attributes</h3>

      <CheckBoxes section='Mounting Types'>
        {mountingTypes.map((type) => {
          return (
            <div key={type.kebab}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={mounting[type.kebab]}
                    checked={mounting[type.kebab]}
                    onChange={handleMountingChange}
                    name={type.kebab}
                  />
                }
                label={getFormatted(type.kebab)}
              />
            </div>
          );
        })}
      </CheckBoxes>

      <CheckBoxes section='Body Colours'>
        {bodyColours.map((type) => {
          if (type.output === "None") return null;
          else
            return (
              <div key={type.value}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={bodyColour[type.value]}
                      checked={bodyColour[type.value]}
                      onChange={handleBodyColourChange}
                      name={type.value}
                    />
                  }
                  label={type.output}
                />
              </div>
            );
        })}
      </CheckBoxes>

      <div className='form-body__label' style={{ marginTop: "-1em" }}>
        IP Ratings:
      </div>
      <TextField
        error={inputErrors["ip-ratings"] === "" ? false : true}
        onChange={handleInput}
        id='filled-search'
        label='IP Ratings'
        name='ip-ratings'
        type='search'
        helperText={
          inputErrors["ip-ratings"]
            ? inputErrors["ip-ratings"]
            : 'Separate all available IP Ratings with commas. E.g. "20, 44, 65"'
        }
        value={formInput["ip-ratings"]}
      />
    </>
  );
}
