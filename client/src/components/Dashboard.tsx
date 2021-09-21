import React, { useState } from "react";
import Panel from "./Panel";
import Button from "@mui/material/Button";
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

  const { loading, data } = useQuery(SEARCH_PRODUCTS, queryVariables);

  const handleSearch = () => {
    console.log("query:", query);
    setQueryVariables({
      variables: query,
    });
  };

  return (
    <>
      <div className='dashboard'>
        <Panel title='Mounting Condition' className='full-height'>
          <MountingConditions />
        </Panel>
        <Panel title='Body Colour' className='short-upper'>
          <BodyColour />
        </Panel>
        <Panel title='IP Rating' className='short-lower'>
          <IpRating />
        </Panel>
        <Panel title='Light Quality' className='full-height'>
          <LightQuality />
        </Panel>
        <Panel title='Dimensions' className='full-height'>
          <Dimensions />
        </Panel>
        <Button variant='contained' size='large' onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className='query-body'>
        {loading ? "Loading..." : null}
        {data &&
          data.multiple.map(
            (product: { name: string; manufacturer: { name: string } }) => {
              return (
                <div>
                  <h2>{product.name}</h2>
                  <p>{product.manufacturer.name}</p>
                </div>
              );
            }
          )}
      </div>
    </>
  );
}
