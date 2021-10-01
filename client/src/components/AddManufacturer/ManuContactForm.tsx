import React from "react";
import TextField from "@mui/material/TextField";

export default function ManuContactForm() {
  return (
    <>
      <h3 className='form-body__sub-heading'>Contact Information</h3>
      {/* <div className='form-body__label'>Email:</div>
          <TextField
            id='filled-search'
            label='Email'
            type='search'
            disabled
            // value={productName}
            // onChange={(event) => {() => console.log("Placeholder")}}
            // error={(errorMsg ? true : false) && (productName === "" ? true : false)}
          /> */}
      <div className='form-body__label'>Website Link:</div>
      <TextField
        id='filled-search'
        label='Website Link'
        type='search'
        // value={productName}
        // onChange={(event) => {() => console.log("Placeholder")}}
        // error={(errorMsg ? true : false) && (productName === "" ? true : false)}
      />
    </>
  );
}
