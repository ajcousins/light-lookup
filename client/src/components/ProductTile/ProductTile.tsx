import React, { useState, useEffect } from "react";
import { ParseIpRatings } from "./ParseIpRatings";
import productDefault from "../../imgs/defaults/product-default.jpg";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase";
import { ProductType } from "../../types";
import ProductTileDetail from "./ProductTileDetail";

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
    }
  }, [product.manufacturer.imgFilename, product.remoteUrl]);

  return (
    <div className='product-tile'>
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
        <ProductTileDetail
          label='Mounting Conditions'
          array={product.mounting}
          mapCb={(condition: string, index: number, arr: any[]) => (
            <span>
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
            <span>
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
            <span>
              {temperature}K
              {index === product.colourTemp.length - 1 ? "." : ", "}
            </span>
          )}
        />

        <ProductTileDetail
          label='CRIs'
          array={product.cri}
          mapCb={(val: number, index: number) => (
            <span>
              {val}
              {index === product.cri.length - 1 ? "." : ", "}
            </span>
          )}
        />

        <ProductTileDetail
          label='Beam Angles'
          array={product.beamAngles}
          mapCb={(val: number, index: number) => (
            <span>
              {val}
              {index === product.beamAngles.length - 1 ? "." : ", "}
            </span>
          )}
        />
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
            className='manufacturer-data__brand-img'
          >
            {manuImgUrl ? <img src={manuImgUrl} alt='Manufacturer' /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
