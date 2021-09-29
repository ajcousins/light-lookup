import React, { useState } from "react";
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
import { ref, uploadString } from "firebase/storage";
import { storage } from "../../app/firebase";

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
    selectedFile: string | ArrayBuffer | null;
  }>({ selectedFile: null });

  const [addProductMutation] = useMutation(ADD_PRODUCT, {
    variables: formValues,

    onCompleted: (data) => {
      setNewProduct(data.addProduct);
      setSubmitSuccess(true);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = () => {
    if (uploadedImg.selectedFile) {
      postImage(uploadedImg.selectedFile, formValues.imgFilename);
    }
    addProductMutation();
    dispatch(resetForm());
    setUploadedImg({ selectedFile: null });
  };

  const postImage = (file: string | ArrayBuffer, filename: string) => {
    // Firebase storage
    const imgRef = ref(storage, `products/${filename}`);

    uploadString(imgRef, String(file), "data_url").then((snapshot) => {
      // console.log("Uploaded Img");
    });
  };

  const handleAddAnother = () => {
    setSubmitSuccess(false);
  };

  return (
    <>
      {!submitSuccess ? (
        <div className='form-body form-width text-on-background'>
          <h2 style={{ marginBottom: "1em" }}>Add a Single Product</h2>
          <div className='form-body__grid form-width'>
            <ProductNameForm
              uploadedImg={uploadedImg}
              setUploadedImg={setUploadedImg}
            />

            <PhysicalAttributesForm />

            <LightQualityForm />

            <ConstraintsForm />
          </div>
          <div className='form-body__button'>
            <LoadingButton
              //   loading={loading}
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
        </div>
      ) : (
        <div className='results-body'>
          <ProductTile product={newProduct} />
          <div className='form-body__button'>
            <LoadingButton
              //   loading={loading}
              variant='contained'
              size='large'
              onClick={handleAddAnother}
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
