import React, { useEffect, useState } from "react";
import { Pages } from "../../types";

const NumBPageBtn = ({
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
    if (pages.current === 1) setNumber(2);
    else if (pages.current < pages.last) setNumber(pages.current);
    else if (pages.current === pages.last) setNumber(pages.current - 1);
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
        pages.current === 1 || pages.current === pages.last
          ? "page-controls__btn "
          : "page-controls__btn btn--current"
      }
      onClick={handleClick}
    >
      {number}
    </button>
  );
};

export default NumBPageBtn;
