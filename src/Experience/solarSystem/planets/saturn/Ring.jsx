import * as THREE from "three";
import { loadTexture } from "../Planet";

const Ring = ({ radius, texture }) => {
  const ringTexture = loadTexture(texture);

  // Create ring geometry
  const geometry = new THREE.RingGeometry(radius * 1.5, radius * 2.3, 64);
  var pos = geometry.attributes.position;
  var v3 = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i);
    geometry.attributes.uv.setXY(i, v3.length() < radius * 1.8 ? 0 : 1, 1);
  }

  return (
    <>
      <mesh rotation={[Math.PI / 2 - 0.3, 0.2, 0]}>
        <primitive object={geometry} />
        <meshBasicMaterial map={ringTexture} transparent side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

export default Ring;

{
  /* <torusGeometry args={[radius * 2, radius / 4, 2, 100]} /> */
}
