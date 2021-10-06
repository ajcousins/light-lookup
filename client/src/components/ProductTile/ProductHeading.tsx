import React from "react";
import { ProductType } from "../../types";
import limitLink from "./limitLink";

export default function ProductHeading({ product }: ProductType) {
  return (
    <div className='product-tile__heading'>
      <a href={product.link} target='_blank' rel='noreferrer'>
        <div className='hover-group-wrapper'>
          <span className='hover-group'>
            <span>
              <h2>{product.name} </h2>
              <span>
                <h2 className='sub-heading'>
                  &nbsp;-&nbsp; {product.manufacturer.name}
                </h2>
              </span>
            </span>

            <span className='hover-group__url'>{limitLink(product.link)}</span>
          </span>
        </div>
      </a>
    </div>
  );
}
