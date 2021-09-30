import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

export default function AddProduct() {
  return (
    <>
      <div className='form-body form-width text-on-background'>
        <h2 style={{ marginBottom: "1em" }}>Manufacturer Registration</h2>
        <div className='form-body__grid form-width'>
          <div className='form-body__label'>Company Name:</div>
          <TextField
            id='filled-search'
            label='Company Name'
            type='search'
            // value={productName}
            // onChange={(event) => {() => console.log("Placeholder")}}
            // error={(errorMsg ? true : false) && (productName === "" ? true : false)}
          />

          <div className='form-body__label'>Country:</div>
          <TextField
            id='filled-search'
            label='Country'
            type='search'
            // value={productName}
            // onChange={(event) => {() => console.log("Placeholder")}}
            // error={(errorMsg ? true : false) && (productName === "" ? true : false)}
          />

          <h3 className='form-body__sub-heading'>Brand Image</h3>
          <div className='form-body__explanation-text'>
            Please provide a banner image for your company.
          </div>
          <div className='form-body__label'>Upload Image:</div>
          <label htmlFor='image-upload' style={{ display: "flex" }}>
            <Input
              accept='image/*'
              id='image-upload'
              // multiple
              type='file'
              // onChange={renderImg}
            />
            <Button
              variant='contained'
              component='span'
              // disabled={remoteUrl ? true : false}
            >
              Upload
            </Button>
          </label>

          <h3 className='form-body__sub-heading'>Contact Information</h3>
          <div className='form-body__label'>Email:</div>
          <TextField
            id='filled-search'
            label='Email'
            type='search'
            // value={productName}
            // onChange={(event) => {() => console.log("Placeholder")}}
            // error={(errorMsg ? true : false) && (productName === "" ? true : false)}
          />
          <div className='form-body__label'>Website Link:</div>
          <TextField
            id='filled-search'
            label='Website Link'
            type='search'
            // value={productName}
            // onChange={(event) => {() => console.log("Placeholder")}}
            // error={(errorMsg ? true : false) && (productName === "" ? true : false)}
          />
        </div>
        <div className='form-body__button'>
          <LoadingButton
            // loading={loading}
            variant='contained'
            size='large'
            // onClick={handleSubmit}
            sx={{
              padding: "1em 4em",
              fontSize: "0.8rem",
            }}
          >
            Register
          </LoadingButton>
        </div>
        {/* {errorMsg && <div className='form-body__error-msg'>{errorMsg}</div>} */}
      </div>
    </>
  );
}
