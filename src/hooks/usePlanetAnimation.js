import { useFrame } from "@react-three/fiber";

export default function (planetRef, distance, orbitSpeed, rotationSpeed) {
  useFrame(({ clock }) => {
    if (!planetRef?.current) return;

    const elapsed = clock.getElapsedTime();
    const angle = elapsed * orbitSpeed * 0.005;

    planetRef.current.position.x = distance * Math.cos(angle);
    planetRef.current.position.z = distance * Math.sin(angle);

    planetRef.current.rotation.y += rotationSpeed * 0.005;
  });
}
