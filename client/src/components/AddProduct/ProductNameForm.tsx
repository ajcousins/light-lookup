import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useQuery } from "@apollo/client";
import { MANUFACTURERS } from "../../queries/queries";
import { useDispatch } from "react-redux";
import {
  updateName,
  updateManufacturerId,
} from "../../features/addProduct/addProductSlice";

interface IState {
  manufacturers: {
    name: string;
    id: string;
  }[];
}

export default function ProductNameForm() {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const { data } = useQuery(MANUFACTURERS);
  const [manufacturers, setManufacturers] = useState<IState["manufacturers"]>(
    []
  );
  const [selected, setSelected] = useState("");

  // Populate manufacturers list
  useEffect(() => {
    if (data && data.manufacturers) {
      const arr = data.manufacturers
        .map((val: { __typename: string; name: string; id: string }) => {
          return { name: val.name, id: val.id };
        })
        .sort(
          (a: { name: string; id: string }, b: { name: string; id: string }) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        );
      setManufacturers(arr);
    }
  }, [data]);

  // Set global states
  useEffect(() => {
    dispatch(updateName(productName));
    if (selected === "") return;
    const index = manufacturers.findIndex((val) => val.name === selected);
    dispatch(updateManufacturerId(manufacturers[index].id));
  }, [manufacturers, selected, productName, dispatch]);

  return (
    <>
      <div className='form-body__label'>Product Name:</div>
      <TextField
        id='filled-search'
        label='Product Name'
        type='search'
        value={productName}
        onChange={(event) => {
          setProductName(event.target.value);
        }}
      />
      <div className='form-body__label'>Manufacturer:</div>
      <Autocomplete
        disablePortal
        id='combo-box-demo'
        value={selected}
        onInputChange={(event, newInputValue) => {
          setSelected(newInputValue);
        }}
        options={manufacturers.map((val) => val.name)}
        renderInput={(params) => (
          <TextField {...params} label='Manufacturers' />
        )}
      />
    </>
  );
}
