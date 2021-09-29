import React from "react";

interface IProps {
  title: string;
  className: string;
}

const Panel: React.FC<IProps> = ({ title, className, children }) => {
  const classString = `panel panel__${className}`;
  return (
    <div className={classString}>
      <h4>{title}</h4>
      {children}
    </div>
  );
};

export default Panel;
