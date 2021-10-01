import React from "react";

export default function ProductTileDetail({
  label,
  array,
  mapCb,
  children,
}: {
  label: string;
  array?: string[] | number[];
  mapCb?: any;
  children?: any;
}) {
  return (
    <>
      <div className='label-text'>{label}:</div>
      <div className='product-info-text'>
        {array && array.length < 1 && <span>-</span>}
        {array && mapCb && array.map(mapCb)}
        {children}
      </div>
    </>
  );
}
