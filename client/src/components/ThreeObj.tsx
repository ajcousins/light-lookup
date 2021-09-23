import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export default function ThreeObj({
  length,
  width,
  height,
  activeFace,
}: {
  length: string | number | (string | number)[];
  width: string | number | (string | number)[];
  height: string | number | (string | number)[];
  activeFace: {
    [key: string]: boolean;
  };
}) {
  const [cameraPos, setCameraPos] = useState(400);

  const Box = () => {
    return (
      <mesh>
        <boxBufferGeometry attach='geometry' args={[width, height, length]} />
        <meshLambertMaterial attach='material' color='#aaaaaa' />
      </mesh>
    );
  };

  useEffect(() => {
    const combinedDims = Number(length) + Number(width) + Number(height);

    if (combinedDims > 900) {
      const difference = combinedDims - 900;
      setCameraPos(400 + difference * (1 / 3));
    }

    if (combinedDims < 900) {
      const difference = 900 - combinedDims;
      setCameraPos(400 + difference * -0.44);
    }
  }, [length, width, height]);

  const Dolly = () => {
    useFrame(({ camera }) => {
      camera.position.x = cameraPos;
      camera.position.y = cameraPos;
      camera.position.z = cameraPos;
    });
    return null;
  };

  return (
    <Canvas
      camera={{
        position: [50, 50, 50],
        far: 2000,
        near: 5,
        fov: 50,
      }}
    >
      <pointLight position={[1000, 3000, 2000]} intensity={0.5} />
      <pointLight
        position={[
          activeFace["width"] ? 1000 : 0,
          activeFace["height"] ? 1000 : 0,
          activeFace["length"] ? 1000 : 0,
        ]}
        intensity={2}
        color={"#ffdd00"}
      />
      <Box />
      <Dolly />
    </Canvas>
  );
}
