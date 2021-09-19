import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export default function ThreeObj({
  length,
  width,
  height,
}: {
  length: string | number | (string | number)[];
  width: string | number | (string | number)[];
  height: string | number | (string | number)[];
}) {
  const [cameraPos, setCameraPos] = useState(400);

  const Box = () => {
    return (
      <mesh>
        <boxBufferGeometry attach='geometry' args={[width, height, length]} />
        <meshLambertMaterial attach='material' color='lightblue' />
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
      <pointLight position={[1000, 3000, 2000]} intensity={1} />
      <Box />
      <Dolly />
    </Canvas>
  );
}
