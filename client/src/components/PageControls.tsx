import React, { useEffect, useState } from "react";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
// import FirstPageOutlinedIcon from "@mui/icons-material/FirstPageOutlined";
// import LastPageOutlinedIcon from "@mui/icons-material/LastPageOutlined";

interface Pages {
  current: number;
  last: number;
}
export default function PageControls({
  pages,
  setPages,
  executeScroll,
}: {
  pages: Pages;
  setPages: React.Dispatch<React.SetStateAction<Pages>>;
  executeScroll: () => void;
}) {
  const PrevPageBtn = ({ pages }: { pages: Pages }) => {
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

  const NextPageBtn = ({ pages }: { pages: Pages }) => {
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

  const NumAPageBtn = ({ pages }: { pages: Pages }) => {
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

  const NumBPageBtn = ({ pages }: { pages: Pages }) => {
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

  const NumCPageBtn = ({ pages }: { pages: Pages }) => {
    const [number, setNumber] = useState<number | undefined>();

    useEffect(() => {
      if (pages.current === 1) setNumber(3);
      else if (pages.current < pages.last) setNumber(pages.current + 1);
      else if (pages.current === pages.last) setNumber(pages.current);
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
          pages.current === pages.last
            ? "page-controls__btn btn--current "
            : "page-controls__btn"
        }
        onClick={handleClick}
      >
        {number}
      </button>
    );
  };

  return (
    <div className='page-controls body-width'>
      <PrevPageBtn pages={pages} />

      {pages.last === 2 ? null : (
        <>
          <NumAPageBtn pages={pages} />
          <NumBPageBtn pages={pages} />
          <NumCPageBtn pages={pages} />
        </>
      )}

      <NextPageBtn pages={pages} />
    </div>
  );
}
