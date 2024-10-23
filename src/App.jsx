import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense } from "react";
import { Experience } from "./Experience/Experience";
import Credit from "./Experience/components/Credit";
import Loading from "./Experience/components/Loading";

function App() {
  return (
    <>
      <Leva collapsed hidden={!(window.location.hash === "#debug")} />

      <Suspense fallback={<Loading />}>
        <Canvas camera={{ position: [33.4, 0, 0], fov: 45 }}>
          <Experience />
        </Canvas>
        <Credit />
      </Suspense>
    </>
  );
}

export default App;
