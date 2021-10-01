import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { countries } from "./data/countries";
import { useDispatch } from "react-redux";
import {
  updateName,
  updateCountry,
} from "../../features/addManufacturer/addManufacturerSlice";

export default function ManuNameForm() {
  const dispatch = useDispatch();
  const [manuName, setManuName] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateName(manuName));
    }, 1000);
    return () => clearTimeout(timer);
  }, [manuName, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateCountry(country));
    }, 1000);
    return () => clearTimeout(timer);
  }, [country, dispatch]);

  return (
    <>
      <div className='form-body__label'>Company Name:</div>
      <TextField
        id='filled-search'
        label='Company Name'
        type='search'
        value={manuName}
        onChange={(event) => setManuName(event.target.value)}
        // error={(errorMsg ? true : false) && (productName === "" ? true : false)}
      />

      <div className='form-body__label'>Country:</div>
      <Autocomplete
        // value={country as CountryType}
        // onChange={(event: any, newValue: string | null) => setCountry(newValue)}
        inputValue={country}
        onInputChange={(event, newInputValue) => {
          setCountry(newInputValue);
        }}
        id='country-select-demo'
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            component='li'
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading='lazy'
              width='20'
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=''
            />
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Choose a country'
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </>
  );
}
