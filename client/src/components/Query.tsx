import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_PRODUCTS } from "../queries/queries";
import Dashboard from "./Dashboard";

export default function Query() {
  //   const { loading, error, data } = useQuery(PRODUCTS);
  const [formInput, setFormInput] = useState({
    type: "",
    mounting: "",
    ipRating: "",
    bodyColour: "",
    maxLength: "",
    maxWidth: "",
    maxHeight: "",
    colourTemp: "",
    cri: "",
    beamAngle: "",
  });

  const [queryVariables, setQueryVariables] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Update variables object
    setQueryVariables({
      variables: {
        type: formInput.type,
        mounting: formInput.mounting,
        ipRating: formInput.ipRating,
        bodyColour: formInput.bodyColour,
        maxLength: Number(formInput.maxLength),
        maxWidth: Number(formInput.maxWidth),
        maxHeight: Number(formInput.maxHeight),
        colourTemp: Number(formInput.colourTemp),
        cri: Number(formInput.cri),
        beamAngle: Number(formInput.beamAngle),
      },
    });

    console.log("searchProducts: ", data);

    // Reset form
    // setFormInput({
    //   type: "",
    //   mounting: "",
    //   ipRating: "",
    //   bodyColour: "",
    //   maxLength: "",
    //   maxWidth: "",
    //   maxHeight: "",
    //   colourTemp: "",
    //   cri: "",
    //   maxBeamAngle: "",
    // });
  };

  const { loading, data } = useQuery(SEARCH_PRODUCTS, queryVariables);

  return (
    <div className='query-body'>
      <Dashboard />
      <form className='product-query' onSubmit={handleSubmit}>
        <label htmlFor='type'>Luminaire Type</label>
        <input
          name='type'
          onChange={handleChange}
          value={formInput.type}
        ></input>

        <label htmlFor='mounting'>Mounting Condition</label>
        <input
          name='mounting'
          onChange={handleChange}
          value={formInput.mounting}
        ></input>

        <label htmlFor='ipRating'>IP Rating</label>
        <input
          name='ipRating'
          onChange={handleChange}
          value={formInput.ipRating}
        ></input>

        <label htmlFor='bodyColour'>Body Colour</label>
        <input
          name='bodyColour'
          onChange={handleChange}
          value={formInput.bodyColour}
        ></input>

        <label htmlFor='maxLength'>Max Length</label>
        <input
          name='maxLength'
          onChange={handleChange}
          value={formInput.maxLength}
        ></input>

        <label htmlFor='maxWidth'>Max Width</label>
        <input
          name='maxWidth'
          onChange={handleChange}
          value={formInput.maxWidth}
        ></input>

        <label htmlFor='maxHeight'>Max Height</label>
        <input
          name='maxHeight'
          onChange={handleChange}
          value={formInput.maxHeight}
        ></input>

        <label htmlFor='colourTemp'>Colour Temperature</label>
        <input
          name='colourTemp'
          onChange={handleChange}
          value={formInput.colourTemp}
        ></input>

        <label htmlFor='cri'>Colour Rendering Index</label>
        <input name='cri' onChange={handleChange} value={formInput.cri}></input>

        <label htmlFor='beamAngle'>Beam Angle</label>
        <input
          name='beamAngle'
          onChange={handleChange}
          value={formInput.beamAngle}
        ></input>

        <button className='product-query__search-btn'>Search</button>
      </form>

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
  );
}
