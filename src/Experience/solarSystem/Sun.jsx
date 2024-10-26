import { useLoadTexture } from "./SolarSystem";

export const sunRadius = 10.9;

export default function Sun({ sunRef, geometry, textureUrl }) {
  const sunTexture = useLoadTexture(textureUrl);

  return (
    <mesh ref={sunRef} geometry={geometry} scale={[sunRadius, sunRadius, sunRadius]}>
      <meshBasicMaterial map={sunTexture} />
    </mesh>
  );
}
