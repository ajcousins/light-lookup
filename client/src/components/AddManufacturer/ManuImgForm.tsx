import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import parseFilename from "../../form-checks/parseFilename";

const Input = styled("input")({
  display: "none",
});

export default function ImgForm({
  uploadedImg,
  setUploadedImg,
  setImgForFirebase,
}: {
  uploadedImg: any;
  setUploadedImg: any;
  setImgForFirebase: any;
}) {
  const renderImg = (event: any) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      // Set image (data_URL) for preview
      setUploadedImg({ selectedFile: reader.result });

      // Set image (blob) for firebase upload
      setImgForFirebase(file);

      //   // Create and set filename, for upload later.
      //   dispatch(updateImgFilename(parseFilename(productName)));
    };
  };

  return (
    <>
      <h3 className='form-body__sub-heading'>Brand Image</h3>
      <div className='form-body__explanation-text'>
        Please provide a banner image for your company. Image must be at least
        208px x 60px.
      </div>
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
          // disabled={remoteUrl ? true : false}
        >
          Upload
        </Button>
      </label>
      {uploadedImg.selectedFile && (
        <>
          <div />
          <div className='form-body__manu-img-wrapper'>
            <img
              width='100%'
              src={String(uploadedImg.selectedFile)}
              alt='product'
            />
          </div>
        </>
      )}
    </>
  );
}
