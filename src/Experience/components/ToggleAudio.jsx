import React from "react";
import useAudio from "../../hooks/useAudio";

const ToggleAudio = () => {
  const { toggleAudio, isPlaying } = useAudio("./audio/space.mp3");

  return (
    <button className="absolute w-10 h-10 z-30 top-2 right-2 bg-transparent" onClick={toggleAudio}>
      {isPlaying ? (
        <img className="w-full h-full" src="./audio_stop.svg" alt="stop audio" />
      ) : (
        <img className="w-full h-full" src="./audio_play.svg" alt="play audio" />
      )}
    </button>
  );
};

export default ToggleAudio;
