import React, { useState, useEffect } from "react";
import { ParseIpRatings } from "./ParseIpRatings";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase";
import { ProductType } from "../../types";
import ProductTileDetail from "./ProductTileDetail";
import ProductImg from "./ProductImg";
import ProductHeading from "./ProductHeading";
import ManufacturerCard from "./ManufacturerCard";

export default function ProductTile({ product }: ProductType) {
  const [imgUrl, setImgUrl] = useState("");
  const [manuImgUrl, setManuImgUrl] = useState("");

  // Check for product image
  useEffect(() => {
    // if (!product.imgFilename) return;
    if (product.imgFilename) {
      getDownloadURL(ref(storage, `products/${product.imgFilename}`))
        .then((url) => {
          setImgUrl(url);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } else if (product.remoteUrl) {
      setImgUrl(product.remoteUrl);
    } else {
      setImgUrl("");
    }
  }, [product.imgFilename, product.remoteUrl]);

  // Check for manufacturer image
  useEffect(() => {
    if (product.manufacturer.imgFilename) {
      getDownloadURL(
        ref(storage, `manufacturer/${product.manufacturer.imgFilename}`)
      )
        .then((url) => {
          setManuImgUrl(url);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } else {
      setManuImgUrl("");
    }
  }, [product.manufacturer.imgFilename, product.remoteUrl]);

  return (
    <div className='product-tile'>
      <ProductImg imgUrl={imgUrl} />

      <ProductHeading product={product} />

      <div className='data'>
        <ProductTileDetail
          label='Mounting Conditions'
          array={product.mounting}
          mapCb={(condition: string, index: number, arr: any[]) => (
            <span key={`mounting-${index}`}>
              {condition
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              {index === arr.length - 1 ? "." : ", "}
            </span>
          )}
        />

        <ProductTileDetail
          label='Body Colours'
          array={product.bodyColour}
          mapCb={(colour: string, index: number, arr: any[]) => (
            <span key={`bodyColour-${index}`}>
              {colour
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              {index === arr.length - 1 ? "." : ", "}
            </span>
          )}
        />

        <ProductTileDetail label='IP Ratings'>
          <ParseIpRatings
            particleArr={product.ipParticle}
            moistureArr={product.ipMoisture}
          />
        </ProductTileDetail>

        <ProductTileDetail
          label='Colour Temperatures'
          array={product.colourTemp}
          mapCb={(temperature: number, index: number) => (
            <span key={`colourTemp-${index}`}>
              {temperature}K
              {index === product.colourTemp.length - 1 ? "." : ", "}
            </span>
          )}
        />

        <ProductTileDetail
          label='CRIs'
          array={product.cri}
          mapCb={(val: number, index: number) => (
            <span key={`cri-${index}`}>
              {val}
              {index === product.cri.length - 1 ? "." : ", "}
            </span>
          )}
        />

        <ProductTileDetail
          label='Beam Angles'
          array={product.beamAngles}
          mapCb={(val: number, index: number) => (
            <span key={`beamAngles-${index}`}>
              {val}
              {index === product.beamAngles.length - 1 ? "." : ", "}
            </span>
          )}
        />
      </div>
      <ManufacturerCard product={product} manuImgUrl={manuImgUrl} />
    </div>
  );
}
