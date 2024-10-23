import React, { useRef } from "react";
import * as THREE from "three";

import useCameraAnimation from "../../hooks/useCameraAnimation";
import planets from "../../libs/planets";

import Planet from "./planets/Planet";
import Sun from "./Sun";

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

export default function SolarSystem() {
  const sunRef = useRef();
  const planetRefs = useRef(planets.map(() => React.createRef()));

  useCameraAnimation(planetRefs);

  return (
    <>
      <Sun sunRef={sunRef} geometry={sphereGeometry} textureUrl="./textures/sun.jpg" />
      {planets.map((planet, index) => (
        <Planet
          key={index}
          planet={planet}
          geometry={sphereGeometry}
          planetRef={planetRefs.current[index]}
          sunRef={sunRef}
        />
      ))}
    </>
  );
}