import React from "react";
import ProductTile from "./ProductTile/ProductTile";
import { ProductType } from "../types";

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
      {data && data.multiple.length > 0 ? (
        data &&
        data.multiple.map((product: ProductType["product"]) => {
          return <ProductTile product={product} />;
        })
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
