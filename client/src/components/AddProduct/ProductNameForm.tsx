import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useQuery } from "@apollo/client";
import { MANUFACTURERS } from "../../queries/queries";
import { useDispatch } from "react-redux";
import {
  updateName,
  updateManufacturerId,
  updateImgFilename,
  updateRemoteUrl,
} from "../../features/addProduct/addProductSlice";
import parseFilename from "../../form-checks/parseFilename";

interface IState {
  manufacturers: {
    name: string;
    id: string;
  }[];
}

const Input = styled("input")({
  display: "none",
});

export default function ProductNameForm({
  uploadedImg,
  setUploadedImg,
}: {
  uploadedImg: any;
  setUploadedImg: any;
}) {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const { data } = useQuery(MANUFACTURERS);
  const [manufacturers, setManufacturers] = useState<IState["manufacturers"]>(
    []
  );
  const [selected, setSelected] = useState("");
  const [remoteUrl, setRemoteUrl] = useState("");

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

  useEffect(() => {
    if (uploadedImg.selectedFile) {
      dispatch(updateImgFilename(parseFilename(productName)));
    }
  }, [productName, dispatch, uploadedImg]);

  useEffect(() => {
    if (remoteUrl) {
      dispatch(updateRemoteUrl(remoteUrl));
    }
  }, [remoteUrl, dispatch]);

  const renderImg = (event: any) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      // Set image for preview
      setUploadedImg({ selectedFile: reader.result });

      // Create and set filename
      dispatch(updateImgFilename(parseFilename(productName)));
    };
  };

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
      <div className='form-body__label'>Upload Image:</div>
      <label htmlFor='image-upload' style={{ display: "flex" }}>
        <Input
          accept='image/*'
          id='image-upload'
          // multiple
          type='file'
          onChange={renderImg}
        />
        <Button
          variant='contained'
          component='span'
          disabled={remoteUrl ? true : false}
        >
          Upload
        </Button>
      </label>

      {uploadedImg.selectedFile ? (
        <>
          <div />
          <div className='form-body__img-wrapper'>
            <img
              width='100%'
              src={String(uploadedImg.selectedFile)}
              alt='product'
            />
          </div>
        </>
      ) : (
        <>
          <div className='form-body__label' style={{ paddingLeft: "2em" }}>
            OR
          </div>
          <div />
          <div className='form-body__label'>Provide Image URL:</div>
          <TextField
            id='filled-search'
            label='Image URL'
            type='search'
            value={remoteUrl}
            disabled={uploadedImg.selectedFile ? true : false}
            onChange={(event) => {
              setRemoteUrl(event.target.value);
            }}
          />
        </>
      )}
    </>
  );
}
