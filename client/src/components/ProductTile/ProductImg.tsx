import React from "react";
import productDefault from "../../imgs/defaults/product-default.jpg";

export default function ProductImg({ imgUrl }: { imgUrl: string }) {
  return (
    <div
      className='product-tile__product-img'
      style={{
        backgroundColor: "silver",
        height: "9.25em",
        width: "9.25em",
      }}
    >
      {imgUrl ? (
        <img src={imgUrl} alt='Product' />
      ) : (
        <img src={productDefault} alt='Product' />
      )}
    </div>
  );
}
