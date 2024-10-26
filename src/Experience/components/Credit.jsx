import React from "react";

const Credit = () => {
  return (
    <div className="text-white absolute -bottom-11 sm:bottom-2 left-2 sm:text-sm text-xs tracking-wider">
      <p>
        Planet Textures are from
        <a
          className="underline ps-2"
          target="_blank"
          href="https://www.solarsystemscope.com/textures/"
        >
          Solar System Scope
        </a>
        .
      </p>
      <p>
        Sound Effect by
        <a
          className="underline ps-2"
          target="_blank"
          href="https://pixabay.com/users/liecio-3298866/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=109577"
        >
          LIECIO
        </a>
        {"  "}from
        <a
          className="underline ps-2"
          target="_blank"
          href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=109577"
        >
          Pixabay
        </a>
        .
      </p>
    </div>
  );
};

export default Credit;
