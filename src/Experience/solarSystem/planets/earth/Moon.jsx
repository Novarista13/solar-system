import * as THREE from "three";
import { useRef } from "react";
import usePlanetAnimation from "../../../../hooks/usePlanetAnimation";

// Import shaders
import planetVertexShader from "../../../../shaders/earth/vertex.js";
import planetFragmentShader from "../../../../shaders/planets/fragment.js";
import useMoonOcclusionCheck from "../../../../hooks/useMoonOcclusionCheck.js";
import { loadTexture } from "../Planet.jsx";

export default function Moon({
  geometry,
  sunRef,
  earthRef,
  parentRadius,
  radius,
  distance,
  orbitSpeed,
  rotationSpeed,
  texture,
}) {
  // planet animation
  const moonRef = useRef();
  usePlanetAnimation(moonRef, distance, orbitSpeed, rotationSpeed);

  // textures
  const moonTexture = loadTexture(texture);

  // update sun direction
  const shaderRef = useRef();
  useMoonOcclusionCheck(sunRef, earthRef, moonRef, shaderRef);

  return (
    <>
      {/* <OrbitPath distance={distance} /> */}
      <mesh
        ref={moonRef}
        geometry={geometry}
        scale={[radius, radius, radius]}
        position={[parentRadius + distance, 0, 0]}
      >
        <shaderMaterial
          ref={shaderRef}
          vertexShader={planetVertexShader}
          fragmentShader={planetFragmentShader}
          uniforms={{
            uPlanetTexture: { value: moonTexture },
            uSunDirection: { value: new THREE.Vector3(0, 0, 0) },
          }}
        />
      </mesh>
    </>
  );
}
