import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import planets from "../libs/planets";
import { useScroll } from "@react-three/drei";
import useResponsive from "./useResponsive";

export default (planetRefs) => {
  const scroll = useScroll();
  const yValue = useRef(0.1);
  const zValue = useRef(8);
  const cameraDistanceFactor = useRef(3);

  const responsive = useResponsive();
  responsive(yValue, zValue, cameraDistanceFactor);

  const cameraPosition = useRef(new THREE.Vector3());
  const cameraTarget = useRef(new THREE.Vector3());

  const newCameraPosition = new THREE.Vector3();
  const newCameraTarget = new THREE.Vector3();

  const lerpSpeed = 0.1;
  const lastTargetIndex = useRef(0);

  useFrame((state) => {
    const scrollValue = scroll.offset;
    const targetIndex = Math.round(scrollValue * (planetRefs.current.length - 1));

    const planetRadius = planets[targetIndex]?.radius;
    const targetPlanet = planetRefs.current[targetIndex]?.current;

    if (targetPlanet) {
      const bodyPosition = targetPlanet.position;

      newCameraPosition.copy(bodyPosition);
      newCameraPosition.x += planetRadius * cameraDistanceFactor.current;
      newCameraPosition.z += planetRadius * cameraDistanceFactor.current * 1.25;

      newCameraTarget.copy(bodyPosition);
      newCameraTarget.y += planetRadius * yValue.current;
      newCameraTarget.z -= planetRadius * zValue.current;

      if (targetIndex !== lastTargetIndex.current) {
        cameraPosition.current.lerp(newCameraPosition, lerpSpeed);
        cameraTarget.current.lerp(newCameraTarget, lerpSpeed);
        lastTargetIndex.current = targetIndex;
      } else {
        cameraPosition.current.copy(newCameraPosition);
        cameraTarget.current.copy(newCameraTarget);
      }

      state.camera.position.copy(cameraPosition.current);
      state.camera.lookAt(cameraTarget.current);
    }
  });
};
