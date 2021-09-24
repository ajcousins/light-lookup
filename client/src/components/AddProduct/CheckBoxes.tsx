import React from "react";

interface IProps {
  section: string;
}

export const CheckBoxes: React.FC<IProps> = ({ section, children }) => {
  return (
    <>
      <div className='form-body__label align-top'>{section}</div>
      <div>
        <div className='form-body__explanation-text'>
          Select all that apply:
        </div>
        <div className='form-body__option-grid'>{children}</div>
      </div>
    </>
  );
};
