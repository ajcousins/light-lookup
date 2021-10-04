import React from "react";
import { Pages } from "../../types";

import PrevPageBtn from "./PrevPageBtn";
import NextPageBtn from "./NextPageBtn";

import NumAPageBtn from "./NumAPageBtn";
import NumBPageBtn from "./NumBPageBtn";
import NumCPageBtn from "./NumCPageBtn";

export default function PageControls({
  pages,
  setPages,
  executeScroll,
}: {
  pages: Pages;
  setPages: React.Dispatch<React.SetStateAction<Pages>>;
  executeScroll: () => void;
}) {
  return (
    <div className='page-controls body-width'>
      <PrevPageBtn
        pages={pages}
        setPages={setPages}
        executeScroll={executeScroll}
      />

      {pages.last === 2 ? null : (
        <>
          <NumAPageBtn
            pages={pages}
            setPages={setPages}
            executeScroll={executeScroll}
          />
          <NumBPageBtn
            pages={pages}
            setPages={setPages}
            executeScroll={executeScroll}
          />
          <NumCPageBtn
            pages={pages}
            setPages={setPages}
            executeScroll={executeScroll}
          />
        </>
      )}

      <NextPageBtn
        pages={pages}
        setPages={setPages}
        executeScroll={executeScroll}
      />
    </div>
  );
}
