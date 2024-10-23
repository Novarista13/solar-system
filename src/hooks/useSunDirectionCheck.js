import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default (sunRef, planetRef, shaderRef) => {
  useFrame(() => {
    if (!sunRef.current || !planetRef.current || !shaderRef.current) return;
    const sunDirection = new THREE.Vector3()
      .subVectors(sunRef.current.position, planetRef.current.position)
      .normalize();

    shaderRef.current.uniforms.uSunDirection.value.copy(sunDirection);
  });
};
