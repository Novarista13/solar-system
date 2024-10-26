import React, { useRef } from "react";
import { Vector3, Color } from "three";

import earthVertexShader from "../../../../shaders/earth/vertex.js";
import earthFragmentShader from "../../../../shaders/earth/fragment.js";

import Atmosphere from "./Atmosphere.jsx";
import useSunDirectionCheck from "../../../../hooks/useSunDirectionCheck.js";
import Moon from "./Moon.jsx";
import { useLoadTexture } from "../../SolarSystem.jsx";

const Earth = ({ sunRef, earthRef, geometry, planet }) => {
  const { radius, distance, textures, moon } = planet;

  // Load textures
  const earthDayTexture = useLoadTexture(textures.day);
  const earthNightTexture = useLoadTexture(textures.night);
  const earthSpecularCloudsTexture = useLoadTexture(textures.specularClouds);

  // Shader reference and sun direction update
  const shaderRef = useRef();
  useSunDirectionCheck(sunRef, earthRef, shaderRef);

  return (
    <group ref={earthRef} position={[distance, 0, 0]}>
      <mesh geometry={geometry} scale={[radius, radius, radius]}>
        <shaderMaterial
          ref={shaderRef}
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={{
            uDayTexture: { value: earthDayTexture },
            uNightTexture: { value: earthNightTexture },
            uSpecularCloudsTexture: { value: earthSpecularCloudsTexture },
            uSunDirection: { value: new Vector3(-1, 0, 0) },
            uAtmosphereDayColor: { value: new Color("#72a1d1") },
            uAtmosphereTwilightColor: { value: new Color("#d18b72") },
          }}
        />
      </mesh>
      <Atmosphere geometry={geometry} radius={radius} />
      <Moon
        geometry={geometry}
        sunRef={sunRef}
        earthRef={earthRef}
        {...moon}
        parentRadius={radius}
      />
    </group>
  );
};

export default Earth;
