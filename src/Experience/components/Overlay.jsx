import { Scroll, useScroll } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import planetsInfo from "../../libs/planetsInfo";
import Intro from "./Intro";

const Section = ({ sectionRef, title, description, aspectRatio }) => (
  <section
    ref={sectionRef}
    className={`section h-screen flex w-screen ${
      aspectRatio < 1 ? "flex-row items-end" : "flex-col items-end"
    } justify-center p-10`}
    style={{
      opacity: 1,
      transition: "opacity 0.3s ease-in-out",
    }}
  >
    <div className={`${aspectRatio < 1 ? "w-full max-h-[50%]" : "w-1/2"} flex justify-center`}>
      <div className="floating-effect selection:bg-[#61aafc] selection:text-[#143153] max-w-sm w-full bg-transparent p-8">
        <h1 className="font-semibold sm:text-2xl text-xl text-white pb-2">{title}</h1>
        <p className="text-white font-medium sm:text-base text-sm">{description}</p>
      </div>
    </div>
  </section>
);

export const Overlay = () => {
  const scroll = useScroll();
  const size = useThree((state) => state.size);
  const aspectRatio = size.width / size.height;

  // Create a ref to store the opacity for each section
  const sectionRefs = useRef(planetsInfo.map(() => React.createRef()));

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = scroll.offset;
      const totalSections = planetsInfo.length - 1;
      const targetIndex = scrollValue * totalSections;

      sectionRefs.current.forEach((sectionRef, i) => {
        const targetSection = sectionRef.current;
        if (!targetSection) return;

        const distance = Math.abs(targetIndex - i);
        let opacity = 0;

        if (distance < 0.3) {
          opacity = 1;
        } else if (distance < 0.5) {
          opacity = 1 - (distance - 0.3) / 0.4;
        }

        // Use setTimeout to delay opacity setting, allowing CSS to handle both directions
        setTimeout(() => {
          if (parseFloat(targetSection.style.opacity) !== opacity) {
            targetSection.style.opacity = opacity;
          }
        }, 0);
      });
    };

    scroll.el.addEventListener("scroll", handleScroll);
    return () => scroll.el.removeEventListener("scroll", handleScroll);
  }, [scroll, sectionRefs]);

  return (
    <Scroll html>
      <Intro />
      <div
        className="w-screen h-screen"
        style={{
          display: "flex",
          flexDirection: "row",
          width: `${planetsInfo.length * size.width}px`,
        }}
      >
        {planetsInfo.map((section, index) => (
          <Section
            key={index}
            sectionRef={sectionRefs.current[index]}
            aspectRatio={aspectRatio}
            title={section.title}
            description={section.description}
          />
        ))}
      </div>
    </Scroll>
  );
};
