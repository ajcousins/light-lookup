import React from "react";
import { ProductType } from "../../types";

export default function ManufacturerCard({
  product,
  manuImgUrl,
}: {
  product: ProductType["product"];
  manuImgUrl: string;
}) {
  return (
    <div className='manufacturer-section'>
      <div className='label-text' style={{ marginBottom: "0.5em" }}>
        Manufacturer Information
      </div>
      <div className='manufacturer-data'>
        <div className='label-text'>Company:</div>
        <div className='product-info-text'>{product.manufacturer.name}</div>

        <div className='label-text'>Country:</div>
        <div className='product-info-text'>{product.manufacturer.country}</div>

        <div className='label-text'>Website:</div>
        <div className='product-info-text'>
          <a
            href={product.manufacturer.website}
            target='_blank'
            rel='noreferrer'
            className='manu-link'
          >
            {product.manufacturer.website.length < 35
              ? product.manufacturer.website.slice(8, 35)
              : `${product.manufacturer.website.slice(8, 34)}...`}
          </a>
        </div>

        <div
          style={{
            backgroundColor: "silver",
            width: "13em",
            height: "3.75em",
          }}
          className='manufacturer-data__brand-img'
        >
          <a
            href={product.manufacturer.website}
            target='_blank'
            rel='noreferrer'
            className='manu-link'
          >
            {manuImgUrl ? <img src={manuImgUrl} alt='Manufacturer' /> : null}
          </a>
        </div>
      </div>
    </div>
  );
}
