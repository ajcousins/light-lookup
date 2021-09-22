import React from "react";
import Paper from "@mui/material/Paper";

interface IProps {
  title: string;
  className: string;
}

const Panel: React.FC<IProps> = ({ title, className, children }) => {
  const classString = `panel panel__${className}`;
  return (
    <div className={classString}>
      <Paper
        sx={{
          height: "100%",
          width: "100%",
          padding: "0.5em",
          backgroundColor: "rgba(250, 250, 250)",
        }}
        elevation={5}
      >
        <h4>{title}</h4>
        {children}
      </Paper>
    </div>
  );
};

export default Panel;
