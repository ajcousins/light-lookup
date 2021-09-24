import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { MANUFACTURERS } from "../../queries/queries";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { mountingTypes, getFormatted } from "../../panel-details/mounting";
import { bodyColours } from "../../panel-details/bodyColour";
import {
  temperatures,
  valueLabelFormat,
} from "../../panel-details/colour-temp";
import { cris } from "../../panel-details/cri";
import { beamFormat, beamValues } from "../../form-checks/beamAngleChecks";
import { ipFormat, ipValues } from "../../form-checks/ipRatingChecks";
import { CheckBoxes } from "./CheckBoxes";

interface IState {
  formInput: {
    [key: string]: string;
  };
  inputErrors: {
    [key: string]: string;
  };
}

export default function AddProduct() {
  const { data } = useQuery(MANUFACTURERS);
  const [manufacturers, setManufacturers] = useState([]);
  const [formInput, setFormInput] = useState<IState["formInput"]>({
    "beam-angles": "",
    "ip-ratings": "",
  });
  const [inputErrors, setInputErrors] = useState<IState["inputErrors"]>({
    "beam-angles": "",
    "ip-ratings": "",
  });

  useEffect(() => {
    if (data && data.manufacturers) {
      const arr = data.manufacturers
        .map((val: { __typename: string; name: string }) => {
          return val.name;
        })
        .sort((a: string, b: string) =>
          a.toLowerCase() < b.toLowerCase() ? -1 : 1
        );
      setManufacturers(arr);
    }
  }, [data]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    let formInputCopy = { ...formInput };
    let inputErrorsCopy = { ...inputErrors };
    if (event.target.name === "ip-ratings") {
      formInputCopy["ip-ratings"] = ipFormat(event.target.value);
      inputErrorsCopy["ip-ratings"] = ipValues(event.target.value);
    } else if (event.target.name === "beam-angles") {
      formInputCopy["beam-angles"] = beamFormat(event.target.value);
      inputErrorsCopy["beam-angles"] = beamValues(event.target.value);
    } else formInputCopy[event.target.name] = event.target.value;

    setFormInput(formInputCopy);
    setInputErrors(inputErrorsCopy);
  };

  useEffect(() => {
    console.log("Form Input:", formInput);
  }, [formInput]);

  return (
    <div className='form-body form-width text-on-background'>
      <h2 style={{ marginBottom: "1em" }}>Add a Single Product</h2>
      <div className='form-body__grid form-width'>
        <div className='form-body__label'>Product Name:</div>
        <TextField id='filled-search' label='Product Name' type='search' />
        <div className='form-body__label'>Manufacturer:</div>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={manufacturers}
          renderInput={(params) => (
            <TextField {...params} label='Manufacturers' />
          )}
        />
        <h3 className='form-body__sub-heading'>Physical Attributes</h3>

        <CheckBoxes section='Mounting Types'>
          {mountingTypes.map((type) => {
            return (
              <FormControlLabel
                control={<Checkbox />}
                label={getFormatted(type.kebab)}
              />
            );
          })}
        </CheckBoxes>

        <CheckBoxes section='Body Colours'>
          {bodyColours.map((type) => {
            if (type.output === "None") return null;
            else
              return (
                <FormControlLabel control={<Checkbox />} label={type.output} />
              );
          })}
        </CheckBoxes>

        <div className='form-body__label'>IP Ratings:</div>
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
        <h3 className='form-body__sub-heading'>Light Quality</h3>
        <CheckBoxes section='Colour Temperatures'>
          {temperatures.map((val) => {
            if (val.value === 0) return null;
            return (
              <FormControlLabel
                control={<Checkbox />}
                label={valueLabelFormat(val.value)}
              />
            );
          })}
        </CheckBoxes>

        <CheckBoxes section='CRIs'>
          {cris.map((val) => {
            if (val.value === 0) return null;
            return (
              <FormControlLabel control={<Checkbox />} label={val.value} />
            );
          })}
        </CheckBoxes>

        <div className='form-body__label'>Beam Angles:</div>
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
        <h3 className='form-body__sub-heading'>Constriants</h3>
        <div className='form-body__explanation-text'>
          Please enter the maximum/ bounding box dimensions of the luminaire.
        </div>
        <div className='form-body__label'>Max Length (mm):</div>
        <TextField
          id='filled-number'
          label='Max Length'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className='form-body__label'>Max Width (mm):</div>
        <TextField
          id='filled-number'
          label='Max Width'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className='form-body__label'>Max Height (mm):</div>
        <TextField
          id='filled-number'
          label='Max Height'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className='form-body__button'>
        <LoadingButton
          //   loading={loading}
          variant='contained'
          size='large'
          //   onClick={handleSearch}
          sx={{
            padding: "1em 4em",
            fontSize: "0.8rem",
          }}
        >
          Submit
        </LoadingButton>
      </div>
    </div>
  );
}
