import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense } from "react";
import { Experience } from "./Experience/Experience";
import Credit from "./Experience/components/Credit";
import Loading from "./Experience/components/Loading";
import ToggleAudio from "./Experience/components/ToggleAudio";

function App() {
  return (
    <>
      <Leva collapsed hidden={!(window.location.hash === "#debug")} />

      <Suspense fallback={<Loading />}>
        <Canvas camera={{ position: [33.4, 0, 0], fov: 45 }}>
          <Experience />
        </Canvas>
        <Credit />
        <ToggleAudio />
      </Suspense>
    </>
  );
}

export default App;
