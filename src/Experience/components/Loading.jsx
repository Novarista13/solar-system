import React from "react";

const Loading = () => {
  return (
    <div
      className="relative w-screen h-screen flex flex-col gap-y-2 justify-center items-center"
      style={{ backgroundImage: "url('./textures/milky_way.webp')", backgroundSize: "cover" }}
    >
      <h1 className="floating-effect text-2xl font-semibold text-white">Loading...</h1>
      <div
        className="w-14 h-14 bg-no-repeat bg-cover animate-launch"
        style={{ backgroundImage: "url('./rocket.svg')" }}
      ></div>
    </div>
  );
};

export default Loading;
