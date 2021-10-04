import React, { useEffect, useState } from "react";
import { Pages } from "../../types";

const NumAPageBtn = ({
  pages,
  setPages,
  executeScroll,
}: {
  pages: Pages;
  setPages: React.Dispatch<React.SetStateAction<Pages>>;
  executeScroll: () => void;
}) => {
  const [number, setNumber] = useState<number | undefined>();
  useEffect(() => {
    if (pages.current === 1) setNumber(1);
    else if (pages.current < pages.last) setNumber(pages.current - 1);
    else if (pages.current === pages.last) setNumber(pages.current - 2);
  }, [pages]);
  const handleClick = () => {
    const pagesCopy = { ...pages };
    if (number === undefined) return;
    pagesCopy.current = number;
    setPages(pagesCopy);
    executeScroll();
  };
  return (
    <button
      className={
        pages.current === 1
          ? "page-controls__btn btn--current"
          : "page-controls__btn"
      }
      onClick={handleClick}
    >
      {number}
    </button>
  );
};

export default NumAPageBtn;
