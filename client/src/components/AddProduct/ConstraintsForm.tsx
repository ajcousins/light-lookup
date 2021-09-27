import React, { useState, useEffect } from "react";
import { DimensionField } from "./DimensionField";
import { dimValue } from "../../form-checks/dimensionChecks";
import { useDispatch } from "react-redux";
import {
  updateLength,
  updateWidth,
  updateHeight,
} from "../../features/addProduct/addProductSlice";

interface IState {
  formInput: {
    [key: string]: string | number;
  };
  inputErrors: {
    [key: string]: string;
  };
}

export default function ConstraintsForm() {
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useState<IState["formInput"]>({
    length: "",
    width: "",
    height: "",
  });
  const [inputErrors, setInputErrors] = useState<IState["inputErrors"]>({
    length: "",
    width: "",
    height: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let formInputCopy = { ...formInput };
    let inputErrorsCopy = { ...inputErrors };
    if (
      event.target.name === "length" ||
      event.target.name === "width" ||
      event.target.name === "height"
    ) {
      formInputCopy[event.target.name] = event.target.value;
      inputErrorsCopy[event.target.name] = dimValue(event.target.value);
    }

    setFormInput(formInputCopy);
    setInputErrors(inputErrorsCopy);
  };

  useEffect(() => {
    if (
      formInput.length > 500 ||
      formInput.width > 500 ||
      formInput.height > 500
    )
      return;
    dispatch(updateLength(Number(formInput.length)));
    dispatch(updateWidth(Number(formInput.width)));
    dispatch(updateHeight(Number(formInput.height)));
  }, [formInput, dispatch]);

  return (
    <>
      <h3 className='form-body__sub-heading'>Constriants</h3>
      <div className='form-body__explanation-text'>
        Please enter the maximum/ bounding box dimensions of the luminaire.
      </div>
      <DimensionField
        dimLabel='length'
        handleInput={handleInput}
        inputErrors={inputErrors}
        formInput={formInput}
      />
      <DimensionField
        dimLabel='width'
        handleInput={handleInput}
        inputErrors={inputErrors}
        formInput={formInput}
      />
      <DimensionField
        dimLabel='height'
        handleInput={handleInput}
        inputErrors={inputErrors}
        formInput={formInput}
      />
    </>
  );
}
