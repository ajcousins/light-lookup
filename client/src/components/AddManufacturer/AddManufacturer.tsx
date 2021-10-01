import { useState, useEffect } from "react";
import { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import LoadingButton from "@mui/lab/LoadingButton";
import ManuNameForm from "./ManuNameForm";
import ManuImgForm from "./ManuImgForm";
import ManuContactForm from "./ManuContactForm";
import { ADD_MANUFACTURER } from "../../queries/queries";
import parseFilename from "../../form-checks/parseFilename";
import { updateImgFilename } from "../../features/addManufacturer/addManufacturerSlice";
import useImgStorage from "../../hooks/useImgStorage";

export default function AddProduct() {
  const dispatch = useDispatch();
  const formValues = useSelector((state: RootState) => state.addManufacturer);
  const [uploadedImg, setUploadedImg] = useState<{
    selectedFile: string | null;
  }>({ selectedFile: null });
  const [imgForFirebase, setImgForFirebase] = useState<null | Blob>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //////

  const [addManufacturerMutation] = useMutation(ADD_MANUFACTURER, {
    variables: formValues,

    onCompleted: (data) => {
      // setNewProduct(data.addProduct);
      // setSubmitSuccess(true);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = () => {
    // Check all fields are filled.

    // Set to isSubmitted to true once all fields are validated.
    setIsSubmitted(true);
    // Create filename => uploadedImg.selectedFile
    dispatch(updateImgFilename(parseFilename(formValues.name)));
  };

  useEffect(() => {
    // Checks if submission is ready and processes data.
    if (!isSubmitted) return;
    if (!formValues.imgFilename) return;
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

  useEffect(() => {
    if (complete) {
      console.log("Success");
      // LOAD SUCCESS PAGE
    }
  }, [complete]);

  return (
    <>
      <div className='form-body form-width text-on-background'>
        <h2 style={{ marginBottom: "1em" }}>Manufacturer Registration</h2>
        <div className='form-body__grid form-width'>
          <ManuNameForm />

          <ManuImgForm
            uploadedImg={uploadedImg}
            setUploadedImg={setUploadedImg}
            setImgForFirebase={setImgForFirebase}
          />

          <ManuContactForm />
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
        {/* {errorMsg && <div className='form-body__error-msg'>{errorMsg}</div>} */}
      </div>
    </>
  );
}
