import React from "react";

export default function Hints() {
  return (
    <div className='message-box'>
      <h1>
        "Looks like there are no results. Try broadening your search or
        resetting some fields."
      </h1>
      <div className='message-box__inner'>
        <h2>Hints:</h2>
        <ul>
          <li>
            Mounting Conditions - Node Systems, Linear Systems and Area Systems
            have not yet been populated.
          </li>
          <li>
            Body Colours - White, Black and Grey finishes are by far more
            common.
          </li>
          <li>
            IP Ratings - Filter values represent minimum ratings. eg. "00" will
            not filter any products. "44" will disregard all products less than
            IP44.
          </li>
          <li>
            Colour Temperatures - Values 2700K, 3000K, 4000K are by far the most
            common.
          </li>
          <li>CRI - 95 CRI filters out most products.</li>
          <li>
            Beam Angles - Products with beam angles greater than 60 degrees are
            not common.
          </li>
          <li>Dimensions - Increase all values to 500mm to broaden search.</li>
        </ul>
      </div>
    </div>
  );
}
