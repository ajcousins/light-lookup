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
import { cris, criLabelFormat } from "../../panel-details/cri";

interface IState {
  formInput: {
    "beam-angles": string;
  };
}

// LAST WORKING ON HOOKING UP BEAM ANGLES ONCHANGE.
// IF ANY LETTER CHARACTERS, THEN RETURN.
// IF STRING DOESN'T FIT 123, 120 FORMAT, COMPONENT ERROR= TRUE
// MAYBE MAKE A SEPARATE OBJECT STATE FOR ERRORS WHICH THE RELAVENT COMPONENTS CAN CHECK?

export default function AddProduct() {
  const { loading, data, error } = useQuery(MANUFACTURERS);
  const [manufacturers, setManufacturers] = useState([]);
  const [formInput, setFormInput] = useState<IState["formInput"]>({
    "beam-angles": "",
  });

  useEffect(() => {
    console.log("Manufacturers:", data);

    if (data && data.manufacturers) {
      const arr = data.manufacturers.map(
        (val: { __typename: string; name: string }) => {
          return val.name;
        }
      );
      setManufacturers(arr);
    }
  }, [data]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
  };

  return (
    <div className='form-body form-width text-on-background'>
      <h2 style={{ marginBottom: "1em" }}>Add a Single Product</h2>
      <div className='form-body__grid form-width'>
        <div className='form-body__label'>Product Name:</div>
        <TextField
          id='filled-search'
          label='Product Name'
          type='search'
          //   variant='filled'
          //   helperText='Separate all available IP Ratings with commas. E.g. "20, 44, 65"'
        />
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
        <div className='form-body__label align-top'>Mounting Types:</div>
        <div>
          <div className='form-body__explanation-text'>
            Select all that apply:
          </div>
          <div className='form-body__option-grid'>
            {mountingTypes.map((type) => {
              return (
                <FormControlLabel
                  control={<Checkbox />}
                  label={getFormatted(type.kebab)}
                />
              );
            })}
          </div>
        </div>
        <div className='form-body__label align-top'>Body Colours:</div>
        <div>
          <div className='form-body__explanation-text'>
            Select all that apply:
          </div>
          <div className='form-body__option-grid'>
            {bodyColours.map((type) => {
              if (type.output === "None") return null;
              else
                return (
                  <FormControlLabel
                    control={<Checkbox />}
                    label={type.output}
                  />
                );
            })}
          </div>
        </div>
        <div className='form-body__label'>IP Ratings:</div>
        <TextField
          id='filled-search'
          label='IP Ratings'
          type='search'
          //   variant='filled'
          helperText='Separate all available IP Ratings with commas. E.g. "20, 44, 65"'
        />
        <h3 className='form-body__sub-heading'>Light Quality</h3>
        <div className='form-body__label align-top'>Colour Temperatures:</div>
        <div>
          <div className='form-body__explanation-text'>
            Select all that apply:
          </div>
          <div className='form-body__option-grid'>
            {temperatures.map((val) => {
              if (val.value === 0) return null;
              return (
                <FormControlLabel
                  control={<Checkbox />}
                  label={valueLabelFormat(val.value)}
                />
              );
            })}
          </div>
        </div>
        <div className='form-body__label align-top'>CRIs:</div>
        <div>
          <div className='form-body__explanation-text'>
            Select all that apply:
          </div>
          <div className='form-body__option-grid'>
            {cris.map((val) => {
              if (val.value === 0) return null;
              return (
                <FormControlLabel control={<Checkbox />} label={val.value} />
              );
            })}
          </div>
        </div>
        <div className='form-body__label'>Beam Angles:</div>
        <TextField
          //   error
          onChange={handleInput}
          id='filled-search'
          label='Beam Angles'
          type='search'
          name='beam-angles'
          //   variant='filled'
          helperText='Separate all available beam angles with commas. E.g. "15, 20, 25"'
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
          //   variant='filled'
        />
        <div className='form-body__label'>Max Width (mm):</div>
        <TextField
          id='filled-number'
          label='Max Width'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          //   variant='filled'
        />
        <div className='form-body__label'>Max Height (mm):</div>
        <TextField
          id='filled-number'
          label='Max Height'
          type='number'
          InputLabelProps={{
            shrink: true,
          }}
          //   variant='filled'
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
          Search
        </LoadingButton>
      </div>
    </div>
  );
}
