import React from "react";
import deltalight from "../../imgs/intro-page/deltalight.png";
import iguzzini from "../../imgs/intro-page/iguzzini.png";
import lucent from "../../imgs/intro-page/lucent.png";
import lumenpulse from "../../imgs/intro-page/lumenpulse.png";

export default function SubSection01() {
  return (
    <div className='intro-page__sub-section'>
      <div className='intro-page__section__wrapper'>
        <div className='intro-page__sub-section__inner body-width'>
          <div className='intro-page__sub-section__inner__content'>
            <h4 style={{ marginBottom: "2em" }}>
              Search a database full of products from brands such as...
            </h4>
            <img src={deltalight} alt='deltalight' />
            <img src={iguzzini} alt='iguzzini' />
            <img src={lucent} alt='lucent' />
            <img src={lumenpulse} alt='lumenpulse' />
            <h4 style={{ marginTop: "2em", justifySelf: "flex-end" }}>
              ... with many more to come!
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
