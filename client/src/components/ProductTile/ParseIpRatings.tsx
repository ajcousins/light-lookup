import React from "react";

export const ParseIpRatings = ({
  particleArr,
  moistureArr,
}: {
  particleArr: number[];
  moistureArr: number[];
}) => {
  if (particleArr.length === 0 && moistureArr.length === 0)
    return <span>-</span>;

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
