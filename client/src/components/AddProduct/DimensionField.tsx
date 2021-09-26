import React from "react";
import TextField from "@mui/material/TextField";

interface IProps {
  dimLabel: string;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputErrors: { [key: string]: string };
  formInput: {
    [key: string]: string | number;
  };
}

export const DimensionField: React.FC<IProps> = ({
  dimLabel,
  handleInput,
  inputErrors,
  formInput,
}) => {
  const titleFormat = dimLabel.charAt(0).toUpperCase() + dimLabel.slice(1);

  return (
    <>
      <div className='form-body__label'>{`Max ${titleFormat} (mm):`}</div>
      <TextField
        error={inputErrors[dimLabel] === "" ? false : true}
        onChange={handleInput}
        id='filled-number'
        label={`Max ${titleFormat}`}
        name={dimLabel}
        type='number'
        InputLabelProps={{
          shrink: true,
        }}
        helperText={inputErrors[dimLabel] ? inputErrors[dimLabel] : ""}
        value={formInput[dimLabel]}
      />
    </>
  );
};
