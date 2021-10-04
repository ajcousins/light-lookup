import React, { useState, useEffect, useRef } from "react";
import Panel from "./Panel";
import LoadingButton from "@mui/lab/LoadingButton";
import LightQuality from "./LightQuality";
import Dimensions from "./Dimensions";
import MountingConditions from "./MountingConditions";
import BodyColour from "./BodyColour";
import IpRating from "./IpRating";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { SEARCH_PRODUCTS, SEARCH_PRODUCTS_FOR_COUNT } from "../queries/queries";
import ResultsBody from "./ResultsBody";
import PageControls from "./PageControls/PageControls";

interface Pages {
  current: number;
  last: number;
}

export default function Dashboard() {
  const query = useSelector((state: RootState) => state.query);
  const [queryVariablesForCount, setQueryVariablesForCount] =
    useState<any>(null);
  const [queryVariables, setQueryVariables] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [pages, setPages] = useState<Pages>({ current: 1, last: 1 });
  const resultsTop = useRef<null | HTMLDivElement>(null);

  // Count number of items/ data.length
  const { data: allData } = useQuery(
    SEARCH_PRODUCTS_FOR_COUNT,
    queryVariablesForCount
  );

  const { loading, data, error } = useQuery(SEARCH_PRODUCTS, queryVariables);

  const handleSearch = () => {
    // Reset page if search button is pressed
    setPages({ current: 1, last: 1 });

    // Query (with no page limit) for result count.
    setQueryVariablesForCount({
      variables: { ...query },
    });

    // Query again with limit
    setQueryVariables({
      variables: { ...query, page: pages.current },
    });

    // Render results
    setShowResults(true);
  };

  // Set the number of available pages
  useEffect(() => {
    let resultsPerPage = 10;
    const lastPage = () => {
      if (allData) {
        return Math.ceil(allData.multiple.length / resultsPerPage);
      } else return 1;
    };
    const pagesCopy = { ...pages };
    pagesCopy.last = lastPage();
    setPages(pagesCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);

  // Render current page, when page state updates
  useEffect(() => {
    // Query with limit
    setQueryVariables({
      variables: { ...query, page: pages.current },
    });
  }, [pages, query]);

  const executeScroll = () => {
    if (resultsTop.current === null) return;
    resultsTop.current.scrollIntoView({ inline: "start" });
  };

  return (
    <>
      <div className='sub-header'>
        Select the desired features of your luminaire.
      </div>
      <div className='dashboard'>
        <Panel title='Mounting Condition' className='panel-1'>
          <MountingConditions />
        </Panel>
        <Panel title='Body Colour' className='panel-2'>
          <BodyColour />
        </Panel>
        <Panel title='IP Rating' className='panel-3'>
          <IpRating />
        </Panel>
        <Panel title='Light Quality' className='panel-4'>
          <LightQuality />
        </Panel>
        <Panel title='Dimension Constraints' className='panel-5'>
          <Dimensions />
        </Panel>
      </div>
      <div ref={resultsTop} style={{ height: "1em" }} />
      <div className='search-bar'>
        <LoadingButton
          loading={loading}
          variant='contained'
          size='large'
          onClick={handleSearch}
          sx={{
            padding: "1em 4em",
            fontSize: "0.8rem",
          }}
        >
          Search
        </LoadingButton>
      </div>
      {showResults && (
        <>
          {pages.last === 1 ? null : (
            <PageControls
              pages={pages}
              setPages={setPages}
              executeScroll={executeScroll}
            />
          )}

          <ResultsBody error={error} data={data} loading={loading} />

          {pages.last === 1 ? null : (
            <PageControls
              pages={pages}
              setPages={setPages}
              executeScroll={executeScroll}
            />
          )}
        </>
      )}
      <div className='structure__buffer' />
    </>
  );
}
