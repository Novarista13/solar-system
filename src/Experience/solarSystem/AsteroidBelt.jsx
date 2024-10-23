import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function AsteroidBelt({ radius = 50, thickness = 5, asteroidCount = 1000 }) {
  const asteroidsRef = useRef();

  const asteroidPositions = [];
  for (let i = 0; i < asteroidCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = radius + (Math.random() - 0.5) * thickness;
    const height = (Math.random() - 0.5) * 2;
    asteroidPositions.push([distance * Math.cos(angle), height, distance * Math.sin(angle)]);
  }

  useFrame(() => {
    if (asteroidsRef.current) {
      asteroidsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={asteroidsRef}>
      {asteroidPositions.map((pos, index) => (
        <mesh key={index} position={pos}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="gray" />
        </mesh>
      ))}
    </group>
  );
}
