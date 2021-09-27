import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import ProductNameForm from "./ProductNameForm";
import PhysicalAttributesForm from "./PhysicalAttributesForm";
import LightQualityForm from "./LightQualityForm";
import ConstraintsForm from "./ConstraintsForm";

export default function AddProduct() {
  return (
    <div className='form-body form-width text-on-background'>
      <h2 style={{ marginBottom: "1em" }}>Add a Single Product</h2>
      <div className='form-body__grid form-width'>
        <ProductNameForm />

        <PhysicalAttributesForm />

        <LightQualityForm />

        <ConstraintsForm />
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
