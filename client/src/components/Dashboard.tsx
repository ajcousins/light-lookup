import React, { useState, useEffect } from "react";
import Panel from "./Panel";
// import Button from "@mui/material/Button";
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

export default function Dashboard() {
  const query = useSelector((state: RootState) => state.query);
  const [queryVariables, setQueryVariables] = useState<any>(null);

  const { loading, data, error } = useQuery(SEARCH_PRODUCTS, queryVariables);

  const handleSearch = () => {
    console.log("query:", query);
    setQueryVariables({
      variables: query,
    });
  };

  useEffect(() => {
    console.log("error:", error);
  }, [error]);

  return (
    <>
      <div className='dashboard'>
        <Panel title='Mounting Condition' className='full-height'>
          <MountingConditions />
        </Panel>
        <Panel title='Body Colour' className='short-upper'>
          <BodyColour />
        </Panel>
        <Panel title='Minimum IP Rating' className='short-lower'>
          <IpRating />
        </Panel>
        <Panel title='Light Quality' className='full-height'>
          <LightQuality />
        </Panel>
        <Panel title='Dimension Constraints' className='full-height'>
          <Dimensions />
        </Panel>
        <LoadingButton
          loading={loading}
          variant='contained'
          size='large'
          onClick={handleSearch}
        >
          Search
        </LoadingButton>
      </div>
      <div className='query-body'>
        {error ? "Error loading results" : null}
        {data &&
          data.multiple.map(
            (product: {
              name: string;
              ipParticle: [number];
              ipMoisture: [number];
              manufacturer: { name: string };
            }) => {
              return (
                <div>
                  <h2>{product.name}</h2>
                  <p>{product.manufacturer.name}</p>
                  <p>
                    -- IP Particle:
                    {product.ipParticle}
                    -- IP Moisture:
                    {product.ipMoisture}
                  </p>
                  <br></br>
                </div>
              );
            }
          )}
      </div>
    </>
  );
}
