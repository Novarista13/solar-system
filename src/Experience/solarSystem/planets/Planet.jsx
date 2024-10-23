import { useTexture } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

import usePlanetAnimation from "../../../hooks/usePlanetAnimation";
import useSunDirectionCheck from "../../../hooks/useSunDirectionCheck.js";
import Ring from "./saturn/Ring.jsx";
import Earth from "./earth/Earth.jsx";

import planetVertexShader from "../../../shaders/earth/vertex.js";
import planetFragmentShader from "../../../shaders/planets/fragment.js";
import venusFragmentShader from "../../../shaders/venus/fragment.js";

// Helper to load textures with common settings
export const loadTexture = (texturePath) => {
  const texture = useTexture(texturePath);
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  }
  return texture;
};

export default function Planet({ planet, geometry, planetRef, sunRef }) {
  const {
    name,
    radius,
    distance,
    orbitSpeed,
    rotationSpeed,
    texture,
    atmosphereTexture,
    hasRings,
    ringTexture,
  } = planet;

  usePlanetAnimation(planetRef, distance, orbitSpeed, rotationSpeed);

  const planetTexture = texture ? loadTexture(texture) : null;
  const atmosphere = atmosphereTexture ? loadTexture(atmosphereTexture) : null;

  const shaderRef = useRef();
  useSunDirectionCheck(sunRef, planetRef, shaderRef);

  const fragmentShader = useMemo(
    () => (name === "venus" ? venusFragmentShader : planetFragmentShader),
    [name]
  );

  // Earth-specific rendering
  if (name === "earth") {
    return <Earth sunRef={sunRef} earthRef={planetRef} geometry={geometry} planet={planet} />;
  }

  // General planet rendering
  return (
    <mesh
      ref={planetRef}
      geometry={geometry}
      position={[distance, 0, 0]}
      scale={[radius, radius, radius]}
    >
      <shaderMaterial
        ref={shaderRef}
        vertexShader={planetVertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uPlanetTexture: { value: planetTexture },
          uSunDirection: { value: new THREE.Vector3(-1, 0, 0) },
          uAtmosphereTexture: { value: atmosphere },
        }}
      />
      {hasRings && <Ring radius={radius} texture={ringTexture} />}
    </mesh>
  );
}
