import React from "react";
import { Pages } from "../../types";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

const NextPageBtn = ({
  pages,
  setPages,
  executeScroll,
}: {
  pages: Pages;
  setPages: React.Dispatch<React.SetStateAction<Pages>>;
  executeScroll: () => void;
}) => {
  const handleClick = () => {
    if (pages.current === pages.last) return;
    const pagesCopy = { ...pages };
    pagesCopy.current = pagesCopy.current + 1;
    setPages(pagesCopy);
    executeScroll();
  };
  return (
    <button
      className={
        pages.current === pages.last
          ? "page-controls__btn btn--disabled"
          : "page-controls__btn"
      }
      onClick={handleClick}
    >
      <NavigateNextOutlinedIcon sx={{ fontSize: "1.2rem" }} />
    </button>
  );
};

export default NextPageBtn;
