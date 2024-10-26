import React, { useLayoutEffect } from "react";

import { OrbitControls, ScrollControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";

// import Lights from "./Lights";
import SolarSystem from "./solarSystem/SolarSystem";
import { Overlay } from "./components/Overlay";
import planets from "../libs/planets";

export const Experience = () => {
  const texture = useTexture("./textures/milky_way.webp");
  const scene = useThree((state) => state.scene);

  useLayoutEffect(() => {
    const old = scene.background;
    scene.background = texture;
    return () => (scene.background = old);
  }, [texture]);

  return (
    <>
      {window.location.hash === "#perf" && <Perf position="top-left" />}

      {/* <OrbitControls /> */}
      <ScrollControls horizontal pages={planets.length} damping={0.15}>
        <SolarSystem />
        <Overlay />
      </ScrollControls>
    </>
  );
};
