import { useState, useEffect } from "react";
import { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import ManuNameForm from "./ManuNameForm";
import ManuImgForm from "./ManuImgForm";
import ManuContactForm from "./ManuContactForm";
import { ADD_MANUFACTURER } from "../../queries/queries";
import parseFilename from "../../form-checks/parseFilename";
import { updateImgFilename } from "../../features/addManufacturer/addManufacturerSlice";
import useImgStorage from "../../hooks/useImgStorage";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const dispatch = useDispatch();
  const formValues = useSelector((state: RootState) => state.addManufacturer);
  const [uploadedImg, setUploadedImg] = useState<{
    selectedFile: string | null;
  }>({ selectedFile: null });
  const [imgForFirebase, setImgForFirebase] = useState<null | Blob>(null);
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newManufacturer, setNewManufacturer] = useState<any>();
  const [errorMsg, setErrorMsg] = useState("");

  //////

  const [addManufacturerMutation] = useMutation(ADD_MANUFACTURER, {
    variables: formValues,

    onCompleted: (data) => {
      setNewManufacturer(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = () => {
    setIsSubmitPressed(true);
    // Check all fields are filled.
    if (
      !formValues.name ||
      !formValues.country ||
      !uploadedImg.selectedFile ||
      !formValues.website
    ) {
      setErrorMsg("All fields are required!");
      return;
    }

    // Set to isSubmitted to true once all fields are validated.
    setIsSubmitted(true);
    // Create filename => uploadedImg.selectedFile
    dispatch(updateImgFilename(parseFilename(formValues.name)));
  };

  useEffect(() => {
    // Checks if submission is ready and processes data.
    if (!isSubmitted) return;
    setImgFilename(formValues.imgFilename);
    setImgFolder("manufacturer");
    addManufacturerMutation();
  }, [addManufacturerMutation, formValues.imgFilename, isSubmitted]);

  const [imgFilename, setImgFilename] = useState("");
  const [imgFolder, setImgFolder] = useState("");
  const { loading, complete } = useImgStorage({
    file: imgForFirebase,
    filename: imgFilename,
    folder: imgFolder,
    maxDimension: 300,
  });

  return (
    <>
      {!complete ? (
        <div className='form-body form-width text-on-background'>
          <h2 style={{ marginBottom: "1em" }}>Manufacturer Registration</h2>
          <div className='form-body__grid form-width'>
            <ManuNameForm isSubmitPressed={isSubmitPressed} />

            <ManuImgForm
              uploadedImg={uploadedImg}
              setUploadedImg={setUploadedImg}
              setImgForFirebase={setImgForFirebase}
            />

            <ManuContactForm isSubmitPressed={isSubmitPressed} />
          </div>
          <div className='form-body__button'>
            <LoadingButton
              loading={loading}
              variant='contained'
              size='large'
              onClick={handleSubmit}
              sx={{
                padding: "1em 4em",
                fontSize: "0.8rem",
              }}
            >
              Register
            </LoadingButton>
          </div>
          {errorMsg && <div className='form-body__error-msg'>{errorMsg}</div>}
        </div>
      ) : (
        <div className='form-body form-width text-on-background'>
          <h2 style={{ marginBottom: "1em" }}>You did it!</h2>
          {newManufacturer &&
            newManufacturer.addManufacturer &&
            `Congratulations ${newManufacturer.addManufacturer.name}! You are newly registered!`}
          <Link to='/addproduct'>
            <Button
              variant='contained'
              size='large'
              sx={{
                padding: "1em 4em",
                fontSize: "0.8rem",
                marginTop: "2em",
              }}
            >
              Add Product
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
