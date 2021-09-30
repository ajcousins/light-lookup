import React from "react";

const BeamAngle = ({ value }: { value: number }) => {
  const halfValue = value / 2;
  const plusTenPercent = halfValue * 1.1;
  const minusTenPercent = halfValue * 0.9;
  const transitionSpeed = 0.5;
  return (
    <svg
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='inherit'
      height='inherit'
      viewBox={`0 0 300 300`}
      enableBackground={`new 0 0 300 300`}
    >
      <rect width='100%' height='100%' fill='white' />
      {/* LEFT */}
      <rect
        fill='#00000037'
        width='150'
        height='345'
        style={{
          transformOrigin: "150px 0px",
          transform: `rotate(${halfValue}deg)`,
          transition: `transform ${transitionSpeed}s`,
        }}
      />

      <rect
        fill='#00000037'
        width='150'
        height='345'
        style={{
          transformOrigin: "150px 0px",
          transform: `rotate(${minusTenPercent}deg)`,
          transition: `transform ${transitionSpeed}s`,
        }}
      />

      {/* RIGHT */}
      <rect
        x='150'
        fill='#00000037'
        width='150'
        height='345'
        style={{
          transformOrigin: "150px 0px",
          transform: `rotate(${-halfValue}deg)`,
          transition: `transform ${transitionSpeed}s`,
        }}
      />

      <rect
        x='150'
        fill='#00000037'
        width='150'
        height='345'
        style={{
          transformOrigin: "150px 0px",
          transform: `rotate(${-minusTenPercent}deg)`,
          transition: `transform ${transitionSpeed}s`,
        }}
      />
      <rect
        x='150'
        fill='#00000037'
        width='150'
        height='345'
        style={{
          transformOrigin: "150px 0px",
          transform: `rotate(${-plusTenPercent}deg)`,
          transition: `transform ${transitionSpeed}s`,
        }}
      />
      <rect
        fill='#00000037'
        width='150'
        height='345'
        style={{
          transformOrigin: "150px 0px",
          transform: `rotate(${plusTenPercent}deg)`,
          transition: `transform ${transitionSpeed}s`,
        }}
      />
    </svg>
  );
};

export default BeamAngle;
