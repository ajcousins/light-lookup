import React, { useState, useEffect, useRef } from "react";

export default function DimensionModel({
  length,
  width,
  height,
}: {
  length: string | number | (string | number)[];
  width: string | number | (string | number)[];
  height: string | number | (string | number)[];
}) {
  const points = useRef({
    a: { x: 227.602, y: 100 },
    b: { x: 108.593, y: 166.626 },
    c: { x: 272.398, y: 215.032 },
    d: { x: 391.407, y: 148.406 },
    e: { x: 227.602, y: 284.969 },
    f: { x: 108.593, y: 351.595 },
    g: { x: 272.398, y: 400 },
    h: { x: 391.407, y: 333.374 },
  });
  const lengthRef = useRef(length);
  const lengthUnit = { x: 119.009 / 125, y: 66.626 / 125 }; // red dim, c to d
  const widthUnit = { x: 163.805 / 125, y: 48.406 / 125 }; // green
  const heightUnit = { x: 0, y: 184.968 / 125 }; // blue

  useEffect(() => {
    let direction = 1;
    if (length < lengthRef.current) {
      direction = -1;
    }
    points.current = {
      ...points.current,
      d: {
        x: points.current.d.x + lengthUnit.x * direction,
        y: points.current.d.y - lengthUnit.y * direction,
      },
    };
    lengthRef.current = length;
  }, [length]);

  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='inherit'
      height='inherit'
      viewBox='0 0 500 500'
      enable-background='new 0 0 500 500'
    >
      <g id='Make2D_x24_Visible_x24_Curves'>
        <g id='LINE_3_'>
          <line
            fill='none'
            stroke='#0000FF'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.e.x}
            y1={points.current.e.y}
            x2={points.current.a.x}
            y2={points.current.a.y}
          />
        </g>
        <g id='LINE_5_'>
          <line
            fill='none'
            stroke='#FF0000'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.e.x}
            y1={points.current.e.y}
            x2={points.current.f.x}
            y2={points.current.f.y}
          />
        </g>
        <g id='LINE_7_'>
          <line
            fill='none'
            stroke='#0000FF'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.h.x}
            y1={points.current.h.y}
            x2={points.current.d.x}
            y2={points.current.d.y}
          />
        </g>
        <g id='LINE_11_'>
          <line
            fill='none'
            stroke='#0000FF'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.f.x}
            y1={points.current.f.y}
            x2={points.current.b.x}
            y2={points.current.b.y}
          />
        </g>
        <g id='LINE_8_'>
          <line
            fill='none'
            stroke='#00FF00'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.e.x}
            y1={points.current.e.y}
            x2={points.current.h.x}
            y2={points.current.h.y}
          />
        </g>
        <g id='LINE_2_'>
          <line
            fill='none'
            stroke='#FF0000'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.a.x}
            y1={points.current.a.y}
            x2={points.current.b.x}
            y2={points.current.b.y}
          />
        </g>
        <g id='LINE_4_'>
          <line
            fill='none'
            stroke='#00FF00'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.d.x}
            y1={points.current.d.y}
            x2={points.current.a.x}
            y2={points.current.a.y}
          />
        </g>
        <g id='LINE_9_'>
          <line
            fill='none'
            stroke='#FF0000'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.g.x}
            y1={points.current.g.y}
            x2={points.current.h.x}
            y2={points.current.h.y}
          />
        </g>
        <g id='LINE_13_'>
          <line
            fill='none'
            stroke='#00FF00'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.f.x}
            y1={points.current.f.y}
            x2={points.current.g.x}
            y2={points.current.g.y}
          />
        </g>
        <g id='LINE'>
          <line
            fill='none'
            stroke='#0000FF'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.g.x}
            y1={points.current.g.y}
            x2={points.current.c.x}
            y2={points.current.c.y}
          />
        </g>
        <g id='LINE_1_'>
          <line
            fill='none'
            stroke='#00FF00'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.b.x}
            y1={points.current.b.y}
            x2={points.current.c.x}
            y2={points.current.c.y}
          />
        </g>
        <g id='LINE_6_'>
          <line
            fill='none'
            stroke='#FF0000'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-miterlimit='10'
            x1={points.current.c.x}
            y1={points.current.c.y}
            x2={points.current.d.x}
            y2={points.current.d.y}
          />
        </g>
      </g>
      <g id='Make2D_x24_Visible_x24_SceneSilhouetteCurves'></g>
    </svg>
  );
}
