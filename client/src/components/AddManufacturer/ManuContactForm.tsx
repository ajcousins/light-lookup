import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { updateWebsite } from "../../features/addManufacturer/addManufacturerSlice";

export default function ManuContactForm({
  isSubmitPressed,
}: {
  isSubmitPressed: boolean;
}) {
  const dispatch = useDispatch();
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateWebsite(website));
    }, 1000);
    return () => clearTimeout(timer);
  }, [website, dispatch]);

  return (
    <>
      <h3 className='form-body__sub-heading'>Contact Information</h3>
      <div className='form-body__label'>Website Link:</div>
      <TextField
        id='filled-search'
        label='Website Link'
        type='search'
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        error={isSubmitPressed && !website}
      />
    </>
  );
}
