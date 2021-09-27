import React, { useState } from "react";
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
import { SEARCH_PRODUCTS } from "../queries/queries";
import ResultsBody from "./ResultsBody";

export default function Dashboard() {
  const query = useSelector((state: RootState) => state.query);
  const [queryVariables, setQueryVariables] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const { loading, data, error } = useQuery(SEARCH_PRODUCTS, queryVariables);

  const handleSearch = () => {
    setShowResults(true);
    // console.log("query:", query);
    setQueryVariables({
      variables: query,
    });
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
        <ResultsBody error={error} data={data} loading={loading} />
      )}
    </>
  );
}
