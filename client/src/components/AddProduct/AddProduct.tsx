import React, { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import ProductNameForm from "./ProductNameForm";
import PhysicalAttributesForm from "./PhysicalAttributesForm";
import LightQualityForm from "./LightQualityForm";
import ConstraintsForm from "./ConstraintsForm";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../../queries/queries";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { resetForm } from "../../features/addProduct/addProductSlice";
import ProductTile from "../ProductTile/ProductTile";
import useImgStorage from "../../hooks/useImgStorage";

interface IState {
  product: {
    name: string;
    mounting: [string];
    bodyColour: [string];
    ipParticle: [number];
    ipMoisture: [number];
    maxLength: number;
    maxWidth: number;
    maxHeight: number;
    colourTemp: [number];
    cri: [number];
    beamAngles: [number];
    manufacturer: { name: string; country: string; website: string };
    imgFilename: string;
    remoteUrl: string;
  };
  inputErrors: {};
}
export default function AddProduct() {
  const dispatch = useDispatch();
  const formValues = useSelector((state: RootState) => state.addProduct);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newProduct, setNewProduct] = useState<IState["product"]>({
    name: "",
    mounting: [""],
    bodyColour: [""],
    ipParticle: [0],
    ipMoisture: [0],
    maxLength: 0,
    maxWidth: 0,
    maxHeight: 0,
    colourTemp: [0],
    cri: [0],
    beamAngles: [0],
    manufacturer: { name: "", country: "", website: "" },
    imgFilename: "",
    remoteUrl: "",
  });
  const [uploadedImg, setUploadedImg] = useState<{
    selectedFile: string | null;
  }>({ selectedFile: null });
  const [imgForFirebase, setImgForFirebase] = useState<null | Blob>(null);
  const [inputErrors, setInputErrors] = useState({
    "ip-ratings": "",
    "beam-angles": "",
    length: "",
    width: "",
    height: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const [addProductMutation] = useMutation(ADD_PRODUCT, {
    variables: formValues,

    onCompleted: (data) => {
      setNewProduct(data.addProduct);
      // setSubmitSuccess(true);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = () => {
    // Check if required fields are filled.
    if (!formValues.name || !formValues.manufacturerId) {
      setErrorMsg("Product Name and Manufacturer fields are required.");
      return;
    }

    // Check if there are errors on other fields.
    if (checkErrors(inputErrors)) {
      setErrorMsg("Please fix all fields with errors.");
      return;
    }

    // Check if there is an image for upload
    if (imgForFirebase) {
      // Setting states below triggers useImgStorage
      setImgFilename(formValues.imgFilename);
      setImgFolder("products");
    } else {
      resetAll();
    }

    // Add product to database.
    addProductMutation();
  };

  const checkErrors = (errorObj: { [key: string]: string }) => {
    const keys = Object.keys(errorObj);
    return keys.some((err) => (errorObj[err] ? true : false));
  };

  const resetAll = () => {
    setImgFilename("");
    setImgFolder("");
    dispatch(resetForm());
    setErrorMsg("");
    setUploadedImg({ selectedFile: null });
    window.scrollTo(0, 0);
    setSubmitSuccess(true);
  };

  const [imgFilename, setImgFilename] = useState("");
  const [imgFolder, setImgFolder] = useState("");
  const { loading, complete } = useImgStorage(
    imgForFirebase,
    imgFilename,
    imgFolder
  );

  useEffect(() => {
    if (complete) {
      resetAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete]);

  return (
    <>
      {!submitSuccess ? (
        <div className='form-body form-width text-on-background'>
          <h2 style={{ marginBottom: "1em" }}>Add a Single Product</h2>
          <div className='form-body__grid form-width'>
            <ProductNameForm
              uploadedImg={uploadedImg}
              setUploadedImg={setUploadedImg}
              setImgForFirebase={setImgForFirebase}
              errorMsg={errorMsg}
            />

            <PhysicalAttributesForm
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
            />

            <LightQualityForm
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
            />

            <ConstraintsForm
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
            />
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
              Submit
            </LoadingButton>
          </div>
          {errorMsg && <div className='form-body__error-msg'>{errorMsg}</div>}
        </div>
      ) : (
        <div className='results-body'>
          <ProductTile product={newProduct} />
          <div className='form-body__button'>
            <LoadingButton
              // loading={loading}
              variant='contained'
              size='large'
              onClick={() => setSubmitSuccess(false)}
              sx={{
                padding: "1em 4em",
                fontSize: "0.8rem",
              }}
            >
              Add Another?
            </LoadingButton>
          </div>
        </div>
      )}
    </>
  );
}
