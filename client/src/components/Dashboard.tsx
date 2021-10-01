import React, { useState, useEffect } from "react";
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

export default function Dashboard() {
  const query = useSelector((state: RootState) => state.query);
  const [queryVariablesForCount, setQueryVariablesForCount] =
    useState<any>(null);
  const [queryVariables, setQueryVariables] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [page, setPage] = useState(1);

  // Count number of items/ data.length
  const { data: allData } = useQuery(
    SEARCH_PRODUCTS_FOR_COUNT,
    queryVariablesForCount
  );

  const { loading, data, error } = useQuery(SEARCH_PRODUCTS, queryVariables);

  const handleSearch = () => {
    // Reset page if search button is pressed
    setPage(1);

    // Query (with no page limit) for result count.
    setQueryVariablesForCount({
      variables: { ...query },
    });

    // Query again with limit
    setQueryVariables({
      variables: { ...query, page: page },
    });

    // Render results
    setShowResults(true);
  };

  // Set the number of available pages
  useEffect(() => {
    console.log("allData:", allData);
    console.log(
      "number of pages:",
      `${allData ? Math.ceil(allData.multiple.length / 10) : ""}`
    );
  }, [allData]);

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
          {[1, 2, 3, 4, 5].map((page) => {
            return (
              <button
                onClick={() => {
                  setPage(page);
                }}
              >
                {page}
              </button>
            );
          })}
          <ResultsBody error={error} data={data} loading={loading} />
        </>
      )}
      <div className='structure__buffer' />
    </>
  );
}
