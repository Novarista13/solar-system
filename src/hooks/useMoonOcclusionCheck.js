import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export default function (sunRef, earthRef, moonRef, shaderRef) {
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const sunPosition = useMemo(() => new THREE.Vector3(), []);
  const moonPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!sunRef.current || !moonRef.current || !earthRef.current || !shaderRef.current) return;

    sunRef.current.getWorldPosition(sunPosition);
    moonRef.current.getWorldPosition(moonPosition);

    const moonToSunDirection = new THREE.Vector3()
      .subVectors(sunPosition, moonPosition)
      .normalize();

    raycaster.set(moonPosition, moonToSunDirection);
    const intersects = raycaster.intersectObject(earthRef.current);

    if (intersects.length > 0) {
      shaderRef.current.uniforms.uSunDirection.value.copy(0, 0, 0);
    } else {
      shaderRef.current.uniforms.uSunDirection.value.copy(moonToSunDirection);
    }
  });
}
