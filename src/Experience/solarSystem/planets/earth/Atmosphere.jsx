import React from "react";
import { Vector3, Color, BackSide } from "three";

// Import shaders
import atmosphereVertexShader from "../../../../shaders/atmosphere/vertex.js";
import atmosphereFragmentShader from "../../../../shaders/atmosphere/fragment.js";

const Atmosphere = ({ geometry, radius }) => {
  return (
    <mesh geometry={geometry} scale={[radius * 1.04, radius * 1.04, radius * 1.04]}>
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={{
          uSunDirection: { value: new Vector3(0, 0, 0) },
          uAtmosphereDayColor: { value: new Color("#72a1d1") },
          uAtmosphereTwilightColor: { value: new Color("#d18b72") },
        }}
        side={BackSide}
        transparent
      />
    </mesh>
  );
};

export default Atmosphere;
