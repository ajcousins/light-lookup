import React from "react";
import Paper from "@mui/material/Paper";

interface IProps {
  product: {
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
  };
}

const ParseIpRatings = ({
  particleArr,
  moistureArr,
}: {
  particleArr: number[];
  moistureArr: number[];
}) => {
  const lowestParticle = particleArr.reduce((prev, cur) => {
    if (cur < prev) return cur;
    else return prev;
  }, 6);
  const highestParticle = particleArr.reduce((prev, cur) => {
    if (cur > prev) return cur;
    else return prev;
  }, 0);
  const lowestMoisture = moistureArr.reduce((prev, cur) => {
    if (cur < prev) return cur;
    else return prev;
  }, 8);
  const highestMoisture = moistureArr.reduce((prev, cur) => {
    if (cur > prev) return cur;
    else return prev;
  }, 0);

  if (lowestParticle === highestParticle && lowestMoisture === highestMoisture)
    return <span>{`IP${highestParticle}${highestMoisture}.`}</span>;
  else
    return (
      <span>{`Lowest: IP${lowestParticle}${lowestMoisture}, Highest: IP${highestParticle}${highestMoisture}.`}</span>
    );
};

export default function ProductTile({ product }: IProps) {
  return (
    <Paper sx={{ marginBottom: "3em", padding: "1em" }}>
      <div className='product-tile'>
        <div
          className='product-tile__product-img'
          style={{
            backgroundColor: "silver",
            height: "9.25em",
            width: "9.25em",
          }}
        />
        <div className='product-tile__heading'>
          <span>
            <h2>{product.name} </h2>
          </span>
          <span>
            <h2 className='sub-heading'>
              {" "}
              &nbsp;-&nbsp; {product.manufacturer.name}
            </h2>
          </span>
          <div className='link-text'>Link</div>
        </div>

        <div className='data'>
          <div className='label-text'>Mounting Conditions:</div>
          <div className='product-info-text'>
            {product.mounting.map((condition, index) => {
              return (
                <span>
                  {condition
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  {index === product.mounting.length - 1 ? "." : ", "}
                </span>
              );
            })}
          </div>

          <div className='label-text'>Body Colours:</div>
          <div className='product-info-text'>
            {product.bodyColour.map((colour, index) => {
              return (
                <span>
                  {colour.charAt(0).toUpperCase() + colour.slice(1)}
                  {index === product.bodyColour.length - 1 ? "." : ", "}
                </span>
              );
            })}
          </div>

          <div className='label-text'>IP Ratings:</div>
          <div className='product-info-text'>
            <ParseIpRatings
              particleArr={product.ipParticle}
              moistureArr={product.ipMoisture}
            />
          </div>

          <div className='label-text'>Colour Temperatures:</div>
          <div className='product-info-text'>
            {product.colourTemp.length < 1 && <span>-</span>}
            {product.colourTemp.map((temperature, index) => (
              <span>
                {temperature}K
                {index === product.colourTemp.length - 1 ? "." : ", "}
              </span>
            ))}
          </div>

          <div className='label-text'>CRIs:</div>
          <div className='product-info-text'>
            {product.cri.map((val, index) => (
              <span>
                {val}
                {index === product.cri.length - 1 ? "." : ", "}
              </span>
            ))}
          </div>

          <div className='label-text'>Beam Angles:</div>
          <div className='product-info-text'>
            {product.beamAngles.map((val, index) => (
              <span>
                {val}
                {index === product.beamAngles.length - 1 ? "." : ", "}
              </span>
            ))}
          </div>
        </div>
        <div className='manufacturer-section'>
          <div className='label-text' style={{ marginBottom: "0.5em" }}>
            Manufacturer Information
          </div>
          <div className='manufacturer-data'>
            <div className='label-text'>Company:</div>
            <div className='product-info-text'>{product.manufacturer.name}</div>

            <div className='label-text'>Country:</div>
            <div className='product-info-text'>
              {product.manufacturer.country}
            </div>

            <div className='label-text'>Website:</div>
            <div className='product-info-text'>
              <a
                href={product.manufacturer.website}
                target='_blank'
                rel='noreferrer'
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
            />
          </div>
        </div>
      </div>
    </Paper>
  );
}
