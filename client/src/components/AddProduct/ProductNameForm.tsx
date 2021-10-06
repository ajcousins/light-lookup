import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useQuery } from "@apollo/client";
import { MANUFACTURERS } from "../../queries/queries";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  updateName,
  updateManufacturerId,
  updateLink,
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
  setImgForFirebase,
  errorMsg,
}: {
  uploadedImg: any;
  setUploadedImg: any;
  setImgForFirebase: any;
  errorMsg: string;
}) {
  const dispatch = useDispatch();
  const formValues = useSelector((state: RootState) => state.addProduct);
  const [productName, setProductName] = useState("");
  const [productLink, setProductLink] = useState("");
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

  // Set global states from local
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateName(productName));
    }, 1000);
    return () => clearTimeout(timer);
  }, [productName, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateLink(productLink));
    }, 1000);
    return () => clearTimeout(timer);
  }, [productLink, dispatch]);

  useEffect(() => {
    if (selected === "") return;
    const index = manufacturers.findIndex((val) => val.name === selected);
    if (index < 0) return;
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

  // Render preview of uploaded image and reference file for submission to Firebase.
  const renderImg = (event: any) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      // Set image (data_URL) for preview
      setUploadedImg({ selectedFile: reader.result });

      // Set image (blob) for firebase upload
      setImgForFirebase(file);

      // Create and set filename, for upload later.
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
        error={(errorMsg ? true : false) && (productName === "" ? true : false)}
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
          <TextField
            {...params}
            label='Manufacturers'
            error={
              (errorMsg ? true : false) &&
              (formValues.manufacturerId === "" ? true : false)
            }
          />
        )}
      />
      <div className='form-body__label'>Product URL:</div>
      <TextField
        id='filled-search'
        label='Product URL'
        type='search'
        value={productLink}
        onChange={(event) => {
          setProductLink(event.target.value);
        }}
        error={(errorMsg ? true : false) && (productLink === "" ? true : false)}
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
          <div className='form-body__label' style={{ paddingLeft: "1.5em" }}>
            OR
          </div>
          <div />
          <div className='form-body__label'>Image URL:</div>
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
