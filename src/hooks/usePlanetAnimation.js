import { useFrame } from "@react-three/fiber";

export default (planetRef, distance, orbitSpeed, rotationSpeed) => {
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (planetRef) {
      planetRef.current.position.x = distance * Math.cos(elapsed * orbitSpeed * 0.005);
      planetRef.current.position.z = distance * Math.sin(elapsed * orbitSpeed * 0.005);
      planetRef.current.rotation.y += rotationSpeed * 0.005;
    }
  });
};
