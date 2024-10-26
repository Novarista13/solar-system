import { useRef, useEffect } from "react";
import { useScroll } from "@react-three/drei";

const Intro = () => {
  const scroll = useScroll();
  const textRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = scroll.offset;

      if (textRef.current) {
        if (scrollValue > 0) {
          textRef.current.style.opacity = 0;
          textRef.current.style.pointerEvents = "none";
        } else {
          textRef.current.style.opacity = 1;
          textRef.current.style.pointerEvents = "auto";
        }
      }
    };

    scroll.el.addEventListener("scroll", handleScroll);
    return () => scroll.el.removeEventListener("scroll", handleScroll);
  }, [scroll]);

  return (
    <div
      ref={textRef}
      className="uppercase absolute z-10 flex justify-center items-baseline w-screen h-screen top-[4%] left-0 text-white font-bold transition-opacity duration-300 ease-in-out"
      style={{ opacity: 1 }}
    >
      <div className="backdrop-blur-[2px] flex flex-col gap-y-1 justify-center items-center w-fit px-3 h-fit rounded-md">
        <h1 className="text-2xl sm:text-4xl">Welcome to the Planets</h1>
        <p className="text-sm sm:text-lg">Explore all the planets in our solar system.</p>
      </div>
    </div>
  );
};

export default Intro;
