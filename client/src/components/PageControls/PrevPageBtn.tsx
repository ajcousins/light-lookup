import React from "react";
import { Pages } from "../../types";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";

const PrevPageBtn = ({
  pages,
  setPages,
  executeScroll,
}: {
  pages: Pages;
  setPages: React.Dispatch<React.SetStateAction<Pages>>;
  executeScroll: () => void;
}) => {
  const handleClick = () => {
    if (pages.current === 1) return;
    const pagesCopy = { ...pages };
    pagesCopy.current = pagesCopy.current - 1;
    setPages(pagesCopy);
    executeScroll();
  };
  return (
    <button
      className={
        pages.current === 1
          ? "page-controls__btn btn--disabled"
          : "page-controls__btn"
      }
      onClick={handleClick}
    >
      <NavigateBeforeOutlinedIcon sx={{ fontSize: "1.2rem" }} />
    </button>
  );
};

export default PrevPageBtn;
