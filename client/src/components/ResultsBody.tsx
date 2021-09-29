import React from "react";
import ProductTile from "./ProductTile/ProductTile";

export default function ResultsBody({
  error,
  data,
  loading,
}: {
  error: any;
  data: any;
  loading: any;
}) {
  return (
    <div className='results-body'>
      {/* {error ? <div className='error-message'></div> : null} */}
      {data && data.multiple.length > 0 ? (
        data &&
        data.multiple.map(
          (product: {
            name: string;
            mounting: [string];
            bodyColour: [string];
            ipParticle: [number];
            ipMoisture: [number];
            maxLength: number;
            maxWidth: number;
            maxHeight: number;
            colourTemp: [number];
            cri: [number];
            beamAngles: [number];
            manufacturer: { name: string; country: string; website: string };
            imgFilename?: string;
            remoteUrl?: string;
          }) => {
            return <ProductTile product={product} />;
          }
        )
      ) : (
        <div className='error-message'>
          {!loading && error
            ? "Error loading results."
            : !loading &&
              "Looks like there are no results. Try broadening your search?"}
        </div>
      )}
    </div>
  );
}
