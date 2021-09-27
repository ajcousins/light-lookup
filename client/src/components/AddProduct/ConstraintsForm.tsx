import React, { useState } from "react";
import { DimensionField } from "./DimensionField";
import { dimValue } from "../../form-checks/dimensionChecks";

interface IState {
  formInput: {
    [key: string]: string | number;
  };
  inputErrors: {
    [key: string]: string;
  };
}

export default function ConstraintsForm() {
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
