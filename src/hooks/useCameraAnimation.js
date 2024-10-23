import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import planets from "../libs/planets";
import { useScroll } from "@react-three/drei";
import { useResponsiveX } from "./useResponsive";

const useCameraAnimation = (planetRefs) => {
  const scroll = useScroll(); // Get scroll information

  const yValue = useRef(0.1);
  const zValue = useRef(8);
  const cameraDistanceFactor = useRef(3);

  const responsiveX = useResponsiveX();
  responsiveX(yValue, zValue, cameraDistanceFactor);

  useFrame((state) => {
    const scrollValue = scroll.offset;
    const targetIndex = Math.round(scrollValue * (planetRefs.current.length - 1));

    const planetRadius = planets[targetIndex]?.radius;
    const targetPlanet = planetRefs.current[targetIndex]?.current;

    if (targetPlanet) {
      const bodyPosition = targetPlanet.position;

      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(bodyPosition);

      cameraPosition.x += planetRadius * cameraDistanceFactor.current;
      cameraPosition.z += planetRadius * cameraDistanceFactor.current * 1.25;

      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(bodyPosition);
      cameraTarget.y += planetRadius * yValue.current;
      cameraTarget.z -= planetRadius * zValue.current;

      state.camera.position.copy(cameraPosition);
      state.camera.lookAt(cameraTarget);
    }
  });
};

export default useCameraAnimation;
